<template>
  <div class="myimg">
    <div class="img-btn" @click="openDialog()">
      <img :src="value || defaultImg" alt />
    </div>
    <!-- 封面弹出框 -->
    <el-dialog :visible.sync="dialogVisible">
      <!-- 选项卡 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="xxk">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选按钮 -->
          <el-radio-group v-model="reqParams.collect" @change="edit">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <ul>
            <li
              v-for="item in images"
              :key="item.id"
              class="img"
              :class="{god:selectedUrl === item.url}"
              @click="selected(item.url)"
            >
              <img :src="item.url" />
            </li>
          </ul>
          <!-- 分页器 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            style="margin:0"
            @current-change="peger"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
            :headers="headers"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImg from '../../assets/images/default.png'
export default {
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      imageUrl: '',
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('heima73')).token
      },
      reqParams: {
        collect: 'false',
        page: 1,
        per_page: 8
      },
      images: [],
      total: 0,
      selectedUrl: null,
      //   value: defaultImg
      // 双向绑定之后就不用给value赋值了,父传子会传递过来value值,用props接的
      defaultImg
    }
  },
  methods: {
    confirmImage () {
      // 有两种情况
      // 1.当前在素材库
      if (this.activeName === 'image') {
        if (!this.selectedUrl) {
          this.$message.info('请选择图片')
        } else {
        //   this.value = this.selectedUrl
        // 双向绑定后不需要再给value赋值了,将数据传给父组件
          this.$emit('input', this.selectedUrl)
        }
      } else {
        // 2.当前在上传图片界面
        if (!this.imageUrl) {
          this.$message.info('请上传图片')
        } else {
        //   this.value = this.imageUrl
          this.$emit('input', this.imageUrl)
        }
      }
      this.dialogVisible = false
    },
    selected (url) {
      this.selectedUrl = url
    },
    edit () {
      this.getImage()
    },
    peger (parge) {
      this.reqParams.page = parge
      this.getImage()
    },
    openDialog () {
      this.dialogVisible = true
      // 打开对话框 将上次上传图片清空
      this.imageUrl = null
      this.selectedUrl = null
      this.getImage()
    },
    async getImage () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.reqParams })
      console.log(data)
      this.images = data.results
      this.total = data.total_count
    },
    // 素材上传成功后的回调函数
    handleSuccess (res) {
      this.imageUrl = res.data.url
    },
    handleClick () {}
  }
}
</script>

<style  scoped lang='less'>
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
.myimg {
    width: 150px;
    height: 150px;
    display: inline-block;
    margin-right: 20px;
}
</style>
