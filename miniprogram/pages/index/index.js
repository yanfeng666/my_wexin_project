// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

const TOTAL_TIME = 30 // 游戏总时间（秒）
const HOLES_COUNT = 9 // 地鼠洞口数量
let MOLE_SHOW_TIME = 1000 // 地鼠出现时间（毫秒）
let MOLE_HIDE_TIME = 500 // 地鼠隐藏时间（毫秒）

Page({
  data: {
    score: 0,
    timer: TOTAL_TIME,
    holes: [],
    classList:[1,2,3],
    modalState:false
  },

  onLoad: function () {
    // this.initHoles()
    // this.startGame()
  },

  initHoles: function () {
    const holes = []
    for (let i = 0; i < HOLES_COUNT; i++) {
      holes.push({
        show: false
      })
    }
    this.setData({
      holes: holes
    })
  },

  startGame: function () {
    this.timer = setInterval(() => {
      let timer = this.data.timer - 1
      if (timer >= 0) {
        this.setData({
          timer: timer
        })
        this.showMole()
      } else {
        clearInterval(this.timer)
        wx.showModal({
          title: '游戏结束',
          content: '您的得分为' + this.data.score,
          showCancel: false,
          success: function (res) {
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }
        })
      }
    }, 1000)
  },

  showMole: function () {
    const holes = this.data.holes
    const index = Math.floor(Math.random() * HOLES_COUNT)
    holes[index].show = true
    this.setData({
      holes: holes
    })
    setTimeout(() => {
      holes[index].show = false
      this.setData({
        holes: holes
      })
    }, MOLE_SHOW_TIME)
  },

  onTapHole: function (event) {
    const index = event.currentTarget.dataset.index
    const holes = this.data.holes
    if (holes[index].show) {
      this.setData({
        score: this.data.score + 1
      })
    } else {
      this.setData({
        score: this.data.score - 1
      })
    }
  },
  showPop:function(e){
    this.setData({
      modalState:!this.data.modalState
    })
  },
  hidePop:function(e){
    console.log('eeeeeee',e.currentTarget.dataset.index);
    let value=e.currentTarget.dataset.index
    if(value===0){
       MOLE_SHOW_TIME = 300 // 地鼠出现时间（毫秒）
       MOLE_HIDE_TIME = 300 // 地鼠隐藏时间（毫秒）
    }else if(value===1){
      MOLE_SHOW_TIME = 500 // 地鼠出现时间（毫秒）
       MOLE_HIDE_TIME = 500 // 地鼠隐藏时间（毫秒）
    }else if(value===2){
    MOLE_SHOW_TIME = 800 // 地鼠出现时间（毫秒）
      MOLE_HIDE_TIME = 500 // 地鼠隐藏时间（毫秒）
    }
   this.initHoles()
    this.startGame()
 
    this.setData({

      modalState:!this.data.modalState
    })
  }
})
