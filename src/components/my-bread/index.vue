<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
        <!-- 挖个坑 -->
        <slot></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
// 本组件为面包屑组件封装
export default {
  // 定义组件时把名字约定好了，将来在index插件下直接
  // 用Mybread.name当作组件名字就可以了

  // 此处name 是组件选项
  name: 'my-bread'
}
</script>

<style>
</style>
