//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    elements: [{
        title: '关于华工',
        name: 'university',
        color: 'cyan',
        icon: 'newsfill'
      },
      {
        title: '逛逛华工',
        name: 'map',
        color: 'blue',
        icon: 'colorlens'
      },
      {
        title: '院系介绍',
        name: 'departments',
        color: 'purple',
        icon: 'font'
      }
    ],
    isScroll:false
  },
  onLoad: function () {
  },
})
