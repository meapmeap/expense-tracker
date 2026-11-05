<script setup lang="ts">
import type { Expense } from '../types/expense'

const props = defineProps<{ expense: Expense }>()
const emit = defineEmits<{ edit: [id: string]; remove: [id: string] }>()

const money = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' })
const dateFmt = new Intl.DateTimeFormat('nl-NL', { dateStyle: 'medium' })

function formatAmount(value: number): string {
  return money.format(value)
}

function formatDate(value: string): string {
  return dateFmt.format(new Date(value))
}
</script>

<template>
  <div class="expense-item">
    <div class="header">
      <h3 class="title">{{ expense.title }}</h3>
      <span class="amount">{{ formatAmount(expense.amount) }}</span>
    </div>
    <div class="meta">
      <span class="badge">{{ expense.category }}</span>
      <span class="date">{{ formatDate(expense.date) }}</span>
    </div>
    <p v-if="expense.note" class="note">{{ expense.note }}</p>
    <div class="actions">
      <button type="button" @click="emit('edit', expense.id)">Bewerken</button>
      <button type="button" class="danger" @click="emit('remove', expense.id)">Verwijderen</button>
    </div>
  </div>
</template>

<style scoped>
.expense-item { border: 1px solid #ddd; border-radius: 0.5rem; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
.header { display: flex; justify-content: space-between; align-items: center; }
.title { margin: 0; font-size: 1.1rem; }
.amount { font-weight: bold; }
.meta { display: flex; gap: 0.75rem; font-size: 0.85rem; color: #555; }
.badge { background: #eee; padding: 0.1rem 0.5rem; border-radius: 0.25rem; }
.note { margin: 0; color: #444; }
.actions { display: flex; gap: 0.5rem; }
.danger { color: #c00; }
</style>