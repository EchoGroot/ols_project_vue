<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <!-- 顶部标题 -->
        <span>个人中心</span>
      </div>
      <el-button type="info"> 退出 </el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened='true'
          :default-active='1+""'
          :router="true"
        >
          <el-menu-item :index="personalinfoIndex">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>个人信息</span>
            </template>
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>已接受任务</span>
            </template>
            <!-- 二级子菜单 -->
            <el-menu-item :index="acceptfinishIndex">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>已完成</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="acceptnotfinishIndex">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>未完成</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <!-- 一级菜单 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>已发布任务</span>
            </template>
            <!-- 二级子菜单 -->
            <el-menu-item :index="releasefinishIndex">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>已完成</span>
              </template>
            </el-menu-item>
            <el-menu-item :index="releasenotfinishIndex">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>未完成</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 主体结构 -->
      <el-main>
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      userId: '',
      personalinfoIndex: '/personalinfo',
      acceptfinishIndex: '/acceptetasklist',
      acceptnotfinishIndex: '/acceptetasklist',
      releasefinishIndex: '/releasetasklist',
      releasenotfinishIndex: '/releasetasklist',
      isRouterAlive: true
    }
  },
  created () {
    this.userId = this.$route.query.userId
    this.personalinfoIndex += '?userId=' + this.userId
    this.acceptfinishIndex += '?userId=' + this.userId + '&query=acceptfinish'
    this.acceptnotfinishIndex += '?userId=' + this.userId + '&query=acceptnotfinish'
    this.releasefinishIndex += '?userId=' + this.userId + '&query=releasefinish'
    this.releasenotfinishIndex += '?userId=' + this.userId + '&query=releasenotfinish'
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style scoped>
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
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  margin-left: 15px;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
</style>>
