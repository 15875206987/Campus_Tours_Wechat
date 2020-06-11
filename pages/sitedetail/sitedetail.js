// pages/sitedetail/sitedetail.js
let plugin = requirePlugin('routePlan');
let routePlankey = 'PUGBZ-IZ7K4-UTHUF-DKH5L-EMZLZ-F3BY5';  //使用在腾讯位置服务申请的key
let referer = 'scuttour';   //调用插件的小程序的名称
Page({

  /**
   * 页面的初始数据
   */
  data: {
    site:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var site = JSON.parse(decodeURIComponent(options.site))
    this.setData({
      site:site
    })
  },
  
  // 导航
  startNavigation(e) {
    var site = this.data.site
    let endPoint = JSON.stringify({  //终点
      'name': site.site_name,
      'latitude': site.latitude,
      'longitude': site.longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/route-plan?key=' + routePlankey + '&referer=' + referer + '&endPoint=' + endPoint
    });
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