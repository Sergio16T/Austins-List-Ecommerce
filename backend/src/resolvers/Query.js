const { forwardTo } = require('prisma-binding'); 
const hasPermissions = require('../Utilities'); 

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
    }
  }; 

  module.exports = Query; 

