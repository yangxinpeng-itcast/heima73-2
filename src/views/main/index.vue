<template>
  <div class='container'>
    <img src="../../assets/images/welcome.jpg" alt="">
  </div>
</template>

<script>
export default {
  created () {
    this.$axios.get('articles').then(res => console.log(res.data))
  }
}
</script>

<style scoped lang='less'>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto ;
    }
  }

</style>
