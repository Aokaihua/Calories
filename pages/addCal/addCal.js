// pages/addCal.js
const allFoodList = {"早餐":[],"午餐":[],"晚餐":[],"其他":[]};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //🌟
    totalCal:0,
    //底部弹窗的参数
    show: false,
    duration: 300,
    //假设现在选中了小麦面包这个食物,它对应的卡路里是65
    food:[
      {name:"小麦面包",cal:65},
      {name:"苹果",cal:30},
      {name:"苹果派",cal:100},
      {name:"小麦饼干",cal:100},
      {name:"小麦",cal:100},
      {name:"苹果乐园",cal:100}
    ],
    //创建meal列表
    mealList: [{
      mealName: "早餐",
      addFoodList:[]
    },{
      mealName: "午餐",
      addFoodList:[]
    },{
      mealName: "晚餐",
      addFoodList:[]
    },{
      mealName: "其他",
      addFoodList:[]
    }],
    currentMeal : '',
    // 每餐的总卡路里🌟
    mealTotalCal:{"早餐":0,"午餐":0,"晚餐":0,"其他":0},
    //搜索框的初始数据👇
    searchText:'',//文本框内容
		searchResultList:[],//搜索结果
    autoFocus: true,//自动聚焦
		holdKeyboard: true//focus时，点击页面的时候收齐键盘 true:不收起
    //搜索框的初始数据👆
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  popup(e) {
    const meal = e.currentTarget.id;
    // console.log(this.data.allFoodList);
    this.setData({
      show: true,
      currentMeal: meal
    });
    // console.log(e);
  },

  exit() {
    this.setData({show: false})
    // wx.navigateBack()
  },
  //放一个能添加搜索框中搜索出来的条目的东西的函数
  addFood(e) {
    const currentMeal = this.data.currentMeal;
    const mealList = this.data.mealList;
    for (let i = 0; i < mealList.length; i++) {
      if (mealList[i].mealName == currentMeal) {
        mealList[i].addFoodList.push(e.currentTarget.dataset.value);
        allFoodList[currentMeal] = mealList[i].addFoodList;
      }
    }
    // console.log(mealList);
    this.setData({
      mealList,
      allFoodList
    });
    // console.log(allFoodList);
    this.countCalforCertainMeal();
    this.countTotalCal();
    this.exit();
  },

  //移除添加的食物
  removeFood(e) {
    var removedDish = e.currentTarget.dataset.value
    const currentMeal = this.data.currentMeal;
    const mealList = this.data.mealList;
    const allFoodList = this.data.allFoodList
    console.log(e)
    for(let meal of mealList){
      if (meal.mealName===currentMeal){
        for (let i = 0; i<meal.addFoodList.length; i++){
          if (meal.addFoodList[i].name===removedDish){
            meal.addFoodList.splice(i,1)
            this.setData({
              mealList
            })
            this.countCalforCertainMeal();
            this.countTotalCal();
            this.exit();
            break
          }
        }
      }
    }
    // console.log(allFoodList)
  },
  // 计算每餐的卡路里
  countCalforCertainMeal() {
    const allFoodList = this.data.allFoodList;
    const currentMeal = this.data.currentMeal;
    const mealTotalCal = this.data.mealTotalCal;
    var totalCal = 0;
    // console.log(currentMeal);
    // console.log(allFoodList[currentMeal]);
    // console.log(mealTotalCal[currentMeal]);
    for (let i = 0; i < allFoodList[currentMeal].length; i++) {
      console.log(allFoodList[currentMeal][i])
      totalCal += allFoodList[currentMeal][i]["cal"];
    }
    mealTotalCal[currentMeal]= totalCal;
    //这个地方是否要指定是第几天的数据？🌟
    wx.setStorageSync('mealTotalCal', mealTotalCal);
    this.setData({
      mealTotalCal
    })
    console.log('hhh',mealTotalCal);
  },
  //计算今日摄入食物的总卡路里
  countTotalCal() {
    const mealTotalCal = Object.values(this.data.mealTotalCal);
    // const totalCal = this.data.totalCal;
    let total = 0;
    for (let i = 0; i< mealTotalCal.length; i++) {
      total += mealTotalCal[i];
    }
    this.setData({
      totalCal: total
    })
    // console.log("calcal",total)
    wx.setStorageSync('totalCal', total);
  },
//这个goTo函数可以放在page-container里边，需要进入到一个新的界面
  goTo(e) {
    wx.navigateTo({url: `../../pages/addCal/foodDetail/foodDetail`})
  },

  //搜索框使用的函数👇
  //文本框输入
	input:function(e){
    //   console.log(e)
      this.setData({
        searchText:e.detail.value.trim()
        })
        //根据名称进行搜索
        this.getSearchListByName()
    },
    clear(e) {
      // console.log(e);
        this.setData({
          searchText:'',//文本框内容
          searchResultList:[],//搜索结果
          autoFocus: true,//自动聚焦
          holdKeyboard: true,//focus时，点击页面的时候收齐键盘 true:不收起
          clearflag : true
        })
    },
    //根据名称进行搜索
    getSearchListByName:function(){
      const food = this.data.food;
      let that = this
      //模拟数据请求
      var searchResultList = []
      for(var i=0;i<food.length;i++){
        //高亮字符串数组
        var obj=that.getHilightStrArray(food[i]["name"],this.data.searchText)
        searchResultList.push(obj)
      }
      console.log(searchResultList)
      that.setData({
        searchResultList:searchResultList
      })  
    },
    // 返回一个使用key切割str后的数组，key仍在数组中
    getHilightStrArray:function(str,key){
      var pattern = new RegExp(`${key}`, 'g')
      if(pattern.test(str) && key){
        return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%');
      } else{
        return ""
      }
    },

  //搜索框使用的函数👆
})