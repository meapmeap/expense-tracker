<script setup lang="ts">
import type { ExpenseSummary } from '../types/expense'

const props = defineProps<{ summary: ExpenseSummary }>()

const money = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })

function formatAmount(value: number): string {
  return money.format(value)
}

function percentage(value: number): string {
  if (props.summary.total === 0) return '0%'
  return `${Math.round((value / props.summary.total) * 100)}%`
}

const categories: (keyof ExpenseSummary['byCategory'])[] = ['Food', 'Transport', 'Entertainment', 'Other']
</script>

<template>
  <div class="summary-dashboard">
    <h2>Totaal: {{ formatAmount(summary.total) }}</h2>
    <div v-if="summary.total === 0" class="empty">Geen uitgaven.</div>
    <ul v-else>
      <li v-for="category in categories" :key="category">
        <span>{{ category }}</span>
        <span>{{ formatAmount(summary.byCategory[category]) }} ({{ percentage(summary.byCategory[category]) }})</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.summary-dashboard { border: 1px solid #ddd; border-radius: 0.5rem; padding: 1rem; }
ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
li { display: flex; justify-content: space-between; }
.empty { color: #666; font-style: italic; }
</style>