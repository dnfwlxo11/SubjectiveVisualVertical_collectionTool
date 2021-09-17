import { remote, app } from 'electron'
import path from 'path'
const Datastore = require('nedb-promises')

const dbPath = path.join(remote.app.getAppPath('appData'), 'appData', 'app.db')
console.log(dbPath)
const datastore = Datastore.create({
    autoload: true,
    filename: dbPath
})

async function findPageData(pageSize, pageNum, sort) {
    const res = await datastore.find({})
                               .limit(pageSize)
                               .skip(pageSize*(pageNum-1))
                               .sort({timestamp: sort})

    return res
}

async function findAllData() {
    const res = await datastore.find({})

    return res.length
}

async function findData(id) {
    let res = await datastore.findOne({ _id: id })
    return res == null ? { success: true } : { success: false, res}
}

async function updateData(id, data) {
    await datastore.update({ _id: id }, data)
}

async function deleteData(id) {
    await datastore.remove({ _id: id })
}

async function insertData(data) {
    await datastore.insert(data)
}

export {
    findData,
    findAllData,
    findPageData,
    updateData,
    deleteData,
    insertData
}