// pages/search-effects/search-effects.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		searchText:'',//文本框内容
		searchResultList:[],//搜索结果
        autoFocus: true,//自动聚焦
		holdKeyboard: true//focus时，点击页面的时候收齐键盘 true:不收起
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},
	//文本框输入
	input:function(e){
	//   console.log(e)
	  this.setData({
		searchText:e.detail.value.trim()
	  })
	  //根据名称进行搜索
	  this.getSearchListByName()
	},
	//根据名称进行搜索
	getSearchListByName:function(){
		let that = this
		//模拟数据请求
		var dataList=[
			{M_NAME:'小程教程'},
			{M_NAME:'2020小程序大全'},
			{M_NAME:'微信小程序序开源框架'},
			{M_NAME:'微信小程序组件化解决方法'},
			{M_NAME:'微信小程序API'},
			{M_NAME:'丰富的微信小程序组件'},
			{M_NAME:'第三方微信小程序组件'},
      {M_NAME:'自定义小程序UI组件'},
      {M_NAME:'abcd'},
			{M_NAME:'小程序可滑动标签的使用'}
		]
		var searchResultList = []
		for(var i=0;i<dataList.length;i++){
			//高亮字符串数组
      var obj=that.getHilightStrArray(dataList[i].M_NAME,this.data.searchText)
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
    }
    else{
      return ""
    }

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
})
