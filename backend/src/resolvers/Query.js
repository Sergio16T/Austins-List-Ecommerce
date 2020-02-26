const { forwardTo } = require('prisma-binding'); 
const Query = {
    items: forwardTo('prisma'), 
    item: forwardTo('prisma'), 
    itemsConnection: forwardTo('prisma'), 
    users: forwardTo('prisma'), 
    user: (parent, args, ctx, info) => {
      return ctx.prisma.query.user({
          where: { id: args.id }
      }, info); 
    }, 
  }; 

  module.exports = Query; 

