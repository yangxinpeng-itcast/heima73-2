<template>
  <div>
    <!-- 筛选容器 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 默认插槽 -->
        <my-bread>内容管理</my-bread>

        <!-- 子传父 -->
        <my-son @input="fn"></my-son>
        {{text}}

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
              <!-- 这里相当于父传子 只不过在父模板中使用的子模板绑定的是v-model而不是自定义属性-->
              <!-- 在子模版中用props接收 -->
              <my-channel v-model="reqParams.channel_id" @input="zcf"></my-channel>

          </el-form-item>
          <el-form-item label="时间 :">
            <!-- dateValues应该是数组，因为提交给后台的是两个时间数据 -->
            <!-- 点击筛选时提交给后台的日期格式错误，在这里需要修改一下 -->
            <el-date-picker
              value-format="yyyy-MM-dd"
              @change="changeDate"
              v-model="dateValues"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search()">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 筛选结果容器 -->
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <h3 style="display:inline-block">{{total}}</h3>条结果：
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
        <el-table-column label="标题" width="180" prop="title">
          <!--这里用prop获取标题也可以，因为标题只有文字不用其他操作-->
          <!-- <template slot-scope="scope">{{scope.row.title}}</template> -->
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate">
          <!-- <template slot-scope="scope">{{scope.row.pubdate}}</template> -->
        </el-table-column>
        <el-table-column label="操作">

            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
            </template>

        </el-table-column>
      </el-table>
      <div class="box1">
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="changePager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
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
      shuju: '父组件数据',
      // 提交给后台的筛选条件
      reqParams: {
        page: 1,
        per_page: 10,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },

      // 这里的数据应该从后台获取，以后获取后台时再根据reqParams里的属性修改
      dateValues: [],

      // 列表数据
      articles: [],
      // 总条数
      total: 0,

      text: ''
    }
  },
  created () {
    // 页面加载完毕后就执行钩子函数调用getChanelOptions函数

    // 调用获取列表数据函数
    this.getArticles()
  },
  methods: {
    zcf (data) {
      console.log(data)
      this.channel_id = data
    },
    fn (data) {
      console.log('fn')
      this.text = data
    },

    changePager (newPage) {
      // newPage当前点击的按钮的当前页
      // 改变当前页,更新提交给后台的参数
      this.reqParams.page = newPage
      // 获取当前列表数据
      this.getArticles()
    },
    // valaus默认和dateValues绑定的数据一致
    // 是change事件默认传入的
    changeDate (values) {
      // 给beigin和end赋值
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },
    search () {
      // 点击筛选按钮重新发送请求
      this.getArticles()
    },
    // 获取文章列表数据
    async getArticles () {
      // 这里用?拼接数据适合传一个参数时，而多个参数要用对象的
      // 方式传参{params:{}}
      const {
        data: { data }
      } = await this.$axios.get('/articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
      console.log(data)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$axios.delete('articles/' + id)
          // 删除成功后重新获取页面
          this.getArticles()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    edit (id) {
      // 点击编辑跳转到素材管理页
      // 这里的query相当于'?id=' +id
      this.$router.push({ path: '/publish', query: { id } })
    }
  }
}
</script>

<style  scoped lang='less'>
.box1 {
  text-align: center;
}
</style>
