<template>
  <el-card>
    <div slot="header">
      <my-bread>评论管理</my-bread>
    </div>
    <el-table :data="comments" style="width:100%">
      <el-table-column label="标题" prop="title" width="350px"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.comment_status"
            type="success"
            size="mini"
            @click="close(scope.row)"
          >打开评论</el-button>
          <el-button v-else type="danger" size="mini" @click="open(scope.row)">关闭评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="changePage"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 评论列表信息
      comments: [],
      // 这里不是所有的参数都要写,需要什么些什么
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async close (edit) {
      const {
        data: { data }
      } = await this.$axios.put('comments/status?article_id=' + edit.id, {
        allow_comment: !edit.comment_status
      })
      edit.comment_status = data.allow_comment
    },
    async open (edit) {
      const { data: { data } } = await this.$axios.put('comments/status?article_id=' + edit.id, {
        allow_comment: !edit.comment_status
      })
      edit.comment_status = data.allow_comment
    },
    changePage (m) {
      this.reqParams.page = m
      this.getComments()
    },
    async getComments () {
      const {
        data: { data }
      } = await this.$axios.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
</style>
