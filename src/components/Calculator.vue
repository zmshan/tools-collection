<script setup>
import { ref } from 'vue'

const display = ref('0')
const previousValue = ref(null)
const currentOperator = ref(null)
const newNumber = ref(true)

const appendNumber = (number) => {
  if (newNumber.value) {
    display.value = String(number)
    newNumber.value = false
  } else {
    display.value = display.value === '0' ? String(number) : display.value + number
  }
}

const setOperator = (operator) => {
  if (currentOperator.value && !newNumber.value) {
    calculate()
  }
  previousValue.value = parseFloat(display.value)
  currentOperator.value = operator
  newNumber.value = true
}

const calculate = () => {
  if (previousValue.value === null || newNumber.value) return

  const current = parseFloat(display.value)
  let result = 0

  switch (currentOperator.value) {
    case '+':
      result = previousValue.value + current
      break
    case '-':
      result = previousValue.value - current
      break
    case '*':
      result = previousValue.value * current
      break
    case '/':
      result = previousValue.value / current
      break
  }

  display.value = String(result)
  previousValue.value = null
  currentOperator.value = null
  newNumber.value = true
}

const clear = () => {
  display.value = '0'
  previousValue.value = null
  currentOperator.value = null
  newNumber.value = true
}
</script>

<template>
  <div class="calculator">
    <h2>基础计算器</h2>
    <div class="calculator-display">
      {{ display }}
    </div>
    <div class="calculator-buttons">
      <el-button @click="clear">C</el-button>
      <el-button @click="() => appendNumber(7)">7</el-button>
      <el-button @click="() => appendNumber(8)">8</el-button>
      <el-button @click="() => appendNumber(9)">9</el-button>
      <el-button type="warning" @click="() => setOperator('/')">÷</el-button>
      <el-button @click="() => appendNumber(4)">4</el-button>
      <el-button @click="() => appendNumber(5)">5</el-button>
      <el-button @click="() => appendNumber(6)">6</el-button>
      <el-button type="warning" @click="() => setOperator('*')">×</el-button>
      <el-button @click="() => appendNumber(1)">1</el-button>
      <el-button @click="() => appendNumber(2)">2</el-button>
      <el-button @click="() => appendNumber(3)">3</el-button>
      <el-button type="warning" @click="() => setOperator('-')">-</el-button>
      <el-button @click="() => appendNumber(0)">0</el-button>
      <el-button @click="() => appendNumber('.')">.</el-button>
      <el-button type="primary" @click="calculate">=</el-button>
      <el-button type="warning" @click="() => setOperator('+')">+</el-button>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  background-color: #f5f7fa;
}

.calculator h2 {
  text-align: center;
  color: #303133;
  margin-bottom: 20px;
}

.calculator-display {
  background-color: white;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  text-align: right;
  font-size: 24px;
  min-height: 40px;
  color: #303133;
}

.calculator-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.calculator-buttons .el-button {
  height: 40px;
  font-size: 18px;
}
</style>