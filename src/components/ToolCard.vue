<template>
  <div class="tool-card" @click="navigateToTool">
    <el-card :body-style="{ padding: '20px' }">
      <div class="tool-icon">
        <el-icon :size="40">
          <component :is="icon" />
        </el-icon>
      </div>
      <div class="tool-info">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
});

const router = useRouter();

const navigateToTool = () => {
  console.log(props.route);

  router.push(props.route);
};
</script>

<style scoped>
.tool-card {
  cursor: pointer;
  transition: transform 0.3s;
}

.tool-card:hover {
  transform: translateY(-5px);
}

.tool-icon {
  text-align: center;
  margin-bottom: 16px;
  color: #409eff;
}

.tool-info {
  text-align: center;
}

.tool-info h3 {
  margin: 0 0 8px;
  color: #303133;
}

.tool-info p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}
</style>