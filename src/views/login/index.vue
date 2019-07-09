<template>
  <div class="box">
    <el-card class="box-card">
        <img src="../../assets/images/logo_index.png" alt="">
      <!-- 表单组件 -->
      <el-form>
        <!-- 表单元素项1 -->
        <el-form-item>
          <!-- 表单元素 -->
          <el-input type="password"  autocomplete="off" style="width=100%"></el-input>
        </el-form-item>
        <!-- 表单元素项2 -->
        <el-form-item>
          <!-- 表单元素 -->
          <el-input type="password" autocomplete="off" style="width:320px"></el-input>
          <el-button type="primary" style="float:right;margin-right:5px">提交</el-button>
        </el-form-item>
        <!-- 表单元素项3 -->
        <el-form-item>
          <!-- 表单元素 -->
          <el-checkbox v-model="checked" ></el-checkbox>
          我已阅读并同意 <el-link type="primary" :underline="false">用户协议</el-link> 和 <el-link type="primary" :underline="false">隐私条款</el-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true
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
        margin:10px auto;
    }
  }
}
</style>
