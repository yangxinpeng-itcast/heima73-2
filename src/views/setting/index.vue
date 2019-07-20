<template>
  <el-card>
    <div slot="header">
      <my-bread>个人设置</my-bread>
    </div>
    <el-col :span="12">
      <el-form :model="userForm" label-width="100px">
        <el-form-item label="编号:">{{userForm.id}}</el-form-item>
        <el-form-item label="手机:">{{userForm.mobile}}</el-form-item>
        <el-form-item label="媒体名称:">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="媒体介绍:">
          <el-input type="textarea" v-model="userForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUser">保存设置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12" style="text-align:center">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
        :show-file-list="false"
        :http-request="upload"
      >
        <img v-if="userForm.photo" :src="userForm.photo" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p>修改头像</p>
    </el-col>
  </el-card>
</template>

<script>
import eventBus from '@/views/eventBus'
export default {
  data () {
    return {
      userForm: {
        id: null,
        mobile: null,
        email: null,
        photo: null,
        intro: null,
        name: null
      },
      imageUrl: null
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    upload (data) {
      // console.log(data) data.file是后台要的图片数据
      const formData = new FormData()
      formData.append('photo', data.file)
      this.$axios.patch('user/photo', formData).then(res => {
        this.userForm.photo = res.data.data.photo
        eventBus.$emit('updateHeaderPhoto', res.data.data.photo)
        const localUser = JSON.parse(window.sessionStorage.getItem('heima73'))
        localUser.photo = res.data.data.photo
        window.sessionStorage.setItem('heima73', JSON.stringify(localUser))
      })
    },
    async updateUser () {
      const {
        data: { data }
      } = await this.$axios.patch('user/profile', {
        name: this.userForm.name,
        intro: this.userForm.intro,
        email: this.userForm.email
      })
      this.$message.success('用户信息修改成功')
      // 更新用户信息后将用户名显示到home组件的头部
      // 此时setting组件和home组件不是父子关系,所以只能用非父子传值的方式
      eventBus.$emit('updateHeaderName', data.name)
      // 将修改的头部信息存入sessionStorage中
      const localUser = JSON.parse(
        window.sessionStorage.getItem('heima73')
      )
      localUser.name = data.name
      window.sessionStorage.setItem('heima73', JSON.stringify(localUser))
    },
    async getUser () {
      const {
        data: { data }
      } = await this.$axios.get('user/profile')
      this.userForm = data
    }
  }
}
</script>

<style>
</style>
