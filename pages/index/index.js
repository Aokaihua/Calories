// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    //表格
    listData:[
      {"name":"早餐","cal":"300Kcal","percent":"25%"},
      {"name":"午餐","cal":"300Kcal","percent":"25%"},
      {"name":"晚餐","cal":"300Kcal","percent":"25%"},
      {"name":"其他","cal":"300Kcal","percent":"25%"},
    ]

  },
  onLoad() {
    //加载进度条
    this.progressBar = this.selectComponent("#progressBar");
    this.progressBar.drawProgressBar();
    

  },
  mydata(e) { //可获取日历点击事件
    let data = e.detail.data;
    console.log(data);
  }
    
})
