<template>
  <!-- 筛选容器 -->
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 默认插槽 -->
      <my-bread>内容管理</my-bread>
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

    </div>
  </el-card>
</template>

<script>
// 封装了插件后这里就不用再导入和挂载了
// 引入面包屑组件
// import MyBread from '@/components/my-bread'
export default {
// 挂载面包屑组件
// components:{MyBread:MyBread},
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
