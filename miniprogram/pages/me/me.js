Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    openid:'',
  },
  // 跳转到后台管理
  admin(){
    wx.navigateTo({
      url: '../admin/admin',
    })
  },
  // 跳转订单管理页
  toOrder(res){
    var name = res.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../myOrder/myOrder?name='+name,
    })
  },

  // 跳转我的收藏
  goToCollection(res){
    wx.redirectTo({
      url: '../myCollection/myCollection',
    })
  },

  // 跳转我的购物车
  goToShoppingCar(res){
    wx.redirectTo({
      url: '../shopping/shopping',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this
      var openid = that.data.openid
      wx.cloud.callFunction({
      name:'OpenId',
      success(res){
        console.log("!!")
        console.log(res)
        if (res.result.openid == "owvNO46BJBnAfD977z7D-Vu3k7gU"){
          that.setData({
            show:true
          }) 
        }
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