import prisma from '../db.js'

const CategoryModel = {
    findAll: async (options, catId) => {
        console.log("options", options)

        let prismaQueryOption = {}

        if(options.page) {
            // page = 1, limit 2 => (1 - 1) * 2 = 0
            // page = 2, limit 2 => (2 - 1) * 2 = 2
            // page = 3, limit 2 => (3 - 1) * 2 = 4
            prismaQueryOption.skip = +((options.page - 1) * (options.limit ?? 2)),
            prismaQueryOption.take = +(options.limit ?? 2)
        }

         if(options.search) { 
            prismaQueryOption.where = {
                title: {
                    contains: options.search,
                    model: "insensitive"
                }

            }
         }


        let data = await prisma.category.findMany(prismaQueryOption)
        let count = await prisma.category.count()


        return  {
            data,
            pagin: {
                total: count,
            }
        }
    },
    create: async (data) => {
        return await prisma.category.create({
            data
        })
    },
    delete: async (catId) => {
        return await prisma.category.delete({
            where: {
                id: +catId
            }
        })
    },
}


export { CategoryModel }