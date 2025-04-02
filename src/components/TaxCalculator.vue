<script setup>
import { ref, computed } from 'vue'

const monthlyIncome = ref('')
const socialInsurance = ref('')
const housingFund = ref('')
const childrenEducation = ref(0)
const continuingEducation = ref(0)
const housingLoan = ref(0)
const housingRent = ref(0)
const elderlySupport = ref(0)
const medicalExpenses = ref(0)

// 计算应纳税所得额
const taxableIncome = computed(() => {
  const income = parseFloat(monthlyIncome.value) || 0
  const insurance = parseFloat(socialInsurance.value) || 0
  const fund = parseFloat(housingFund.value) || 0
  const specialDeductions = childrenEducation.value + continuingEducation.value +
    housingLoan.value + housingRent.value + elderlySupport.value + medicalExpenses.value
  
  return Math.max(income - insurance - fund - 5000 - specialDeductions, 0)
})

// 计算个人所得税
const taxAmount = computed(() => {
  const income = taxableIncome.value
  let tax = 0
  
  if (income <= 3000) {
    tax = income * 0.03
  } else if (income <= 12000) {
    tax = income * 0.1 - 210
  } else if (income <= 25000) {
    tax = income * 0.2 - 1410
  } else if (income <= 35000) {
    tax = income * 0.25 - 2660
  } else if (income <= 55000) {
    tax = income * 0.3 - 4410
  } else if (income <= 80000) {
    tax = income * 0.35 - 7160
  } else {
    tax = income * 0.45 - 15160
  }
  
  return Math.max(tax, 0).toFixed(2)
})

// 计算税后收入
const afterTaxIncome = computed(() => {
  const income = parseFloat(monthlyIncome.value) || 0
  const insurance = parseFloat(socialInsurance.value) || 0
  const fund = parseFloat(housingFund.value) || 0
  const tax = parseFloat(taxAmount.value)
  
  return (income - insurance - fund - tax).toFixed(2)
})

// 重置表单
const resetForm = () => {
  monthlyIncome.value = ''
  socialInsurance.value = ''
  housingFund.value = ''
  childrenEducation.value = 0
  continuingEducation.value = 0
  housingLoan.value = 0
  housingRent.value = 0
  elderlySupport.value = 0
  medicalExpenses.value = 0
}
</script>

<template>
  <div class="tax-calculator">
    <h2>个人所得税计算器</h2>
    
    <div class="calculator-form">
      <div class="form-group">
        <h3>基本信息</h3>
        <el-form label-position="right" label-width="140px">
          <el-form-item label="月收入">
            <el-input v-model="monthlyIncome" type="number" placeholder="请输入税前月收入"></el-input>
          </el-form-item>
          <el-form-item label="社保缴纳">
            <el-input v-model="socialInsurance" type="number" placeholder="请输入每月社保缴纳金额"></el-input>
          </el-form-item>
          <el-form-item label="公积金缴纳">
            <el-input v-model="housingFund" type="number" placeholder="请输入每月公积金缴纳金额"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="form-group">
        <h3>专项附加扣除</h3>
        <el-form label-position="right" label-width="140px">
          <el-form-item label="子女教育">
            <el-input-number v-model="childrenEducation" :min="0" :max="1000" :step="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="继续教育">
            <el-input-number v-model="continuingEducation" :min="0" :max="400" :step="400"></el-input-number>
          </el-form-item>
          <el-form-item label="住房贷款利息">
            <el-input-number v-model="housingLoan" :min="0" :max="1000" :step="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="住房租金">
            <el-input-number v-model="housingRent" :min="0" :max="1500" :step="1500"></el-input-number>
          </el-form-item>
          <el-form-item label="赡养老人">
            <el-input-number v-model="elderlySupport" :min="0" :max="2000" :step="2000"></el-input-number>
          </el-form-item>
          <el-form-item label="大病医疗">
            <el-input-number v-model="medicalExpenses" :min="0" :step="1000"></el-input-number>
          </el-form-item>
        </el-form>
      </div>

      <div class="calculation-result">
        <h3>计算结果</h3>
        <div class="result-item">
          <span>应纳税所得额：</span>
          <span class="amount">¥{{ taxableIncome.toFixed(2) }}</span>
        </div>
        <div class="result-item">
          <span>应缴个人所得税：</span>
          <span class="amount">¥{{ taxAmount }}</span>
        </div>
        <div class="result-item">
          <span>税后收入：</span>
          <span class="amount">¥{{ afterTaxIncome }}</span>
        </div>
      </div>

      <div class="form-actions">
        <el-button type="primary" @click="resetForm">重置</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tax-calculator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tax-calculator h2 {
  text-align: center;
  color: #303133;
  margin-bottom: 30px;
}

.calculator-form {
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #dcdfe6;
}

.form-group {
  margin-bottom: 30px;
}

.form-group h3 {
  color: #409eff;
  margin-bottom: 20px;
  font-size: 18px;
}

.calculation-result {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 16px;
}

.amount {
  color: #409eff;
  font-weight: bold;
}

.form-actions {
  text-align: center;
  margin-top: 20px;
}
</style>