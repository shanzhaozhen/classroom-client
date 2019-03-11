<template>
  <div class="app-container">
    <div style="text-align: center">
      <span>{{ this.$route.query.homeworkTaskName }}</span>
    </div>
    <div class="filter-container">
      <el-button v-waves class="filter-item" icon="el-icon-back" @click="$router.back(-1)">返回</el-button>
      <div style="float: right;">
        <el-input placeholder="请输入关键字" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" @keyup.enter.native="getList"/>
        <el-button v-waves class="filter-item" style="margin-left: 10px;"  type="primary" icon="el-icon-search" @click="getList">查询</el-button>
      </div>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @sort-change="sortChange">
      <el-table-column label="姓名" align="center" sortable="custom" prop="u.sysUserInfo.fullName">
        <template slot-scope="scope">
            {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" sortable="custom" prop="u.sysUserInfo.nickname">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="提交时间" sortable="custom" prop="createdDate">
        <template slot-scope="scope">
          <div v-if="scope.row.createdDate !== null">
            <router-link :to="'/homework/' + scope.row.id" class="link-type">
              <i class="el-icon-time"/>
              <span>{{ scope.row.createdDate }}</span>
            </router-link>
          </div>
          <span v-else>未交作业</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="评分" sortable="custom" prop="createdDate">
        <template slot-scope="scope">
          <span v-if="scope.row.score !== null">{{ scope.row.score }}</span>
          <span v-else>未评分</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="210" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="giveScore(scope.row)">评分</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList"/>

  </div>
</template>

<script>
import { getHomeworkData, giveHomeworkScore } from '@/api/homework'

import Pagination from '@/components/Pagination'

import waves from '@/directive/waves' // Waves directive

export default {
  name: 'Homework',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      if (status === true) {
        return ''
      }
      return 'success'
    },
    statusTextFilter(status) {
      if (status === true) {
        return '已下线'
      }
      return '发布中'
    }
  },
  data () {
    return {
      listLoading: false,
      list: [],
      total: 0,
      listQuery: {
        page: 0,
        size: 20,
        importance: undefined,
        keyword: '',
        type: undefined,
        sort: ''
      },
      statusOptions: ['published', 'draft', 'deleted']
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getHomeworkData(this.$route.params.id, this.listQuery).then(data => {
        this.list = data.content
        this.total = data.totalElements
        // Just to simulate the time of the request
        this.listLoading = false
      }).catch(()=>{
        this.listLoading = false
      })
    },
    sortChange(data) {
      const { prop, order } = data
      if (!order) {
        this.listQuery.sort = ''
      } else if (order === 'ascending') {
        this.listQuery.sort = `${prop},asc`
      } else {
        this.listQuery.sort = `${prop},desc`
      }
      this.getList()
    },
    giveScore(row) {
      if (row.createdDate === null) {
        this.$alert('该同学还没交作业暂不能评分', '提示', {
          confirmButtonText: '确定',
          callback: () => {
            return
          }
        })
      } else {
        this.$prompt('请输入您的评分（0-100）', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /([1-9]?\d|100)$/,
          inputErrorMessage: '分数格式不正确'
        }).then(({value}) => {
          giveHomeworkScore(row.id, {score: value}).then(() => {
            this.$notify({
              title: '成功',
              message: '评分成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '评分失败',
              type: 'error',
              duration: 2000
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '评分已取消'
          });
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>

  .filter-container {
    padding-bottom: 10px;

    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }

</style>
