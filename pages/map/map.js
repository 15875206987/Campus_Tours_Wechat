var bmap = require('../../libs/bmap-wx.js'); 
let plugin = requirePlugin('routePlan');
let routePlankey = 'PUGBZ-IZ7K4-UTHUF-DKH5L-EMZLZ-F3BY5';  //使用在腾讯位置服务申请的key
let referer = 'scuttour';   //调用插件的小程序的名称
const app = getApp()
Page({
  data: {
    //以下和顶部标签栏有关
    current_scroll:'',
    categories:[],
    //以下和地图坐标点有关
    markers: [],
    allMarkers:[],
    latitude: '',
    longitude: '',
    rgcData: {},
    // 禁止滚动
    isScroll:false,
    categories:[],
    //伸缩栏
    name:'name1',
    info_box:'info_box_before',
    map_container:'map_container_before'
  },
//当tab变化时根据category_id做处理
  handleChangeScroll({ detail }) {
    var arr = this.data.allMarkers.filter(function (item) {
      return (item.category_id == detail.key)
    })
    this.setData({
      current_scroll: detail.key,
      markers:arr
    });

  },
//信息盒子收缩
  openInfoBox(){
    if (this.data.info_box == 'info_box_before'){
      this.setData({
        info_box:'info_box_after',
        map_container:'map_container_after'
      })
    } else{
      this.setData({
        info_box: 'info_box_before',
        map_container: 'map_container_before'
      })
    }
  },
  // 打开详情页
  siteDetail(e){
    // index代表的筛选后数组的下标
    var index = e.currentTarget.dataset.index;
    var site = this.data.markers[index];
    wx.navigateTo({
      url: '/pages/sitedetail/sitedetail?site=' + encodeURIComponent(JSON.stringify(site))
    })
  },
  //打开导航页
  startNavigation(e){
    var index = e.currentTarget.dataset.index;
    let endPoint = JSON.stringify({  //终点
      'name': this.data.markers[index].site_name,
      'latitude': this.data.markers[index].latitude,
      'longitude': this.data.markers[index].longitude
    });
    wx.navigateTo({
      url: 'plugin://routePlan/route-plan?key=' + routePlankey + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  search(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  getCurrentLocation(){
    var that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude//维度
        var longitude = res.longitude//经度
        that.setData({
          latitude:latitude,
          longitude:longitude
        })
      }
    })
  },
  //请求后台获取初始数据，包括类别和坐标点等
  onLoad(){
    var that = this;
      //以下是百度地图数据加载
    var BMap = new bmap.BMapWX({
      ak: 'R1bPFHIAT4KnxTcQEqGzZyAvtFHSDG3f'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    //以下是加载坐标点
    wx.request({
      url: 'https://localhost:8443/SCUT_Tour_JavaWeb/getmarkers',
      success(res) {
        var mp = res.data
        that.setData({
          allMarkers: mp,
        });
        //以下是顶部标签栏的数据加载
        wx.request({
          url: 'https://localhost:8443/SCUT_Tour_JavaWeb/getcategories',
          success(res) {
            var categories = res.data
            that.setData({
              categories: categories,
              current_scroll: categories[0].category_id
            });
            //设置当前坐标点集合
            var arr = that.data.allMarkers.filter(function (item) {
              return (item.category_id == that.data.current_scroll)
            })
            that.setData({
              markers: arr
            })
          }
        })
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
  }
});

