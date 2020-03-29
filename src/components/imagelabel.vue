<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="headerContainer">
        <!-- 顶部标题 -->
        <span class="tittle">图片标注</span>
        <div class="bts">
          <el-button
            type="success"
            @click="showlabeledFunc"
          >
            {{showlabeled?"显示原图":"显示标注"}}
          </el-button>
          <el-button
            type="primary"
            @click="goBack"
          >返回</el-button>
        </div>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <div
          v-for="(item,index) in nameList"
          :key="index"
        >
          <el-tag>
            <span class="nameListSpan">位置{{index+1}}</span>
          </el-tag>
          <span class="nameListSpan">{{item}}</span>
        </div>
      </el-aside>
      <!-- 主体结构 -->
      <el-main id="elMain">
        <div id="customPositionDiv">
          <div style="width: 1460px;
            height:740px;
            margin:0 auto ;
            display:-webkit-box;
            -webkit-box-align:center;
            -webkit-box-pack:center;
          ">
            <div
              @mousedown="mousedown"
              @mousemove="mousemove"
              @mouseup="mouseup"
              @Mouseleave="Mouseleave"
              :style="imgstyle"
            >
              <img
                :src="imgSrc"
                :style="imgstyle"
              >
              <canvas
                id="can"
                ref="table"
                :width="canvasWidth"
                :height="canvasHeight"
                :style="canvasstyle"
              ></canvas>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.home-container {
  height: 100%;
}
.tittle {
  height: 40px;
  line-height: 40px;
}
.bts {
  margin-right: 15px;
}
.headerContainer {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.el-header {
  background-color: #373d41;
  padding-left: 15px;
  align-items: center;
  color: #fff;
  font-size: 25px;
}
.nameListSpan {
  font-size: 20px;
}
.el-header div {
  display: flex;
  justify-content: space-between;
}
.el-aside {
  background-color: #eaedf1;
}
#elMain {
  padding: 0px;
  margin: 0px;
  background-color: #eaedf1;
}
</style>
<script>
import vue from 'vue'
export default {
  name: 'canvasDraw',
  created () {
    this.imgSrc = this.$route.query.imageUrlParam
    this.getLabeledName()
  },
  data () {
    return {
      nameList: [],
      showlabeled: false,
      imgSrc: '',
      startX: '', // 画画开始的X坐标
      startY: '', // 画画开始的Y坐标
      endX: '', // 画画结束的X坐标
      endY: '', // 画画结束的Y坐标
      isMouseDownInCanvas: '', // 鼠标是否按下
      customcxt: '', // cxt
      customRwidth: '', // 原图与展示图片的宽度比
      customRheight: '', // 原图与展示图片的高度比
      imgstyle: '', // 根据图片大小自适应样式
      canvasstyle: '', // 根据图片大小canvas自适应样式 居中显示
      canvasWidth: '', // 根据图片大小自适应canvas宽
      canvasHeight: '', // 根据图片大小自适应canvas高
      DivWidth: 1460, // 最大宽度
      // DivHeight: 740 // 最大高度
      DivHeight: 740 // 最大高度
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    goBack () {
      // 未加参数
      this.$router.push('/imagelabelhome')
    },
    // dialog展示自定义矩形框画板，计算img与canvas标签自适应图片的大小
    show () {
      // DOM渲染结束后才会运行
      vue.nextTick(_ => {
        console.log('showing')
        const customCanvas = this.$refs.table// canvas显示层
        this.customcxt = customCanvas.getContext('2d')
        const img = new Image()
        img.src = this.imgSrc
        const that = this
        img.onload = function () {
          // let canvasleft = 0
          const canvasleft = 0
          let canvastop = 0
          const WrH = img.width / img.height // 图片宽高比
          const RWrH = that.DivWidth / that.DivHeight // 放置图片DIV的宽高比
          console.log('img.width:' + img.width + ' img.height:' + img.height)
          console.log('that.DivWidth:' + that.DivWidth + ' that.DivHeight:' + that.DivHeight)
          let aa = 0
          console.log('dw/dh:' + RWrH + ' iw/ih:' + WrH)
          aa = that.DivWidth / img.width
          that.canvasHeight = img.height * aa
          that.canvasWidth = that.DivWidth
          canvastop = (that.DivHeight - that.canvasHeight) / 2
          that.imgstyle = ' position: relative;  width:' +
            that.canvasWidth + ' px; height:' +
            that.canvasHeight + 'px' // img浮动定位居中显示
          that.customRwidth = that.canvasWidth / img.width // 原图与展示图片的宽高比
          that.customRheight = that.canvasHeight / img.height
          that.canvasstyle = 'position: absolute;left: ' +
            canvasleft + '; top: ' + canvastop + ';' // canvas浮动定位
          console.log('that.canvasHeight:' + that.canvasHeight)
          console.log('that.DivHeight:' + that.DivHeight)
          that.DivHeight = that.canvasHeight
        }
      })
    },
    showlabeledFunc () {
      this.showlabeled = !this.showlabeled
      if (this.showlabeled) {
        this.myDraw()
      } else {
        // 清除指定区域的所有像素
        this.customcxt.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      }
    },
    myDraw () {
      console.log('Start drawing')
      this.customcxt.strokeStyle = '#00ff00' // 矩形框颜色
      this.customcxt.lineWidth = '2' // 矩形框宽度
      // 从本地session中取出该图片的标注信息
      var labelInfoTemp = JSON.parse(window.sessionStorage.getItem(this.imgSrc))
      var myStartX = null
      var myStartY = null
      var myEx = null
      var myEy = null
      for (var myindex in labelInfoTemp) {
        myStartX = labelInfoTemp[myindex].x * this.canvasWidth
        myStartY = labelInfoTemp[myindex].y * this.canvasHeight
        myEx = labelInfoTemp[myindex].ex * this.canvasWidth
        myEy = labelInfoTemp[myindex].ey * this.canvasHeight
        this.customcxt.strokeRect(myStartX, myStartY, myEx - myStartX, myEy - myStartY) // 绘制矩形
        // 设置字体
        this.customcxt.font = '25px bold 黑体'
        // 设置颜色
        this.customcxt.fillStyle = '#00ff00'
        // 设置水平对齐方式
        this.customcxt.textAlign = 'center'
        // 设置垂直对齐方式
        this.customcxt.textBaseline = 'middle'
        // 绘制文字（参数：要写的字，x坐标，y坐标）
        this.customcxt.fillText(Number(myindex) + 1, myStartX + (myEx - myStartX) / 2, myStartY + (myEy - myStartY) / 2)
      }
    },
    getLabeledName () {
      // 从本地session中取出该图片的标注信息
      var labelInfoTemp = JSON.parse(window.sessionStorage.getItem(this.imgSrc))
      for (var myindex in labelInfoTemp) {
        this.nameList.push(labelInfoTemp[myindex].name)
      }
    },
    // 鼠标按下时执行
    mousedown (e) {
      this.isMouseDownInCanvas = true
      // 鼠标按下时开始位置与结束位置相同 防止鼠标在画完矩形后 点击图画形成第二个图形
      this.endX = e.offsetX
      this.endY = e.offsetY
      this.startX = e.offsetX
      this.startY = e.offsetY
      this.mousemove(e)
    },
    // 鼠标移动式时执行
    mousemove (e) {
      if (this.isMouseDownInCanvas) { // 当鼠标有按下操作时执行
        this.endX = e.offsetX
        this.endY = e.offsetY
        var wwidth = this.endX - this.startX
        var wheigth = this.endY - this.startY
        // 清除指定区域的所有像素
        this.customcxt.clearRect(0, 0, this.DivWidth, this.DivHeight)
        this.customcxt.strokeStyle = ' #00ff00' // 矩形框颜色
        this.customcxt.lineWidth = '2' // 矩形框宽度
        this.customcxt.strokeRect(this.startX, this.startY, wwidth, wheigth) // 绘制矩形
      }
    },
    // 鼠标松开时执行
    mouseup (e) {
      this.isMouseDownInCanvas = false
      console.log('this.startX:' + this.startX)
      console.log('this.startY:' + this.startY)
      console.log('this.endX:' + this.endX)
      console.log('this.endY:' + this.endY)
    },
    Mouseleave (e) {
      this.isMouseDownInCanvas = false
    }
  }
}
</script>
