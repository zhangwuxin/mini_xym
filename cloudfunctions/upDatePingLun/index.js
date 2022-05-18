const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('pinglun').add({
      data:{
        product_id:event.product_id,
        pinglun_value:event.pinglun_value,
        time:event.time,
        userName:event.userName,
        userImg:event.userImg,
    }
    })
  } catch (e) {
    console.log(e)
  }
}