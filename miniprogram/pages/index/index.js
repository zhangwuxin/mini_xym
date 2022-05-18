const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    array:[
         {img:'./img/six.png',name:'生日蛋糕'},
         {img:'./img/seven.png',name:'提拉米苏'},
         {img:'./img/eight.png',name:'小吃甜点'},
         {img:'./img/nine.png',name:'风味饮料'},
        ],
    array_tuijian:[

    ],
    openid:'',
    search:'',
    search_product:[],
    searching:false
    // navH:null
  },
  
  // 跳转商品详情页
  goToProduct(res){
    var that = this;
    var id = res.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../product/product?id='+id,
    })
  },
  // 获取输入框的值
  value(res){
    var that = this;
    that.setData({
      search_product:null
    })
    var value = res.detail.value;
    console.log(value);
    if(value == ''){
      console.log("空了");
      that.setData({
        searching:false
      })
    }else {
      that.setData({
        search:value,
        searching:true
      })
    }
  },
  //搜索
  search(res){
    var that = this;
    var value = that.data.search;
    console.log(value);
    wx.showLoading({
      title: '搜索中',
    })
    db.collection('product_shopping').where({
      name:db.RegExp({
        regexp:value,
        options:'i'   // 不区分大小写
      })
    }).get({
      success(res){
        console.log("搜索成功",res.data);
        that.setData({
          search_product:res.data
        })
        wx.hideLoading({
          success: (res) => {
          },
        })
      }
    })
  },
  // 跳转分类页
  selectName(res){
    var name = res.currentTarget.dataset.name;
    app.globalData.name = name;
    wx.switchTab({
      url: '../classify/classify',
    })
  },
  // 跳转掌柜推荐
  BossRecommend(res){
    wx.navigateTo({
      url: '../recommend/recommend',
    })
  },
  // 加入购物车
  addToShop(res){
    var that = this;
    var id= res.currentTarget.dataset.id;
    var x = 0;
    var array = [];
    wx.showLoading({
      title: '加入中',
    })
    for(var n = 0; n < that.data.array_tuijian.length; n++){
      if(that.data.array_tuijian[n]._id == id){
        array = that.data.array_tuijian[n];
      }
    }
    console.log(array)
        db.collection('shopping_car').get({
          success(res){
            console.log(res);
            for(var i = 0; i < res.data.length; i++){
              if(res.data[i]._openid == that.data.openid && res.data[i].id == id){
                wx.showToast({
                  title: '您已重复添加',
                })
                x = 1;
              }
            }
            if(x == 0){
              db.collection('shopping_car').add({
                data:{
                  name:array.name,
                  price:array.price,
                  detail:array.detail,
                  img_src:array.img_src,
                  checked:true,
                  num:1,
                  id:array._id
                },
                success(res){
                  console.log("上传成功");
                  wx.hideLoading({
                    success: (res) => {
                      wx.showToast({
                        title: '成功加入购物车',
                      })
                    },
                  })
                },
                fail(res){
                  console.log("上传失败",res);
                }
              })
            }
            }
        })
      
  },
  setContainerHeight:function(e){
    //图片的原始宽度
    var imgWidth=e.detail.width;
    //图片的原始高度
    var imgHeight=e.detail.height;
    //同步获取设备宽度
    var sysInfo=wx.getSystemInfoSync();
    //获取屏幕的高度
    var screenWidth=sysInfo.screenWidth;
    //获取屏幕和原图的比例
    var scale=screenWidth/imgWidth;
    //设置容器的高度
    this.setData({
      height:imgHeight*scale
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // swiper设置高度
    // var that = this;
    // that.setData({
    //   navH: app.globalData.navHeight
    // })
    // console.log(that.data.navH)
    var that = this;
    var array = [];
    // console.log(x,i);
    wx.cloud.callFunction({
      name:'findProduct',
      data: {
        _where: "isRecommend",
        _value: 1,
      },
      success(res){
        console.log(res.result.data.length)
        for(var i = 0; i < res.result.data.length; i++){
            array.push(res.result.data[i])
        }
        that.setData({
          array_tuijian:array
        })
      }
    })
    wx.cloud.callFunction({
      name:'OpenId',
      success(res){
        that.setData({
          openid:res.result.openid
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})