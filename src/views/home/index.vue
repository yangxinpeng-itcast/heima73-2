<template>
  <el-container class="home-container">
    <el-aside class="aside" :width="collapse?'64px':'200px'">
      <div class="aside-top" :class="{close:collapse}"></div>
      <el-menu
        style="border:none"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-menu"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-menu"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-menu"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-menu"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <span class="el-icon-s-fold" @click="ddd"></span>
        <span class="text">江苏传智播客教育科技有限公司</span>
        <div class="right">
          <img :src="avatar"/>
          <el-dropdown>
            <span class="el-dropdown-link" style="border:none">
              {{name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="set()">设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      collapse: false,
      name: '',
      avatar: ''
    }
  },
  // 加载完毕后调用created钩子
  created () {
    // 页面加载完毕后自动获取用户信息
    // 因为在登陆成功后将token转成了字符串,这里要转成对象
    // console.log(window.sessionStorage.getItem('heima73'))
    const user = JSON.parse(window.sessionStorage.getItem('heima73'))
    this.name = user.name
    this.avatar = user.photo
  },
  methods: {
    ddd () {
      this.collapse = !this.collapse
    },
    logout () {
      // 这种方法只能将token设置为空不能删除
      // window.sessionStorage.setItem('heima73',null)
      window.sessionStorage.removeItem('heima73')
      this.$router.push('/login')
    },
    set () {
      this.$router.push('/set')
    }
  }
}
</script>

<style scoped lang='less'>
.home-container {
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .header {
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .right {
      float: right;
      line-height: 60px;
      height: 60px;
      img {
        height: 40px;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }
  .aside {
    background: #002033;
    .aside-top {
      background: #002840;
      height: 60px;
      width: 100%;
      box-sizing: border-box;
      background: url(../../assets/images/logo_admin.png) no-repeat center/140px
        auto;
    }
    .close {
      background: url(../../assets/images/logo_admin_01.png) no-repeat;
    }
  }
}
</style>
