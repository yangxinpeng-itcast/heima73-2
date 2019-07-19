<template>
  <el-card class="box">
    <div slot="header">
      <my-bread>{{articleId?'修改文章':'发布文章'}}</my-bread>
    </div>
    <div>
      <el-form :model="articleForm" label-width="100px" size="small">
        <el-form-item label="标题:">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="success" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
// 引入富文本编辑器插件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: { quillEditor },
  data () {
    return {
      articleId: null,
      articleForm: {
        title: '',
        cover: {
          // 控制封面单选框 双向绑定
          type: 1,

          // 发布文章封面 单图 三图 无图 自动 数据在这里
          // images是发表文章必要参数
          images: []
        },
        channel_id: null,
        content: ''
      },
      radio: 1,
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }]
          ]
        }
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 重新发送请求获取当前修改文章的内容到修改组件中
    this.articleId && this.getArticle(this.articleId)
  },
  watch: {
    $route () {
      this.articleId = this.$route.query.id
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          // 单图  三图
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    async getArticle (id) {
      const {
        data: { data }
      } = await this.$axios.get('articles/' + id)
      this.articleForm = data
    },
    async publish (draft) {
      await this.$axios.post('articles?draft=' + draft, this.articleForm)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push({ path: '/article' })
      // console.log(data.id);
    },
    async edit (draft) {
      await this.$axios.put(
        `articles/${this.articleId}?draft=` + draft,
        this.articleForm
      )
      this.$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push({ path: '/article' })
      // console.log(data.id);
    },
    changeType () {
      // 重置图片数组
      this.articleForm.cover.images = []
    }
  }
}
</script>

<style scoped lang='less'>
</style>
