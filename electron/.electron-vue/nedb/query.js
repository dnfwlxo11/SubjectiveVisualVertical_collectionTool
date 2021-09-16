const db = require('./db')

const createTag = async (data) => {
    const tag = await db.tags.insert({ data })
    return tag
}

const getTags = async () => {
    const data = await db.tags.find({})
    return { data }
}