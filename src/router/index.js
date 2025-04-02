import { createRouter, createWebHistory } from 'vue-router';
import Calculator from '../components/Calculator.vue';
import TaxCalculator from '../components/TaxCalculator.vue';
import MortgageCalculator from '../components/MortgageCalculator.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/calculator',
      name: 'calculator',
      component: Calculator,
    },
    {
      path: '/tax-calculator',
      name: 'tax-calculator',
      component: TaxCalculator,
    },
    {
      path: '/mortgage-calculator',
      name: 'mortgage-calculator',
      component: MortgageCalculator,
    },
  ],
});

export default router;
