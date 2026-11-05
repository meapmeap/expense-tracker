import { reactive } from 'vue'
import type { Expense, ExpenseDraft, ExpenseFormErrors } from '../types/expense'
import { validateExpenseDraft } from '../utils/expenseValidation'
import { loadExpenses, saveExpenses } from './useExpenseStorage'
import { useExpenseFilters } from './useExpenseFilters'
import { useExpenseSummary } from './useExpenseSummary'

// Singleton state: gedeeld over alle callers (store-achtig gedrag zonder extra dependency).
const expenses = reactive<Expense[]>(loadExpenses())

const { filter, sort, filteredExpenses, sortedExpenses, setFilter, setSort } = useExpenseFilters(expenses)
const { summary } = useExpenseSummary(expenses)

function validate(draft: ExpenseDraft): ExpenseFormErrors {
  return validateExpenseDraft(draft)
}

function isValid(draft: ExpenseDraft): boolean {
  return Object.keys(validate(draft)).length === 0
}

function addExpense(draft: ExpenseDraft): boolean {
  if (Object.keys(validate(draft)).length > 0) return false
  expenses.push({ id: crypto.randomUUID(), ...draft, title: draft.title.trim() })
  persist()
  return true
}

function updateExpense(id: string, draft: ExpenseDraft): boolean {
  if (Object.keys(validate(draft)).length > 0) return false
  const idx = expenses.findIndex((expense) => expense.id === id)
  if (idx === -1) return false
  expenses[idx] = { id, ...draft, title: draft.title.trim() }
  persist()
  return true
}

function deleteExpense(id: string): void {
  const idx = expenses.findIndex((expense) => expense.id === id)
  if (idx !== -1) {
    expenses.splice(idx, 1)
    persist()
  }
}

function persist(): void {
  saveExpenses([...expenses])
}

export function useExpenses() {
  return {
    expenses,
    filter,
    sort,
    filteredExpenses,
    sortedExpenses,
    summary,
    validate,
    isValid,
    addExpense,
    updateExpense,
    deleteExpense,
    setFilter,
    setSort,
  }
}
