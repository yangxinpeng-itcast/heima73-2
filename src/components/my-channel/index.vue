<template>
    <!-- 此处的value属性接收父组件传值 -->
    <!-- 这里的:value相当于v-model基础语法中的 :value  还有一个是@input -->
    <!-- @change属于子传父步骤 -->
  <el-select placeholder="所有频道" :value="value" @change="fn">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getDate()
  },
  methods: {
    fn (value) {
      this.$emit('input', value)
    },
    async getDate () {
      const { data: { data } } = await this.$axios.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style>
</style>
