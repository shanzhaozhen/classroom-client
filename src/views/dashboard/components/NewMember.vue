<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>待通过</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="getList">
        <i class="el-icon-refresh"></i> 刷新
      </el-button>
    </div>
    <div>
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        @sort-change="sortChange">
        <el-table-column align="center" label="序号" width="55">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="申请加入的班级" align="center" sortable="custom" prop="c.name">
          <template slot-scope="scope">
            {{ scope.row.classroomName }}
          </template>
        </el-table-column>
        <el-table-column label="学号" align="center" width="120" sortable="custom" prop="u.sysUserInfo.number">
          <template slot-scope="scope">
            {{ scope.row.number }}
          </template>
        </el-table-column>
        <el-table-column label="姓名" align="center" width="90" sortable="custom" prop="u.sysUserInfo.fullName">
          <template slot-scope="scope">
            {{ scope.row.fullName }}
          </template>
        </el-table-column>
        <el-table-column label="昵称" align="center" width="120"  sortable="custom" prop="u.sysUserInfo.nickName">
          <template slot-scope="scope">
            <span>{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="申请时间" width="165" sortable="custom" prop="createdDate">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span>{{ scope.row.createdDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="145" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handlePass(scope.row)">同意</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList"/>
    </div>
  </el-card>
</template>

<script>
import { getStudentTempData, passStudent, refuseStudent } from '@/api/student-temp'

import Pagination from '@/components/Pagination'

export default {
  name: 'NewMember',
  components: { Pagination },
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
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getStudentTempData(this.listQuery).then(data => {
        this.list = data.content
        this.total = data.totalElements
        this.$emit('updateNewMemberNumber', data.totalElements)
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
    handlePass(row) {
      this.$confirm(`此操作将同意该同学(${row.fullName})加入“${row.classroomName}”班级, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        passStudent(row.id).then((data) => {
          this.$notify({
            title: '成功',
            message: data.success ? '通过成功' : data.msg,
            type: data.success ? 'success' : 'error',
            duration: 2000
          })
          this.getList()
        }).catch(() => {
          this.$notify({
            title: '失败',
            message: '操作失败',
            type: 'error',
            duration: 2000
          })
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消同意'
        });
      });
    },
    handleDelete(row) {
      this.$confirm(`此操作将拒绝该同学(${row.fullName})加入“${row.classroomName}”班级, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        refuseStudent(row.id).then((data) => {
          this.$notify({
            title: '成功',
            message: data.success ? '拒绝成功' : data.msg,
            type: data.success ? 'success' : 'error',
            duration: 2000
          })
          this.getList()
        }).catch(() => {
          this.$notify({
            title: '失败',
            message: '拒绝失败',
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
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
