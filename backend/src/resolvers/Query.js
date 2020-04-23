const { forwardTo } = require('prisma-binding'); 
const utilities = require('../Utilities'); 
const hasPermissions = utilities.hasPermissions; 

const Query = {
    // items: forwardTo('prisma'), 
    items: (parent, args, ctx, info) => {
      if(args.skip < 0) return null; 
      return ctx.prisma.query.items({
        ...args
      }, info);
    }, 
    item: forwardTo('prisma'), 
    itemsConnection: forwardTo('prisma'), 
    user: (parent, args, ctx, info) => {
      if(!ctx.request.userId) { 
        return null; 
      }
      return ctx.prisma.query.user({
          where: { id: ctx.request.userId }
      }, info); 
    }, 
    users: async (parent, args, ctx, info) => {
      if(!ctx.request.userId) {
        throw new Error("You must be logged in to do that!"); 
      }
      hasPermissions(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]); 
      
      return ctx.prisma.query.users({}, info); 
    }, 
    order: async (parent, args, ctx, info) => {
      if(!ctx.request.userId) {
        throw new Error('You must be logged in to see this!'); 
      }
      let order = await ctx.prisma.query.order({
        where: {id: args.id },
      }, info); 
      const ownsOrder = order.user.id === ctx.request.userId; 
      const hasPermissions = ctx.request.user.permissions.includes("ADMIN"); 
      if(hasPermissions) return order; 
      if(!ownsOrder) throw new Error('You do not have permission to view this order!'); 
      return order; 
    }, 
    orders: async (parent, args, ctx, info) => {
      const { userId } = ctx.request;
      if(!userId) {
        throw new Error('You must be logged in to do that!'); 
      } 
      let orders = await ctx.prisma.query.orders({
        where: {
          user: {id: userId },
        },
      }, info); 

      return orders; 
    }
  }; 

  module.exports = Query; 

