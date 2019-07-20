<template>
  <el-card>
    <div slot="header">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="comments" style="width:100%">
      <el-table-column label="标题"></el-table-column>
      <el-table-column label="总评论数"></el-table-column>
      <el-table-column label="粉丝评论数"></el-table-column>
      <el-table-column label="状态"></el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 评论列表信息
      comments: []
    }
  }
}
</script>

<style scoped lang='less'>
</style>
