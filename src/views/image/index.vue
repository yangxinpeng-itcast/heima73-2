<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <my-bread>素材管理</my-bread>
    </div>
    <div style=" overflow: hidden;">
      <el-radio-group size="small" v-model="reqParams.collect" style="float:left" @change="seach()">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        size="small"
        @click="dialogVisible = true"
        style="float: right;"
        type="success"
      >添加素材</el-button>
    </div>
    <ul>
      <li v-for="(item) in images" :key="item.id" class="pic">
        <img :src="item.url" />
        <div class="floot" v-if="!reqParams.collect">
          <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="toggleFav(item)"></span>
          <span class="el-icon-delete"></span>
        </div>
      </li>
    </ul>
    <el-pagination
      v-if="total>reqParams.per_page"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      @current-change="pager"
      :current-page="reqParams.page"
    ></el-pagination>

    <!-- 添加素材弹框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        collect: 'false',
        per_page: 12,
        page: 1
      },
      images: [],
      total: 0,
      // 添加素材数据
      dialogVisible: false,
      // 预览的地址
      imageUrl: null,
      // 上传图片请求头
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('heima73')).token
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 弹框
    // 上传成功后的处理函数
    handleSuccess (res) {
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setInterval(() => {
        this.dialogVisible = false
        this.getImages()
        this.imageUrl = null
      }, 1500)
    },
    // 分页器换页触发
    pager (newPage) {
      this.reqParams.page = newPage
      // 改变当前页数后重新发送请求
      this.getImages()
    },
    async toggleFav (item) {
      const { data: { data } } = await this.$axios.put('/user/images/' + item.id, {
        collect: !item.is_collected
      })
      // 修改成功后图标切换颜色
      item.is_collected = data.is_collected
      this.getImages()
    },
    // 调用getImages根据当前reqParams.collect已经改变的值重新获取数据
    // change事件的回调函数是当前选中项的:lable值,所以reqParams中的collect也会跟着改变
    // 这些都是在文档中看的,人家定义的
    seach () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.reqParams })
      // console.log(data);
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang="less">
.box-card {
  text-align: center;
  ul {
    overflow: hidden;
    width: 100%;
    height: 100%;
    padding: 0;
    .pic {
      position: relative;
      width: 180px;
      height: 180px;
      float: left;
      list-style: none;
      text-align: center;
      margin: 5px 10px 5px 0;
      border: 1px solid #ccc;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
      .floot {
        position: absolute;
        width: 100%;
        height: 30px;
        left: 0;
        bottom: 0;
        background-color: #fff;
        border-top: 1px solid #ccc;
        line-height: 30px;
        span {
          padding: 0 20px;
          height: 15px;
        }
        .red {
          color: red;
        }
      }
    }
  }
}
</style>
