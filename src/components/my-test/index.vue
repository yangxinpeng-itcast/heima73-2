<template>
  <div class="box">
    <p>头部</p>
    <!-- 后备内容 -->
    <p class="content">
      <slot name="con" :test="testName"></slot>
    </p>
    <p>底部<slot name="fot "></slot></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testName: ['哈哈哈', '啦啦啦']
    }
  }
}
</script>

<style>
</style>
