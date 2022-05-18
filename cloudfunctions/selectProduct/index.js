const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  
  try {
    return await db.collection('product_shopping').where({
      _id:event.id
    }).get({})
  } catch (e) {
    console.log(e)
  }
}