<template>
  <el-card class="box">
    <div slot="header">
      <my-bread>发布文章</my-bread>
    </div>
    <div>
      <el-form :model="articleForm" label-width="100px" size="small">
        <el-form-item label="标题:">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">富文本框</el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <div class="img-btn">
              <img src="../../assets/images/default.png">
          </div>
        </el-form-item>
        <el-form-item label="频道:" v-model="articleForm.channel_id">
            <my-channel></my-channel>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">发表</el-button>
            <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      articleForm: {
        title: '',
        cover: {
          type: 1
        },
        channel_id: null
      },
      radio: 1
    }
  }
}
</script>

<style scoped lang='less'>
    .img-btn {
        display: block;
        border: 1px dashed #ccc;
        width: 150px;
        height: 150px;
        margin-top: 5px;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
