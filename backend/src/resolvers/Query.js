const { forwardTo } = require('prisma-binding'); 
const Query = {
    items: forwardTo('prisma'), 
    item: forwardTo('prisma'), 
    itemsConnection: forwardTo('prisma'), 
    users: forwardTo('prisma'), 
    user: (parent, args, ctx, info) => {
      if(!ctx.request.userId) { return null; }
      return ctx.prisma.query.user({
          where: { id: ctx.request.userId }
      }, info); 
    }, 
  }; 

  module.exports = Query; 

