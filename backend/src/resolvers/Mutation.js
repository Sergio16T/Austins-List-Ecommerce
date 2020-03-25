const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { randomBytes } = require("crypto"); 
const { promisify } = require("util"); 
const { transport, email } = require("../Mailer"); 

const Mutations = {
    async createItem(parent, args, ctx, info) {
        const item = await ctx.prisma.mutation.createItem({
            data: {
                ...args, 
            }
        }, info); 

        return item; 
    },
    async updateItem(parent, args, ctx, info) {
        console.log(args); 
        const updates = {...args}; 

        delete updates.id; 

        return ctx.prisma.mutation.updateItem({
            data: updates, 
            where: { id: args.id}
        }, info)
    }, 
    async deleteItem(parent, args, ctx, info){
        const item = await ctx.prisma.query.item({ where: {id: args.id }}, `{id title}`); 
        //TODO check to see if the user owns that item before deleting item 
        return ctx.prisma.mutation.deleteItem({
            where: { id: args.id }
        }, info); 
    },
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase(); 
        const password = await bcrypt.hash(args.password, 10); 

        const user = await ctx.prisma.mutation.createUser({
            data: {
            ...args, 
            password, 
            permissions: {set: ['USER']},
            }
        }, info); 
        // create the JWT token 
        const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET); 
        // set the JWT as a cookie on the response (write the cookie header)
        ctx.response.cookie('token', token, {
            httpOnly: true, 
            maxAge: 1000 * 60 * 60 * 24 * 365,
        }); 
        return user; 
    }, 
    async signin(parent, {email, password}, ctx, info) {
        const user = await ctx.prisma.query.user({where: { email: email}}); 
        if(!user) {
            throw new error(`No user found for email ${email}`);
        }
        const valid = bcrypt.compare(password, user.password); 
        if(!valid) {
            throw new error(`Invalid password`); 
        }
        const token = jwt.sign({userId: user.id}, process.env.APP_SECRET); 
        ctx.response.cookie("token", token, {
            httpOnly: true, 
            maxAge: 1000 * 60 * 60 * 24 * 365 
        }); 
        return user; 
    }, 
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie("token"); 
        return { message: "GoodBye!"}
    }, 
    async requestReset(parent,args, ctx, info) {
        const user = await ctx.prisma.query.user({where: { email: args.email }}); 
        if(!user) {
            throw new error(`No user found for email ${args.email}`);
        }
        const randomBytesPromiseified = promisify(randomBytes);
        // could also be written as (await promisify(randomBytes)(20)).toString('hex'); 
        // returns a buffer and toString("hex") returns us a hexed string
        const resetToken = (await randomBytesPromiseified(20)).toString('hex'); 
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now 
        const res = await ctx.prisma.mutation.updateUser({
            where: { email: args.email },
            data: { resetToken: resetToken, resetTokenExpiry: resetTokenExpiry}
        }); 
        // send email 
        const sentMail = await transport.sendMail({
            from: "stapiafikes@gmail.com", 
            to: user.email, 
            subject: "Reset Your Password", 
            html: email(`Your Password Reset Token is 
            here! \n\n 
            <a href="${process.env.FRONTEND_URL}/resetpassword?resetToken=${resetToken}">
            Click Here to Reset</a> `)
        }); 
        // console.log(res); 
        return { message : "Thank you!"}; 
        
    },
    async resetPassword(parent, args, ctx, info) {
        if (args.password !== args.confirmPassword) {
            throw new Error('Yo Passwords don\'t match!'); 
        }
        // destructure the first user from the result of query
        const [user] = await ctx.prisma.query.users({
            where: {
                resetToken: args.resetToken,
                //All values greater than or equal the given value.
                resetTokenExpiry_gte: Date.now() - 3600000,
            },
        }); 
        if (!user) {
            throw new Error('This token is either invalid or expired'); 
        }
        const password = await bcrypt.hash(args.password, 10); 

        const updatedUser = await ctx.prisma.mutation.updateUser({
            where: {email: user.email}, 
            data: { 
                password: password, 
                resetToken: null, 
                resetTokenExpiry: null
            }
        }); 
        const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET); 

        ctx.response.cookie('token', token, {
            httpOnly: true, 
            maxAge: 1000* 60 *60 * 24 *365
        }); 
        return updatedUser; 
    }, 
  }; 

  module.exports = Mutations