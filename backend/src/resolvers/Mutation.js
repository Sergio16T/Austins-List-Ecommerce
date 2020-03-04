const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

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
    }
  }; 

  module.exports = Mutations