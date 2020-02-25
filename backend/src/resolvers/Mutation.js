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
    }
  }; 

  module.exports = Mutations