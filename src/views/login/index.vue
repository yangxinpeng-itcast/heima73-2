<template>
  <div class="box">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <!-- 表单组件 -->
      <el-form ref="loginForm" :rules="rules" :model="loginForm" status-icon>
        <!-- 表单元素项1 -->
        <el-form-item prop="mobile">
          <!-- 表单元素 -->
          <el-input type="txt" autocomplete="off" v-model="loginForm.mobile" style="width=100%"></el-input>
        </el-form-item>
        <!-- 表单元素项2 -->
        <el-form-item prop="code">
          <!-- 表单元素 -->
          <el-input v-model="loginForm.code" style="width:320px" placeholder="请输入验证码"></el-input>
          <el-button style="float:right;margin-right:5px">验证码</el-button>
        </el-form-item>
        <!-- 表单元素项3 -->
        <el-form-item>
          <!-- 表单元素 -->
          <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
          <el-link type="primary" :underline="false">用户协议</el-link>和
          <el-link type="primary" :underline="false">隐私条款</el-link>
          <el-button type="primary" class="dl" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    // 用来校验手机号
    // rule:校验对象  value:参数  callback:返回值
    const checkMobile = (rule, value, callback) => {
      // 校验逻辑 value为输入框里的内容
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      checked: true,
      rules: {
        mobile: [
          { required: true, message: '手机号必填', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '必须输入验证码', trigger: 'blur' },
          { len: 6, message: '必须是六位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      // this.$refs[loginform]找到定义了ref=login的组件
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$axios
            .post(
              // 这里是默认路径后面拼接的地址
              'authorizations',
              this.loginForm
            )
            .then(res => {
              // res 是响应对象  包含响应数据
              const data = res.data
              // 后台的返回的json内容  已经转换成了对象
              console.log(data)
              // 保存token
              window.sessionStorage.setItem(
                'heima73',
                JSON.stringify(res.data.data)
              )

              // 登录成功后：做什么事情？
              // 1. 跳转到首页
              // 2. 保存登录状态
              this.$router.push('/')
            })
            .catch(() => {
              // 提示错误  使用组件  消息提示组件
              this.$message.error('用户名或密码错误')
            })
        }
      })
    }
  }
}
</script>

<style  scoped lang='less'>
.box {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .box-card {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 450px;
    height: 350px;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 200px;
      margin: 10px auto;
    }
    .dl {
      display: block;
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
