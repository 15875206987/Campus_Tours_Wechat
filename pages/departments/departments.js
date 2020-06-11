// pages/departments/departments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showDrawer:false,
    departmentList:[],
    selected:{},
    majorList:[],
    allMajor:[],
    name:''
  },
  // 更换学院
  change(e){
    var index = e.currentTarget.dataset.index
    var dep = this.data.departmentList[index]
    var arr = this.data.allMajor.filter(function(item){
      return (item.school_id == dep.school_id)
    })
    this.setData({
      selected:dep,
      majorList:arr,
      showDrawer: false,
    })
  },
  //打开抽屉
  toggleLeft() {
    this.setData({
      showDrawer: !this.data.showDrawer
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 初始化towerSwiper 传已有的数组名即可
    var that = this
    wx.request({
      url: 'https://localhost:8443/SCUT_Tour_JavaWeb/getdepartments',
      success(res){
        var list = res.data
        that.setData({
          departmentList:list,
          selected:list[0]
        })
        wx.request({
          url: 'https://localhost:8443/SCUT_Tour_JavaWeb/getmajors',
          success(res) {
            var list = res.data
            var arr = list.filter(function (item) {
              return (item.school_id == that.data.selected.school_id)
            })
            var name = arr[0].major_id
            that.setData({
              allMajor: list,
              majorList:arr,
              name:name
            })
          }
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

  },
})