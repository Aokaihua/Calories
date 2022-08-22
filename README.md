# Calories--卡路里小管家

本项目以练手为主要目的，涉及了自定义组件、父子组件传值、小程序页面生命周期等知识点，能够帮助新手快速熟悉如何从0到1创建一个微信原生版本小程序～

## 小程序功能

1. 搜索食物；
2. 计算摄入的卡路里，并以progress-bar的形式呈现在主页中；
3. 点击日历中的日期访问历史饮食记录

![image text](https://github.com/Aokaihua/Calories/blob/master/demo/1.PNG)
![image text](https://github.com/Aokaihua/Calories/blob/master/demo/2.PNG)
![image text](https://github.com/Aokaihua/Calories/blob/master/demo/3.PNG)
![image text](https://github.com/Aokaihua/Calories/blob/master/demo/4.PNG)

## TIP


1. 由于还没有开始后端的工作，因此先暂时将食物的数据放在addCal.js的初始数据(data)内，能在小程序搜索框内搜到的食物只有：[
      {name:"小麦面包",cal:65},
      {name:"苹果",cal:30},
      {name:"苹果派",cal:100},
      {name:"小麦饼干",cal:100},
      {name:"小麦",cal:100},
      {name:"苹果乐园",cal:100}
    ],🤦‍♀️🤦‍♀️🤦‍♀️
2. 数据存储在本地数据库中(wx.setStorageSync('key',data))
3. 如果有任何意见和建议烦请发送至📮romanaistrate@gmail.com 
4. 小程序二维码如下👇感兴趣的小伙伴可亲自体验一下～
![image text](https://github.com/Aokaihua/Calories/blob/master/demo/QR_code.png)
