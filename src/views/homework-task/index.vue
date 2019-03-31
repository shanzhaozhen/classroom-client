<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">发起作业任务</el-button>
      <div style="float: right;">
        <el-select class="filter-item" v-model="listQuery.classroomId" filterable placeholder="请选择班级" style="margin-right: 10px;">
          <el-option label="所有班级" value=""></el-option>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
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
      <el-table-column label="作业名称" width="250" align="center" sortable="custom" prop="name">
        <template slot-scope="scope">
          <router-link :to="{path: '/homework-task/' + scope.row.id, query:{homeworkTaskName:scope.row.name}}" class="link-type">
            <span>{{ scope.row.name }}</span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="作业概述" sortable="custom" prop="outline">
        <template slot-scope="scope">
          <span>{{ scope.row.outline }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开始时间" width="180" sortable="custom" prop="createdDate">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="结束时间" width="180" sortable="custom" prop="createdDate">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="发布状态" width="110" align="center" sortable="custom" prop="announce">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.announce === true" type="success">发布中</el-tag>
          <el-tag v-else type="info">已下线</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" width="200" sortable="custom" prop="createdDate">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.createdDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="210" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button v-if="scope.row.announce === true" size="mini" @click="handleModifyStatus(scope.row, false)">下线</el-button>
          <el-button v-else size="mini" type="success" @click="handleModifyStatus(scope.row, true)">发布</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row,'deleted')">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.size" @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <input v-model="temp.id" type="hidden"/>
        <el-form-item label="作业名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入签到任务名称"></el-input>
        </el-form-item>
        <el-form-item label="作业概述">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="temp.outline" type="textarea" placeholder="请输入任务概述"></el-input>
        </el-form-item>
        <el-form-item label="选择班级" prop="classroomId">
          <el-select class="filter-item" v-model="temp.classroomId" filterable placeholder="请选择班级" style="margin-right: 10px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="起止时间" prop="tempDate">
          <el-date-picker
            v-model="tempDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="发布状态" prop="announce">
          <el-radio-group v-model="temp.announce">
            <el-radio :label="true">发布</el-radio>
            <el-radio :label="false">下线</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="选取位置"
      :visible.sync="mapBoxVisible">
      <MapBox ref="map" :longitude.sync="temp.longitude" :latitude.sync="temp.latitude" :address.sync="temp.address"/>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirmLocation">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getClassroomSimpleData } from '@/api/classroom'

import { getHomeworkTaskData, createHomeworkTask, updateHomeworkTask, deleteHomeworkTask } from '@/api/homework-task'

import Pagination from '@/components/Pagination'

import MapBox from '@/components/MapBox'

import waves from '@/directive/waves' // Waves directive

import { parseTime } from '@/utils'

export default {
  name: 'HomeworkTask',
  components: {
    Pagination,
    MapBox
  },
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
      options: [],
      list: [],
      total: 0,
      listQuery: {
        page: 0,
        size: 20,
        importance: undefined,
        classroomId: '',
        keyword: '',
        type: undefined,
        sort: ''
      },
      statusOptions: ['published', 'draft', 'deleted'],
      temp: {
        id: undefined,
        classroomId: undefined,
        name: '',
        outline: '',
        date: [],
        startDate: new Date(),
        endDate: new Date(),
        announce: undefined
      },
      tempDate: undefined,
      dialogPvVisible: false,
      dialogFormVisible: false,
      mapBoxVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      rules: {
        name: [{ required: true, message: '任务名称是必填项', trigger: 'blur' }],
        tempDate: [{ validator: this.checkTempDate, trigger: 'blur' }],
        classroomId: [{ required: true, message: '班级是必选项', trigger: 'blur' }],
        signType: [{ required: true, message: '起止时间是必选项', trigger: 'blur' }],
        announce: [{ required: true, message: '发布状态是必选项', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getOptions()
    this.getList()
  },
  methods: {
    getOptions() {
      getClassroomSimpleData().then(data => {
        this.options = data
      })
    },
    getList() {
      this.listLoading = true
      getHomeworkTaskData(this.listQuery).then(data => {
        this.list = data.content
        this.total = data.totalElements
        // Just to simulate the time of the request
        this.listLoading = false
      }).catch(()=>{
        this.listLoading = false
      })
    },
    checkTempDate(rule, value, callback) {
      if (this.tempDate === null || this.tempDate === '') {
        callback(new Error('起止时间为必填项'))
      } else {
        callback()
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.startDate = parseTime(this.tempDate[0])
          this.temp.endDate =  parseTime(this.tempDate[1])
          createHomeworkTask(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '创建失败',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.tempDate = [row.startDate, row.endDate];
      this.temp.tempDate = this.tempDate;
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.startDate = parseTime(this.tempDate[0])
          this.temp.endDate =  parseTime(this.tempDate[1])
          updateHomeworkTask(this.temp).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          }).catch(() => {
            this.$notify({
              title: '失败',
              message: '修改失败',
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        classroomId: undefined,
        name: '',
        outline: '',
        date: [],
        startDate: new Date(),
        endDate: new Date(),
        announce: false
      }
      this.tempDate = []
    },
    handleModifyStatus(row, status) {
      row.announce = status
      updateHomeworkTask(row).then(() => {
        this.getList()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: status ? '已切换为发布状态' : '已切换为下线状态',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$notify({
          title: '失败',
          message: '切换失败',
          type: 'error',
          duration: 2000
        })
      })
    },
    handleDelete(row) {
      this.$confirm(`此操作将永久删除该签到任务(${row.name}), 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHomeworkTask(row.id).then((data) => {
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: data.success ? '删除成功' : data.msg,
            type: data.success ? 'success' : 'error',
            duration: 2000
          })
          this.getList()
        }).catch(() => {
          this.$notify({
            title: '失败',
            message: '删除失败',
            type: 'error',
            duration: 2000
          })
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
    handleGetLocation() {
      this.mapBoxVisible = true
      this.$nextTick(() => {
        this.$refs.map.init()
      })
    },
    handleConfirmLocation() {
      this.mapBoxVisible = false
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
