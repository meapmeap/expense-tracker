<script setup lang="ts">
import { ref, computed } from 'vue'
import ExpenseForm from './components/ExpenseForm.vue'
import ExpenseList from './components/ExpenseList.vue'
import ExpenseFilters from './components/ExpenseFilters.vue'
import SummaryDashboard from './components/SummaryDashboard.vue'
import { useExpenses } from './composables/useExpenses'
import type { ExpenseDraft } from './types/expense'

const {
  expenses,
  filter,
  sort,
  sortedExpenses,
  summary,
  addExpense,
  updateExpense,
  deleteExpense,
  setFilter,
  setSort,
} = useExpenses()

const editingId = ref<string | null>(null)

const editingDraft = computed<ExpenseDraft | null>(() => {
  if (!editingId.value) return null
  const found = expenses.find((expense) => expense.id === editingId.value)
  if (!found) return null
  const { id: _id, ...draft } = found
  return draft
})

function onSubmit(draft: ExpenseDraft): void {
  if (editingId.value) {
    if (updateExpense(editingId.value, draft)) editingId.value = null
  } else {
    addExpense(draft)
  }
}

function onEdit(id: string): void {
  editingId.value = id
}

function onCancel(): void {
  editingId.value = null
}

function onRemove(id: string): void {
  if (confirm('Weet je zeker dat je deze uitgave wilt verwijderen?')) {
    deleteExpense(id)
    if (editingId.value === id) editingId.value = null
  }
}
</script>

<template>
  <main class="app">
    <h1>Expense Tracker</h1>
    <SummaryDashboard :summary="summary" />
    <ExpenseForm :initial="editingDraft" @submit="onSubmit" @cancel="onCancel" />
    <ExpenseFilters :filter="filter" :sort="sort" @update:filter="setFilter" @update:sort="setSort" />
    <ExpenseList :expenses="sortedExpenses" @edit="onEdit" @remove="onRemove" />
  </main>
</template>

<style scoped>
.app { max-width: 720px; margin: 0 auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
</style>
