<template>
  <div class="app-container">
    <div style="text-align: center">
      <span>{{ this.$route.query.className }}</span>
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
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
        {{ scope.$index + 1 }}
        </template>
      </el-table-column>
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
      <el-table-column label="作业提交率" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="`总作业数：${scope.row.totalCommitNumber}，总提交数：${scope.row.commitNumber}, 提交率：${scope.row.commitRate}`" placement="top-start" v-if="scope.row.commitRate">
            <el-tag>{{ scope.row.commitRate }}</el-tag>
          </el-tooltip>
          <span v-else>暂无作业</span>
        </template>
      </el-table-column>
      <el-table-column label="作业平均分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.averageScore }}</span>
        </template>
      </el-table-column>
      <el-table-column label="出勤率" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" :content="`总考勤任务数：${scope.row.totalAttendanceNumber}，总出勤数：${scope.row.attendanceNumber}, 出勤率：${scope.row.attendanceRate}`" placement="top-start" v-if="scope.row.attendanceRate">
            <el-tag>{{ scope.row.attendanceRate }}</el-tag>
          </el-tooltip>
          <span v-else>暂无考勤任务</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="加入时间" sortable="custom" prop="createdDate">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createdDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">移出班级</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList"/>

  </div>
</template>

<script>
import { getStudentData, moveOutOfClass, exportStudentDataByClassroomId } from '@/api/student'
import { downloadAction } from '@/utils/download'

import Pagination from '@/components/Pagination'

import waves from '@/directive/waves' // Waves directive

export default {
  name: 'Classroom',
  components: { Pagination },
  directives: { waves },
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getStudentData(this.$route.params.id, this.listQuery).then(data => {
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
    handleDelete(row) {
      this.$confirm(`此操作将该同学(${row.fullName})移出本班级, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        moveOutOfClass(row.id).then((data) => {
          this.$notify({
            title: '成功',
            message: data.success ? '移出成功' : data.msg,
            type: data.success ? 'success' : 'error',
            duration: 2000
          })
          this.getList()
        }).catch(() => {
          this.$notify({
            title: '失败',
            message: '移出失败',
            type: 'error',
            duration: 2000
          })
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消移出'
        });
      });
    },
    exportData() {
      exportStudentDataByClassroomId(this.$route.params.id).then((data) => {
        if (data) {
          downloadAction(data, this.$route.query.className + '-汇总数据.xls')
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
