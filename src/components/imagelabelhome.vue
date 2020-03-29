<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <!-- 顶部标题 -->
        <span>任务详情</span>
      </div>
      <el-button
        type="info"
        @click="goBack"
      > 返回 </el-button>
    </el-header>
    <el-main class='bottomContainer'>
      <!-- 任务详情 -->
      <span>任务名称 {{task.name}}</span><br>
      <span>任务分值 {{task.points}}</span><br>
      <span>发布时间 {{task.releaseTime}}</span><br>
      <span>接受时间 {{task.accepteTime}}</span><br>
      <span>任务详情</span><br>
      <textarea
        :readonly="true"
        v-text="task.information"
      ></textarea>
      <!-- 标注示例 -->
      <el-row v-if="exampleShowFlag">
        <span class="tittle">标注示例 {{imageExampleList.length}}</span>
        <hr>
        <div
          v-for="(item, index) in imageExampleList"
          :key="index"
          class="imgContainer"
        >
          <img
            :src="imageUrl+item.originalImage"
            class="imgStyle"
          >
          <el-button
            @click="gotoshowimagelabel(imageUrl+item.originalImage)"
            type="success"
            round
          >查看</el-button>
        </div>
      </el-row>
      <!-- 未标注 -->
      <el-row v-if="notFinishShowFlag">
        <span class="tittle">{{tittle}} {{imageNotFinishlist.length}}</span>
        <hr>
        <div
          v-for="(item, index) in imageNotFinishlist"
          :key="index"
          class="imgContainer"
        >
          <img
            :src="imageUrl+item.originalImage"
            class="imgStyle"
          >
          <div class="lookAndLabel">
            <el-button
              @click="gotoshowimagelabel(imageUrl+item.originalImage)"
              type="success"
              round
            >查看</el-button>
            <el-button
              class="label"
              type="primary"
              round
            >
              <!-- @click="gotoImageLabel1(imageUrl+item.originalImage)" -->
              <!-- 打包上线时需要修改链接 -->
              <a
                target="_blank"
                :href="'http://127.0.0.1:8080/ImageLabelPage/index.html?imageUrl='+imageUrl+item.originalImage"
              >
                标注
              </a>
            </el-button>
          </div>
        </div>
      </el-row>
      <!-- 已标注 -->
      <el-row v-if="finishShowFlag">
        <span class="tittle">已标注 {{imageFinishlist.length}}</span>
        <hr>
        <div
          v-for="(item, index) in imageFinishlist"
          :key="index"
          class="imgContainer"
        >
          <img
            :src="imageUrl+item.originalImage"
            class="imgStyle"
          >
          <div class="lookAndLabel">
            <el-button
              @click="gotoshowimagelabel(imageUrl+item.originalImage)"
              type="success"
              round
            >查看</el-button>
            <el-button
              v-if="labelAgainShowFlag"
              type="primary"
              round
              @click="gotoshowimagelabel(imageUrl+item.originalImage)"
            >
              <!-- :href="'http://127.0.0.1:8080/ImageLabelPage/index.html?imageUrl='+imageUrl+item.originalImage" -->
              <!-- 打包上线时需要修改链接 -->
              <a target="_blank">
                重新标注
              </a>
            </el-button>
          </div>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import $ from 'jquery'
import { imageLabel } from '../assets/scripts/jquery.imageLabel.min.js'
export default {
  data () {
    return {
      tittle: '',
      labelAgainShowFlag: false,
      exampleShowFlag: false,
      finishShowFlag: false,
      notFinishShowFlag: false,
      pageType: '',
      userId: 0,
      task: {
        accepteId: 0,
        name: '',
        information: '',
        releaseTime: '',
        accepteTime: '',
        points: 0
      },
      imageExampleList: [],
      imageFinishlist: [],
      imageNotFinishlist: [],
      imageUrl: 'http://yuyy.info/image/ols/'
    }
  },
  created () {
    // 获取URL中的参数
    this.pageType = this.$route.query.pageType
    switch (this.pageType) {
      case 'personalAcceptNotFinishPage':
        // 显示重新标注按钮
        this.labelAgainShowFlag = true
        this.tittle = '未标注'
        break
      case 'personalAcceptFinishPage':

        break
      case 'otherReleasePage':
        this.tittle = '标注任务'
        break
      case 'personalReleasePage':
        this.tittle = '标注任务'
        break
      case 'judgePage':
        this.tittle = '标注任务'
        break
    }
    this.task.accepteId = this.$route.query.accepteId
    this.userId = this.$route.query.userId
    this.getAccepteImageList()
    $(function () {
      $('.right-select-box')
    })
  },
  methods: {
    gotoshowimagelabel (imageUrlParam) {
      this.$router.push('/showimagelabel?imageUrlParam=' + imageUrlParam)
    },
    gotoImageLabel1 (imageUrlParam) {
      this.$router.push('/imagelabel?imageUrlParam=' + imageUrlParam)
    },
    gotoImageLabel (imageUrlParam) {
      var that = this
      window.c = imageLabel({
        img: imageUrlParam,
        editPop: !0,
        close: function (t) {
          return !0
        },
        clickArea: function () { },
        edit: function (t) { },
        startArea: function () { },
        confirm: async function (t) {
          console.log(t.length)
          console.log(JSON.stringify(t))
          var labelInfoTemp = []
          for (let i = 0; i < t.length; i++) {
            if (t[i].name !== '') {
              labelInfoTemp.push(t[i])
            }
          }
          console.log('过滤掉没有标签名的标注')
          console.log(labelInfoTemp)
          var url = 'task/storeImageLabelInfo'
          console.log('发送图片标注数据:' + url)
          console.log(typeof (that.imageUrl))
          console.log(typeof (imageUrlParam))
          var imageUrlParamTemp = imageUrlParam.substring(that.imageUrl.length, imageUrlParam.length)
          const { data: res } = await that.$http.post(url, {
            accepteTaskId: that.task.accepteId,
            labelInfo: labelInfoTemp,
            imageUrlParam: imageUrlParamTemp
          })
          console.log(res)

          // 如果返回状态为异常状态则报错并返回
          if (res.meta.status !== '200') {
            return that.$message.error('存储图片标注数据失败')
          }
          let flage = false
          console.log('imageUrlParamTemp' + imageUrlParamTemp)
          // 在未标注中移除该图片
          for (var myIndex in that.imageNotFinishlist) {
            console.log('遍历未标注' + that.imageNotFinishlist[myIndex].originalImage)
            if (that.imageNotFinishlist[myIndex].originalImage === imageUrlParamTemp) {
              console.log('在未标注中找到该图像')
              that.imageNotFinishlist.splice(myIndex, 1)
              that.imageFinishlist.push({
                originalImage: imageUrlParamTemp,
                isLabeled: true,
                labeledInfo: labelInfoTemp
              })
              flage = true
              // 更新本地session中的标注信息
              window.sessionStorage.setItem(imageUrlParam, JSON.stringify(labelInfoTemp))
              break
            }
          }
          if (!flage) {
            for (var myIndex1 in that.imageFinishlist) {
              console.log('遍历已标注' + that.imageFinishlist[myIndex1].originalImage)
              if (that.imageFinishlist[myIndex1].originalImage === imageUrlParamTemp) {
                console.log('在已标注中找到该图像')
                that.imageFinishlist[myIndex1].labeledInfo = labelInfoTemp
                // 更新本地session中的标注信息
                window.sessionStorage.setItem(imageUrlParam, JSON.stringify(labelInfoTemp))
                break
              }
            }
          }
          $('.imageLabel-box').remove()
          that.$message.success('图片标注成功')
          return !0
        }
      })
    },
    async getAccepteImageList () {
      var url = 'task/getAcceptImageListByAcceptId'
      console.log('发送请求获取接受任务图片数据:' + url)
      const { data: res } = await this.$http.get(url, {
        params: {
          acceptId: this.task.accepteId,
          userId: this.userId
        }
      })
      console.log(res)
      // 如果返回状态为异常状态则报错并返回
      if (res.meta.status !== '200') {
        return this.$message.error('获取任务图片数据失败')
      }
      // 如果返回状态正常，将请求的数据保存在data中
      var accepteImageList = JSON.parse(res.data.taskImage.ols_accepte_url)
      console.log(accepteImageList)
      // 标签存到session
      window.sessionStorage.setItem(
        this.task.accepteId + 'labelName',
        JSON.stringify(accepteImageList.labelName)
      )
      for (let i = 0; i < accepteImageList.taskImage.length; i++) {
        console.log(accepteImageList.taskImage[i])
        if (accepteImageList.taskImage[i].isExample) {
          this.exampleShowFlag = true
          this.imageExampleList.push(accepteImageList.taskImage[i])
          // 标注信息存本地session
          window.sessionStorage.setItem(
            this.imageUrl + accepteImageList.taskImage[i].originalImage,
            JSON.stringify(accepteImageList.taskImage[i].labeledInfo)
          )
        } else if (accepteImageList.taskImage[i].isLabeled) {
          this.finishShowFlag = true
          this.imageFinishlist.push(accepteImageList.taskImage[i])
          // 标注信息存本地session
          window.sessionStorage.setItem(
            this.imageUrl + accepteImageList.taskImage[i].originalImage,
            JSON.stringify(accepteImageList.taskImage[i].labeledInfo)
          )
        } else {
          this.notFinishShowFlag = true
          this.imageNotFinishlist.push(accepteImageList.taskImage[i])
        }
      }
      this.task.name = res.data.taskImage.name
      this.task.information = res.data.taskImage.information
      this.task.accepteTime = res.data.taskImage.accept_time
      this.task.releaseTime = res.data.taskImage.release_time
      this.task.points = res.data.taskImage.points
    },
    goBack () {
      // 注意判断是vue页面还是其他页面
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
textarea {
  margin-right: 14px;
  width: 100%;
  height: 100px;
}
.tittle {
  font-size: 20px;
}
.lookAndLabel {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}
.imgContainerParent {
  float: left;
}
.bottomContainer {
  height: 100%;
}
.label {
  margin-left: 140px;
}
hr {
  margin-right: 14px;
}
.imgContainer {
  float: left;
  margin-right: 14px;
  margin-top: 10px;
  width: 218px;
}
.imgStyle {
  width: 218px;
  height: 150px;
}
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 25px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  margin-left: 15px;
}
.el-aside {
  height: 100%;
  background-color: #eaedf1;
  overflow: auto;
}
.el-main {
  background-color: #eaedf1;
}
</style>>
