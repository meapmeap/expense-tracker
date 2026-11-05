<script setup lang="ts">
import type { Expense } from '../types/expense'
import ExpenseItem from './ExpenseItem.vue'

defineProps<{ expenses: Expense[] }>()

const emit = defineEmits<{ edit: [id: string]; remove: [id: string] }>()
</script>

<template>
  <div class="expense-list">
    <p v-if="expenses.length === 0" class="empty">Nog geen uitgaven. Voeg er een toe.</p>
    <ExpenseItem
      v-for="expense in expenses"
      :key="expense.id"
      :expense="expense"
      @edit="emit('edit', $event)"
      @remove="emit('remove', $event)"
    />
  </div>
</template>

<style scoped>
.expense-list { display: flex; flex-direction: column; gap: 0.75rem; }
.empty { color: #666; font-style: italic; }
</style>