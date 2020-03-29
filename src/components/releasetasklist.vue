<template>
  <el-card>
    <el-table
      :data="taskList"
      border
      style="width: 100%"
      stripe
    >
      <el-table-column
        prop="name"
        label="任务名称"
      >
      </el-table-column>
      <el-table-column
        prop="points"
        label="任务分值"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="任务状态"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="release_time"
        label="发布时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="finish_time"
        label="完成时间"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="accepte_num"
        label="接受者数量"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      // 获取查询用户信息的参数
      queryInfo: {
        id: 0,
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 保存请求回来的用户列表数据
      taskList: [],
      total: 0
    }
  },
  created () {
    console.log('this.$route.query:')
    console.log(this.$route.query)
    this.queryInfo.query = this.$route.query.query
    this.queryInfo.id = this.$route.query.userId
    this.getTaskList()
  },
  methods: {
    async getTaskList () {
      var url = 'user/getReleaseTaskByUserId'
      console.log('发送请求获取用户列表数据 url:' + url)
      const { data: res } = await this.$http.get(url, {
        params: this.queryInfo
      })
      console.log(res)
      // 如果返回状态为异常状态则报错并返回
      if (res.meta.status !== '200') {
        return this.$message.error('获取用户列表失败')
      }
      // 如果返回状态正常，将请求的数据保存在data中
      res.data.taskList.forEach(item => {
        switch (item.state) {
          case 0: item.state = '未完成'
            break
          case 1: item.state = '已完成'
            break
          case 2: item.state = '已删除'
            break
          case 3: item.state = '已失效'
            break
        }
      })
      this.taskList = res.data.taskList
      this.total = res.data.total
    },
    handleSizeChange (newSize) {
      console.log('pagesize改变时触发' + newSize)
      // pagesize改变时触发，当pagesize发生改变的时候，我们应该
      // 以最新的pagesize来请求数据并展示数据
      //   console.log(newSize)
      this.queryInfo.pagesize = newSize
      // 重新按照pagesize发送请求，请求最新的数据
      this.getTaskList()
    },
    handleCurrentChange (current) {
      console.log('页码发生改变时触发' + current)
      // 页码发生改变时触发当current发生改变的时候，我们应该
      // 以最新的current页码来请求数据并展示数据
      this.queryInfo.pagenum = current
      // 重新按照pagenum发送请求，请求最新的数据
      this.getTaskList()
    }
  },
  watch: {
    '$route.query': function (newVal, oldVal) {
      console.log('路由参数发生改变' + oldVal + '->' + newVal)
      this.reload()
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 10px;
}
</style>
