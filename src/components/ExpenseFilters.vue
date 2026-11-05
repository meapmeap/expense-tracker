<script setup lang="ts">
import type { ExpenseFilter, ExpenseSort, Category } from '../types/expense'

const props = defineProps<{ filter: ExpenseFilter; sort: ExpenseSort }>()
const emit = defineEmits<{
  'update:filter': [patch: Partial<ExpenseFilter>]
  'update:sort': [patch: Partial<ExpenseSort>]
}>()

const categories: (Category | 'All')[] = ['All', 'Food', 'Transport', 'Entertainment', 'Other']

function onCategory(event: Event): void {
  emit('update:filter', { category: (event.target as HTMLSelectElement).value as Category | 'All' })
}

function onSearch(event: Event): void {
  emit('update:filter', { search: (event.target as HTMLInputElement).value })
}

function onSortField(event: Event): void {
  emit('update:sort', { field: (event.target as HTMLSelectElement).value as ExpenseSort['field'] })
}

function toggleOrder(): void {
  emit('update:sort', { order: props.sort.order === 'asc' ? 'desc' : 'asc' })
}
</script>

<template>
  <div class="expense-filters">
    <select :value="filter.category" @change="onCategory">
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
    <input type="text" :value="filter.search" placeholder="Zoek titel/notitie" @input="onSearch" />
    <select :value="sort.field" @change="onSortField">
      <option value="date">Datum</option>
      <option value="amount">Bedrag</option>
    </select>
    <button type="button" @click="toggleOrder">{{ sort.order === 'asc' ? '↑' : '↓' }}</button>
  </div>
</template>

<style scoped>
.expense-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
</style>
