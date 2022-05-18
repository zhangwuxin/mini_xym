// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
      console.log("event.id!!!!",event.id)
      return await db.collection('pinglun').where({
        product_id: event.id
    }).get()
  } catch (e) {
    console.log(e)
  }
}