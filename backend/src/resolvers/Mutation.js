const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const { randomBytes } = require("crypto"); 
const { promisify } = require("util"); 
const { transport, email, confirmationEmail } = require("../Mailer"); 
const utilities = require('../Utilities'); 
const hasPermissions = utilities.hasPermissions; 
const formatMoney = utilities.formatMoney; 
const stripe = require("../Stripe"); 
const moment = require('moment'); 

const Mutations = {
    async createItem(parent, args, ctx, info) {
        if(!ctx.request.userId) {
            throw new Error("You must be logged in to do that!"); 
        }
        const images = args.image; 
        const largeImages = args.largeImage; 
        console.log(args); 
        const item = await ctx.prisma.mutation.createItem({
            data: {
                ...args,
                image: {set: images},
                largeImage: {set: largeImages},
                user: {
                    connect: { id: ctx.request.user.id}
                }, 
            },
        }, info); 
        console.log('await item', item); 
        return item; 
    },
    async updateItem(parent, args, ctx, info) {
        console.log(args); 
        const updates = {...args}; 
        const images = args.image; 
        const largeImages = args.largeImage; 
        delete updates.id; 

        return ctx.prisma.mutation.updateItem({
            data: {
                title: args.title,
                price: args.price, 
                description: args.description,
                image: {set: images }, 
                largeImage: {set: largeImages }
             },
            where: { id: args.id}
        }, info)
    }, 
    async deleteItem(parent, args, ctx, info){
        const item = await ctx.prisma.query.item({ where: {id: args.id }}, `{id title user { id }}`); 
        //TODO check to see if the user owns that item before deleting item 
        hasPermissions(ctx.request.user, ["ADMIN", "ITEMDELETE"]); 
        const ownsItem = item.user.id === ctx.request.userId; 
        if(!ownsItem) {
            throw new Error("You don't have permission to delete this item"); 
        }
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
            throw new Error(`No user found for email ${email}`);
        }
        const valid = await bcrypt.compare(password, user.password); 
        if(!valid) {
            throw new Error(`Invalid password`); 
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
            throw new Error(`No user found for email ${args.email}`);
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
    async updatePermissions(parent, args, ctx, info) {
        //1. Check if they are logged in 
        if(!ctx.request.userId) {
            throw new Error('You must be logged in!'); 
        }
        // 2. Query the current user
        const currentUser = await ctx.prisma.query.user({
            where: { 
                id: ctx.request.userId, 
            },
        }, info);  
        //3. Check if they have permissions to do this 
        hasPermissions(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
        //4. Update the permissions 
        return ctx.prisma.mutation.updateUser({
            data: {
                permissions: {
                    set: args.permissions, 
                }, 
            },
            where: {
                id: args.userId
            }
        }, info); 
    },
    async addToCart(parent, args ,ctx, info) {
        const { userId } = ctx.request; 
        if(!userId){
            throw new Error("You must be signed in!"); 
        }
        // check if the item we are adding already exists in the cart 
        const [ existingCartItem ] = await ctx.prisma.query.cartItems({
            where : {
                user: {id: userId }, 
                item: {id: args.id }
            }
        }, info); 
        // if it does increment the cartItem quantity
        if(existingCartItem) {
            console.log("this item is already in the cart"); 
            return ctx.prisma.mutation.updateCartItem({
                where: {id: existingCartItem.id}, 
                data: {
                    quantity: existingCartItem.quantity + 1
                }
            }, info); 
        }
        // if not add it to the cart
        return ctx.prisma.mutation.createCartItem({
            // in prisma in order to create a relationship use connect
            data: { 
                item: { 
                    connect: { id: args.id }
                }, 
                user: { 
                    connect: { id: userId }
                }, 
             }, 
        }, info);  
    }, 
    async deleteCartItem(parent, args, ctx, info) {
        if(!ctx.request.userId) {
            throw new Error("You must be logged in to do that!");   
        }
        const cartItem = await ctx.prisma.query.cartItem({
            where: {
                id: args.id
            }, 
        }, `{id user{ id }}`); 
        console.log(cartItem); 

        if(!cartItem) {
            throw new Error("That item is not in the cart!"); 
        }
        if(cartItem.user.id !== ctx.request.userId) {
            throw new Error("That item does not belong to your cart!"); 
        }
        return ctx.prisma.mutation.deleteCartItem({
            where: {id: args.id}
        }, info); 
    }, 
    async updateCartItem(parent, args, ctx, info) {
        if(!ctx.request.userId) {
            throw new Error("You must be logged in to do that!");   
        }
        const cartItem = await ctx.prisma.query.cartItem({
            where: {
                id: args.id
            }, 
        }, `{id quantity user{ id }}`); 
        console.log(cartItem); 

        if(!cartItem) {
            throw new Error("That item is not in the cart!"); 
        }
        if(cartItem.user.id !== ctx.request.userId) {
            throw new Error("That item does not belong to your cart!"); 
        }
        const quantity = args.updateType === "add" ? cartItem.quantity + 1 : cartItem.quantity -1; 
        return ctx.prisma.mutation.updateCartItem({
            data: {
                quantity: quantity
            }, 
            where: { id: cartItem.id }
        }, info); 
    }, 
    async createOrder(parent,args, ctx, info) {
        //1. Query the currentUser and make sure they are signed in 
        const { userId } = ctx.request;
        if(!userId) {
            throw new Error('You must be signed in to do that!'); 
        }  
        const user = await ctx.prisma.query.user({ where: {id: userId}}, `{ 
            id 
            name 
            email 
            cart {
                id 
                quantity 
                item { 
                    id 
                    title 
                    description 
                    price 
                    image
                    largeImage 
                }
            }
        }`); 
        console.log(user); 
        //2. recalculate the price 
        const amount = user.cart.reduce((startValue, element) => {
            if(!element.item) return startValue; 
            return startValue + (element.quantity * element.item.price); 
        }, 0); 
        console.log("going to charge",  amount); 

        //3. Create the stripe charge
        const charge = await stripe.charges.create({
            amount: amount, 
            currency: "USD",
            source: args.token
        }); 
        //4. Convert the cartItems to OrderItems 
        const orderItems = user.cart.map(cartItem => {
            const orderItem = {
                ...cartItem.item, 
                quantity: cartItem.quantity, 
                user: { connect: { id: userId } },
            }
            delete orderItem.id; 
            return orderItem
        });
        //5. Create the order 
        const order = await ctx.prisma.mutation.createOrder({
            data: {
                items: { create: orderItems }, 
                total: charge.amount, 
                charge: charge.id, 
                user: { connect: { id: userId} }
            }
        });
        //6. Clean Up- clear the user's cart,
        const cartItemIds = user.cart.map(cartItem => cartItem.id); 
        await ctx.prisma.mutation.deleteManyCartItems({
            where: {
                id_in: cartItemIds
            }, 
        }); 
        sendConfirmationEMail(user.email, order.id, charge.amount, order.createdAt); 
        //7. Return the order to the client 
        return order; 

    }, 
    // async sendConfirmationEmail(parent, args, ctx, info) {
    //     const { email, id, amount, createdAt } = args; 
    //     console.log('args', args); 
    //     await transport.sendMail({
    //         from: "stapiafikes@gmail.com", 
    //         to: email, 
    //         subject: "Order Confirmation", 
    //         html: confirmationEmail(`
    //         <table>
    //             <thead>
    //                 <th>Order Id</th>
    //                 <th>Order Total</th>
    //                 <th>Date</th>
    //             <thead>
    //             <tbody>
    //                 <td>${id}</td>
    //                 <td>${formatMoney(amount)}</td>
    //                 <td>${moment(createdAt).format('YYYY-MM-DD hh:mm a')}</td>
    //             </tbody>
    //         </table>
    //         `)
    //     }); 
    //     return { message: "Email Sent!"}; 
    // }

  }; 

  sendConfirmationEMail = async (email, id, amount, createdAt) => {
    await transport.sendMail({
        from: "stapiafikes@gmail.com", 
        to: email, 
        subject: "Order Confirmation", 
        html: confirmationEmail(`
        <table>
            <thead>
                <th>Order Id</th>
                <th>Order Total</th>
                <th>Date</th>
            <thead>
            <tbody>
                <td>${id}</td>
                <td>${formatMoney(amount)}</td>
                <td>${moment(createdAt).format('YYYY-MM-DD hh:mm a')}</td>
            </tbody>
        </table>
        `)
    }); 
  }

  module.exports = Mutations