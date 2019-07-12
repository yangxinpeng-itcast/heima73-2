<template>
    <div ckass="main">

    </div>
</template>

<script>
export default {
  created () {
    this.$axios.get('/articles').then(res => {
      console.log(res)
    })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style>
    .main {
        /* cover:铺满整屏 */
        background: url(../../assets/images/welcome.jpg) no-repeat center/500px auto;
    }
</style>
