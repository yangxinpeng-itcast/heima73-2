<template>
  <el-card>
    <div slot="header">
      <my-bread>粉丝管理</my-bread>
    </div>
    <div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <div ref="bar" style="width:600px; height:400px"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'second'
    }
  },
  mounted () {
    const dom = this.$refs.bar
    const myEcharts = echarts.init(dom)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEcharts.setOption(option)
  },
  methods: {}
}
</script>

<style>
</style>
