// components/progressBar/progressBar.js
const app = getApp();
const util = require('../../utils/util.js')


var screenWidth = wx.getSystemInfoSync().screenWidth;//屏幕宽度
//由于canvas的单位的px,为了适配所有屏幕，这里之前所有像素单位赋值之前都要换成以rpx为单位的大小乘以xs
const xs = screenWidth / 750;
Component({
  // 组件生命周期
  lifetimes: {
    created: function() {
      
    },
    attached: function() {
      // 在组件实例进入页面节点树时执行
      var date = this.data.date;
      this.setData({
        date,
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {
    date :util.formatTime(new Date()),
    //画布的宽度 单位rpx

    canvasWidth: {
      type: Number,
      value: 400
    },
    //线条宽度 默认16,单位rpx
    lineWidth: {
      type: Number,
      value: 26
    },
    //线条颜色 默认"#12333F"
    lineColor: {
      type: String,
      value: "#12333F"
    },
    //进度条底色
    bottomColor: {
      type: String,
      // value: "#F1F5F5"
      value: "#fff"
    },
    //当前的值 
    value: {
      type: Number,
      value: 0
    },
    //最大值 默认2500
    maxValue: {
      type: Number,
      value: 2500
    },
    //是否显示中间进度值文字
    // showText: {
    //   type: Boolean,
    //   value: true
    // },
    //中间字体大小，单位rpx
    textSize: {
      type: Number,
      value: 45
    },
    //中间字体颜色
    textColor: {
      type: String,
      value: "#12333F"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    refresh() {
      //？怎么感觉有点问题？？🌟
      var value = this.data.value;
      console.log(value)
      this.drawProgressBar()
      this.setData({
        value,
      });
   },
 
    /**
     *绘制环形进度条
     */
    drawProgressBar(){
      var canvasWidth = this.data.canvasWidth;
      //设置画布宽高
      this.setData({
        width: canvasWidth,
        height: canvasWidth
      });
      //作画
      
      var circle_r = canvasWidth * xs / 2;  //画布的一半，用来找中心点和半径
      var bottomColor = this.data.bottomColor //进度条底色
      var lineColor = this.data.lineColor; //线条颜色
      var lineWidth = this.data.lineWidth * xs; //线条宽度

      //获取canvas 的绘图上下文
      var ctx = this.data.ctx;
      if (!ctx) {
        ctx = wx.createCanvasContext("progress", this); //创建 canvas 的绘图上下文 CanvasContext 对象
        this.setData({
          ctx: ctx
        })
      }

      ctx.translate(circle_r, circle_r);//改变坐标原点的位置，将原点当做圆心作画
      //绘制底色圆弧
      ctx.beginPath();//开始创建一个路径
      ctx.setStrokeStyle(bottomColor);//设置描边颜色
      ctx.setLineWidth(lineWidth);//设置线条的宽度
      ctx.arc(0, 0, circle_r-lineWidth/2, 0, Math.PI*2, false);//创建一条弧线
      ctx.setLineCap('round') //末端圆弧
      ctx.stroke();//画出当前路径的边框
      ctx.closePath();//关闭一个路径

      //计算中间进度文字的值
      var maxValue = this.data.maxValue; //最大值
      var value = this.data.value; //当前的值
      //更新进度值
      console.log(value)
      this.setData({
        intake: value
      })

      //计算当前进度弧形大小,环形总长度为Math.PI*2
      var intake = (Math.PI * 2) * (value / maxValue);
      //当前进度的圆弧
      ctx.beginPath();//开始创建一个路径
      ctx.setStrokeStyle(lineColor);//设置描边颜色
      ctx.setLineWidth(lineWidth);//设置线条的宽度
      ctx.arc(0, 0, circle_r - lineWidth / 2, -0.5 * Math.PI, intake - 0.5 * Math.PI, false);//创建一条弧线
      ctx.setLineCap('round') //末端圆弧
      ctx.stroke();//画出当前路径的边框
      ctx.closePath();//关闭一个路径
 
      ctx.draw(); //清空上次内容绘制本次内容
    }
  }
})