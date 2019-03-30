<template>
  <div class="app-container">
    <div style="text-align: center">
      <span>{{ this.$route.query.signTaskName }}</span>
      <span v-if="attendanceRate">{{'(出勤率：'+ attendanceRate + ')' }}</span>
    </div>
    <div class="filter-container">
      <el-button v-waves class="filter-item" icon="el-icon-back" @click="$router.back(-1)">返回</el-button>
      <el-button v-waves class="filter-item" icon="el-icon-document" type="primary" @click="exportData">导出数据</el-button>
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
      <el-table-column label="学号" align="center" sortable="custom" prop="u.sysUserInfo.number">
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center" sortable="custom" prop="u.sysUserInfo.fullName">
        <template slot-scope="scope">
            {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column label="昵称" align="center" sortable="custom" prop="u.sysUserInfo.nickName">
        <template slot-scope="scope">
          <span>{{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="签到时间" sortable="custom" prop="createdDate">
        <template slot-scope="scope">
          <div v-if="scope.row.createdDate !== null">
            <i class="el-icon-time" />
            <span>{{ scope.row.createdDate }}</span>
          </div>
          <span v-else>未签到</span>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList"/>

  </div>
</template>

<script>
import { getSignInData, exportSignInDataBySignTaskId } from '@/api/sign'
import { getAttendanceRateBySignTaskId } from '@/api/sign-task'
import { downloadUtil } from '@/utils/downloadUtil'

import Pagination from '@/components/Pagination'

import waves from '@/directive/waves' // Waves directive

export default {
  name: 'Classroom',
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
      statusOptions: ['published', 'draft', 'deleted'],
      attendanceRate: null
    }
  },
  created() {
    this.getList()
    this.getAttendanceRate()
  },
  methods: {
    getList() {
      this.listLoading = true
      getSignInData(this.$route.params.id, this.listQuery).then(data => {
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
    getAttendanceRate() {
      if (this.$route.params.id) {
        getAttendanceRateBySignTaskId(this.$route.params.id).then((res)=>{
          this.attendanceRate = res.attendanceRate
        })
      }
    },
    exportData() {
      exportSignInDataBySignTaskId(this.$route.params.id).then((data) => {
        if (data) {
          downloadUtil(data, this.$route.query.signTaskName + '-出勤数据.xls')
        } else {
          this.$notify({
            title: '失败',
            message: '下载失败',
            type: 'error',
            duration: 2000
          })
        }
      })
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
