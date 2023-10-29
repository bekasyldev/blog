const { PrismaClient } = require("@prisma/client")

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                {name : "Fitness"},
                {name : "Music"},
                {name : "Travel"},
                {name : "Technology"},
                {name : "Fashion and Lifestyle"},
                {name : "Food and Cooking"},
            ]
        })
        console.log("succes")
    } catch (error) {
        console.log('Error seeding the database categories', error)
    }
}

main();