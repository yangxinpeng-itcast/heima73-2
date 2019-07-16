<template>
    <div class="box">
        <button @click="toParent()">给父组件传值</button>
    </div>
</template>

<script>
export default {
  name: 'my-son',
  data () {
    return {
      text: 123
    }
  },
  methods: {
    toParent () {
      this.$emit('input', this.text)
    }
  }
}
</script>

<style>

</style>
