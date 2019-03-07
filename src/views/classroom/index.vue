<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item">默认按钮</el-button>
      <el-button class="filter-item" type="primary">主要按钮</el-button>
      <el-button class="filter-item" type="success">成功按钮</el-button>
      <el-button class="filter-item" type="info">信息按钮</el-button>
      <el-button class="filter-item" type="warning">警告按钮</el-button>
      <el-button class="filter-item" type="danger">危险按钮</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList"/>


  </div>
</template>

<script>
import { getClassroomData } from '@/api/classroom'

import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data () {
    return {
      listLoading: false,
      list: [
        // {
        //   title: 'aa',
        //   author: 'bb',
        //   pageviews: 'cc',
        //   status: 1,
        //   display_time: '2018-08-08'
        // },
        // {
        //   title: 'aa',
        //   author: 'bb',
        //   pageviews: 'cc',
        //   status: 1,
        //   display_time: '2018-08-08'
        // },
        {
          title: 'aa',
          author: 'bb',
          pageviews: 'cc',
          status: 1,
          display_time: '2018-08-08'
        }
      ],
      total: 1,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
    }
  },
  methods: {
    getList() {
      this.listLoading = true
      getClassroomData(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
        }, 1.5 * 1000)
      }).catch(()=>{
        alert()
        this.listLoading = false
      })
    },
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

  /*.btn-group {*/
    /*margin-bottom: 15px;*/
  /*}*/
</style>
