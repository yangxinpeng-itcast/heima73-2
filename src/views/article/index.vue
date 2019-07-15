<template>
  <div>
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

    <!-- 筛选结果容器 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <h3 style="display:inline-block">0</h3>条结果：
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <!-- 这里是一个作用域插槽在后台获取的数据相当于子组件 -->
          <!-- 本组件在这里是父组件 -->
          <template slot-scope="scope">
            <!-- {{scope.row.cover.images[0]}} -->
            <el-image :src="scope.row.cover.images[0]" style="width:100px;height:70px">
              <div slot="error" class="image-slot">
                <img src="../../assets/images/error.gif" width="100px" height="70px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" width="180">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3"  type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4"  type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间">
          <template slot-scope="scope">{{scope.row.pubdate}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <div class="box1">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
  </div>
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
      channelOptions: [],
      // 这里的数据应该从后台获取，以后获取后台时再根据reqParams里的属性修改
      value1: [],

      // 列表数据
      articles: []
    }
  },
  created () {
    // 页面加载完毕后就执行钩子函数调用getChanelOptions函数
    this.getChannelOptions()
    // 调用获取列表数据函数
    this.getArticles()
  },
  methods: {
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$axios.get('channels')
      this.channelOptions = data.channels
    },
    // 获取文章列表数据
    async getArticles () {
      // 这里用?拼接数据适合传一个参数时，而多个参数要用对象的
      // 方式传参{params:{}}
      const {
        data: { data }
      } = await this.$axios.get('/articles', { params: this.reqParams })
      this.articles = data.results
      console.log(data.results)
    }
  }
}
</script>

<style  scoped lang='less'>
.box1 {
  text-align: center;
}
</style>
