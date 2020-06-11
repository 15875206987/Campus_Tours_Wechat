// pages/search/search.js
var bmap = require('../../libs/bmap-wx.js'); 
let plugin = requirePlugin('routePlan');
let routePlankey = 'PUGBZ-IZ7K4-UTHUF-DKH5L-EMZLZ-F3BY5';  //使用在腾讯位置服务申请的key
let referer = 'scuttour';   //调用插件的小程序的名称
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    latitude: '',
    longitude: '',
    showMap:false,
    selectPoint:[],
    allMarkers:[],
    poiPoints:[]
  },

  search(){
    var key = this.data.keyword
    var allMarkers = this.data.allMarkers
    this.setData({
      selectPoint:allMarkers.filter(function(item){
        if(item.site_name.indexOf(key)>=0){
          return true
        } else {
          return false
        }
      })
    })
    if(this.data.selectPoint.length == 0 ){
      var that = this
      var BMap = new bmap.BMapWX({
        ak: 'R1bPFHIAT4KnxTcQEqGzZyAvtFHSDG3f'
      });
      var fail = function (data) {
        console.log(data)
      };
      var success = function (data) {
        that.setData({
          poiPoints:data.wxMarkerData
        })
      }
      BMap.search({ 
        "query": key, 
        fail: fail, 
        success: success, 
    }); 
    }
  },
  bindKeyInput: function (e) {
    this.setData({
      keyword: e.detail.value,
      selectPoint: [],
      poiPoints:[]
    })
  },
  startNavigation(e){
    var index = e.currentTarget.dataset.index;
    let endPoint = JSON.stringify({  //终点
      'name': this.data.selectPoint[index].site_name,
      'latitude': this.data.selectPoint[index].latitude,
      'longitude': this.data.selectPoint[index].longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/route-plan?key=' + routePlankey + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  startNavigationPOI(e){
    var index = e.currentTarget.dataset.index;
    let endPoint = JSON.stringify({  //终点
      'name': this.data.poiPoints[index].title,
      'latitude': this.data.poiPoints[index].latitude,
      'longitude': this.data.poiPoints[index].longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/route-plan?key=' + routePlankey + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
    // 打开详情页
    siteDetail(e){
      // index代表的筛选后数组的下标
      var index = e.currentTarget.dataset.index;
      var site = this.data.selectPoint[index];
      wx.navigateTo({
        url: '/pages/sitedetail/sitedetail?site=' + encodeURIComponent(JSON.stringify(site))
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
      //以下是百度地图数据加载
        //以下是加载坐标点
        wx.request({
          url: 'https://localhost:8443/SCUT_Tour_JavaWeb/getmarkers',
          success(res) {
            var mp = res.data
            that.setData({
              allMarkers: mp,
            });
          }
        })
        wx.request({
          url: 'https://localhost:8443/SCUT_Tour_JavaWeb/getuniversity',
          success(res) {
            var temp = res.data[0]
            console.log(res.data)
            that.setData({
              latitude: temp.center_lat,
              longitude:temp.center_lng
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