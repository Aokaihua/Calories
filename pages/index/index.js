// index.js
const util = require('../../utils/util.js')

Page({
  data: {
    //表格
    totalCal:0,
    mealName:["早餐","午餐","晚餐","其他"],
    mealTotalCal:{"早餐":0,"午餐":0,"晚餐":0,"其他":0},
    date: util.formatTime(new Date()),
    // 获取用户数据
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile:false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  
  onLoad() {
    //加载进度条
    this.progressBar = this.selectComponent("#progressBar");
    this.progressBar.drawProgressBar();
    //更新progressbar组件数据
    this.progressBar.refresh();
    //获取用户数据
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  onShow(){
    //更新进度条和表格
    var totalCal = 0;
    var mealTotalCal={"早餐":0,"午餐":0,"晚餐":0,"其他":0};
    totalCal = wx.getStorageSync('totalCal');
    mealTotalCal = wx.getStorageSync('mealTotalCal');
    //将数据与日期绑定并存入本地数据
    var date = util.formatTime(new Date());
    var content = {"mealTotalCal":mealTotalCal,"totalCal":totalCal};
    wx.setStorageSync(date, content);
    console.log(wx.getStorageSync(date));
    this.setData({
      totalCal,
      mealTotalCal
    })
    this.onLoad()
  },
  //获取用户信息
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  mydata(e) { //可获取日历点击事件
    let data = e.detail.data;
    console.log(data);
    return data;
  },
  //  获取特定日期的数据
  getCertainDayData(e) {
    //将选中的日期数据传入data中，从而将该数据传入progressBar中
    var todayDate = this.mydata(e);
    this.setData({
      date:todayDate
    });
    var todayData = wx.getStorageSync(todayDate);
    
    console.log(todayData);//成功了，泪目
    if (!todayData) {
      var content = {"mealTotalCal":{"早餐":0,"午餐":0,"晚餐":0,"其他":0},"totalCal":0};
      wx.setStorageSync(this.mydata(e), content);
    } else {
      const mealTotalCal = todayData["mealTotalCal"];
      const totalCal = todayData["totalCal"];
      this.setData({
        mealTotalCal,
        totalCal
      })
    };
    //更新progressbar组件数据
    this.progressBar = this.selectComponent("#progressBar");
    this.progressBar.refresh();
  },


  //存储一坨数据的函数，暂时用不到
  saveData() {
    var date = util.formatTime(new Date());
    console.log(date);//没问题了
    //将totalCal和mealTotalCal再次取出
    totalCal = wx.getStorageSync('totalCal');
    mealTotalCal = wx.getStorageSync('mealTotalCal');
    var content = {"mealTotalCal":mealTotalCal,"totalCal":totalCal};
    var data = {"date":content};
    wx.setStorageSync('data', data);
  }
})
