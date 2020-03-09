const { forwardTo } = require('prisma-binding'); 
const Query = {
    items: forwardTo('prisma'), 
    item: forwardTo('prisma'), 
    itemsConnection: forwardTo('prisma'), 
    users: forwardTo('prisma'), 
    user: async (parent, args, ctx, info) => {
      if(!ctx.request.userId) { return; }
      return await ctx.prisma.query.user({
          where: { id: ctx.request.userId }
      }, info); 
    }, 
  }; 

  module.exports = Query; 

