<template>
  <!-- 筛选容器 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </span>
    </div>
    <div>
      <el-form :model="reqParams" size="small" label-width="80px">
        <el-form-item label="状态 :">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道 :">
          <el-select v-model="reqParams.channel_id" placeholder="所有频道">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间 :">
          <!-- value1应该是数组，因为提交给后台的是两个时间数据 -->
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
      <el-card>
        <my-test>
          <template slot="con" slot-scope="scope">内容{{scope.test}}</template>
          <template slot="fot">底部2</template>
        </my-test>
      </el-card>
    </div>
  </el-card>
</template>

<script>
import MyTest from '../../components/my-test'
export default {
  components: { MyTest },
  data () {
    return {
      // 提交给后台的筛选条件
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      channelOptions: [{ id: '1', name: 'java' }, { id: '2', name: '前端' }],
      // 这里的数据应该从后台获取，以后获取后台时再根据reqParams里的属性修改
      value1: []
    }
  }
}
</script>

<style>
</style>
