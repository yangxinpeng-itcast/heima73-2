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
      <el-button size="small" style="float: right;" type="success">添加素材</el-button>
    </div>
    <ul>
      <li v-for="(item) in images" :key="item.id" class="pic">
        <img :src="item.url" />
        <div class="floot">
          <span class="el-icon-star-off"></span>
          <span class="el-icon-delete"></span>
        </div>
      </li>
    </ul>
    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
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
      images: []
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    seach () {
      this.page = 1
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$axios.get('user/images', { params: this.reqParams })
      //   console.log(data)
      this.images = data.results
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
