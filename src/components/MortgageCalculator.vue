<script setup>
import { ref, computed } from 'vue'
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElRadioGroup, ElRadio, ElButton, ElMessage } from 'element-plus'

const loanType = ref('commercial')
const loanAmount = ref('')
const loanTerm = ref('30')
const commercialRate = ref('4.35')
const providentRate = ref('3.25')
const commercialAmount = ref('')
const providentAmount = ref('')

const monthlyPayment = ref(0)
const totalPayment = ref(0)
const totalInterest = ref(0)

const termOptions = [
  { value: '5', label: '5年' },
  { value: '10', label: '10年' },
  { value: '15', label: '15年' },
  { value: '20', label: '20年' },
  { value: '25', label: '25年' },
  { value: '30', label: '30年' }
]

const validateAmount = (amount) => {
  if (!amount) return false
  const num = Number(amount)
  return !isNaN(num) && num > 0
}

const validateRate = (rate) => {
  if (!rate) return false
  const num = Number(rate)
  return !isNaN(num) && num > 0 && num < 100
}

const calculateMonthlyPayment = (principal, rate, years) => {
  const monthlyRate = rate / 100 / 12
  const numberOfPayments = years * 12
  return principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
}

const calculate = () => {
  let monthly = 0
  let total = 0

  if (loanType.value === 'commercial') {
    if (!validateAmount(loanAmount.value)) {
      ElMessage.error('请输入有效的贷款金额')
      return
    }
    if (!validateRate(commercialRate.value)) {
      ElMessage.error('请输入有效的商业贷款利率')
      return
    }
    monthly = calculateMonthlyPayment(Number(loanAmount.value) * 10000, Number(commercialRate.value), Number(loanTerm.value))
  } else if (loanType.value === 'provident') {
    if (!validateAmount(loanAmount.value)) {
      ElMessage.error('请输入有效的贷款金额')
      return
    }
    if (!validateRate(providentRate.value)) {
      ElMessage.error('请输入有效的公积金贷款利率')
      return
    }
    monthly = calculateMonthlyPayment(Number(loanAmount.value) * 10000, Number(providentRate.value), Number(loanTerm.value))
  } else {
    if (!validateAmount(commercialAmount.value)) {
      ElMessage.error('请输入有效的商业贷款金额')
      return
    }
    if (!validateAmount(providentAmount.value)) {
      ElMessage.error('请输入有效的公积金贷款金额')
      return
    }
    if (!validateRate(commercialRate.value)) {
      ElMessage.error('请输入有效的商业贷款利率')
      return
    }
    if (!validateRate(providentRate.value)) {
      ElMessage.error('请输入有效的公积金贷款利率')
      return
    }
    const commercialMonthly = calculateMonthlyPayment(Number(commercialAmount.value) * 10000, Number(commercialRate.value), Number(loanTerm.value))
    const providentMonthly = calculateMonthlyPayment(Number(providentAmount.value) * 10000, Number(providentRate.value), Number(loanTerm.value))
    monthly = commercialMonthly + providentMonthly
  }

  monthlyPayment.value = monthly.toFixed(2)
  total = monthly * Number(loanTerm.value) * 12
  totalPayment.value = total.toFixed(2)

  const principal = loanType.value === 'mixed'
    ? (Number(commercialAmount.value) + Number(providentAmount.value)) * 10000
    : Number(loanAmount.value) * 10000
  totalInterest.value = (total - principal).toFixed(2)
}
</script>

<template>
  <div class="calculator-container">
    <h2>房贷计算器</h2>
    <el-form label-width="120px" class="calculator-form">
      <el-form-item label="贷款类型" class="loan-type-item">
        <el-radio-group v-model="loanType" class="loan-type-group">
          <el-radio label="commercial">商业贷款</el-radio>
          <el-radio label="provident">公积金贷款</el-radio>
          <el-radio label="mixed">组合贷款</el-radio>
        </el-radio-group>
      </el-form-item>

      <template v-if="loanType !== 'mixed'">
        <el-form-item label="贷款金额" class="form-item">
          <el-input v-model="loanAmount" type="number" placeholder="请输入贷款金额" class="input-with-unit">
            <template #append>万元</template>
          </el-input>
        </el-form-item>
      </template>

      <template v-else>
        <el-form-item label="商业贷款金额" class="form-item">
          <el-input v-model="commercialAmount" type="number" placeholder="请输入商业贷款金额" class="input-with-unit">
            <template #append>万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="公积金贷款金额" class="form-item">
          <el-input v-model="providentAmount" type="number" placeholder="请输入公积金贷款金额" class="input-with-unit">
            <template #append>万元</template>
          </el-input>
        </el-form-item>
      </template>

      <el-form-item label="贷款年限" class="form-item">
        <el-select v-model="loanTerm" class="term-select">
          <el-option v-for="option in termOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </el-form-item>

      <template v-if="loanType !== 'provident'">
        <el-form-item label="商业贷款利率" class="form-item">
          <el-input v-model="commercialRate" type="number" placeholder="请输入商业贷款利率" class="input-with-unit">
            <template #append>%</template>
          </el-input>
        </el-form-item>
      </template>

      <template v-if="loanType !== 'commercial'">
        <el-form-item label="公积金贷款利率" class="form-item">
          <el-input v-model="providentRate" type="number" placeholder="请输入公积金贷款利率" class="input-with-unit">
            <template #append>%</template>
          </el-input>
        </el-form-item>
      </template>

      <el-form-item class="button-item">
        <el-button type="primary" @click="calculate" class="calculate-button">计算</el-button>
      </el-form-item>

      <div class="result" v-if="monthlyPayment > 0">
        <div class="result-item">
          <span class="label">每月还款</span>
          <span class="value">¥{{ monthlyPayment }}</span>
        </div>
        <div class="result-item">
          <span class="label">还款总额</span>
          <span class="value">¥{{ totalPayment }}</span>
        </div>
        <div class="result-item">
          <span class="label">支付利息</span>
          <span class="value">¥{{ totalInterest }}</span>
        </div>
      </div>
    </el-form>
  </div>
</template>

<style scoped>
.calculator-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #409eff;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
}

.calculator-form {
  padding: 0 20px;
}

.loan-type-item {
  margin-bottom: 25px;
}

.loan-type-group {
  display: flex;
  gap: 20px;
}

.form-item {
  margin-bottom: 20px;
}

.input-with-unit {
  width: 100%;
}

.term-select {
  width: 100%;
}

.button-item {
  margin-top: 30px;
  text-align: center;
}

.calculate-button {
  width: 180px;
  height: 40px;
  font-size: 16px;
}

.result {
  margin-top: 30px;
  padding: 25px;
  background-color: #f5f7fa;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px 15px;
  background-color: #ffffff;
  border-radius: 6px;
}

.result-item:last-child {
  margin-bottom: 0;
}

.result-item .label {
  color: #606266;
  font-size: 16px;
}

.result-item .value {
  color: #409eff;
  font-size: 18px;
  font-weight: 600;
}

@media screen and (max-width: 768px) {
  .calculator-container {
    margin: 10px;
    padding: 15px;
  }

  .calculator-form {
    padding: 0 10px;
  }

  .loan-type-group {
    flex-direction: column;
    gap: 10px;
  }

  .calculate-button {
    width: 100%;
  }

  .result {
    padding: 15px;
  }

  .result-item {
    padding: 8px 12px;
  }

  .result-item .label {
    font-size: 14px;
  }

  .result-item .value {
    font-size: 16px;
  }
}
</style>