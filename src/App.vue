<script setup>
import ToolCard from './components/ToolCard.vue'
import 'element-plus/dist/index.css'

const tools = [
  {
    title: '计算器',
    description: '简单的数学计算工具',
    icon: 'Calculator',
    route: '/calculator'
  },
  {
    title: '个税计算器',
    description: '计算个人所得税和税后收入',
    icon: 'Money',
    route: '/tax-calculator'
  },
  {
    title: '房贷计算器',
    description: '计算房贷月供和利息',
    icon: 'House',
    route: '/mortgage-calculator'
  }
]
</script>

<template>
  <div class="container">
    <h1>工具集合</h1>
    <div class="tools-grid">
      <ToolCard v-for="tool in tools" :key="tool.route" v-bind="tool" />
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.container h1 {
  text-align: center;
  color: #409eff;
  margin-bottom: 30px;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
