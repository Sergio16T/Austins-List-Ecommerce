const Mutations = {
    async createItem(parent, args, ctx, info) {
        const item = await ctx.prisma.mutation.createItem({
            data: {
                ...args, 
            }
        }, info); 

        return item; 
    },
  }; 

  module.exports = Mutations