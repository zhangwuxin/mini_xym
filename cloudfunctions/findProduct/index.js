// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var where_ = event._where
  var _value = event._value
  try {
    if (where_ == "isRecommend"){
      console.log("isRecommend")
      return await db.collection('product_shopping').where({
        isRecommend: _value
    }).get()
    }else{
      console.log("no where")
      return await db.collection('product_shopping').get({
      })
    }
    
  } catch (e) {
    console.log(e)
  }
}