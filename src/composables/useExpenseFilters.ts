import { reactive, computed } from 'vue'
import type { Expense, ExpenseFilter, ExpenseSort } from '../types/expense'

export function useExpenseFilters(expenses: Expense[]) {
  const filter = reactive<ExpenseFilter>({ category: 'All', search: '' })
  const sort = reactive<ExpenseSort>({ field: 'date', order: 'desc' })

  const filteredExpenses = computed<Expense[]>(() => {
    const term = (filter.search ?? '').toLowerCase().trim()
    return expenses.filter((expense) => {
      if (filter.category !== 'All' && expense.category !== filter.category) return false
      if (term && !expense.title.toLowerCase().includes(term) && !(expense.note ?? '').toLowerCase().includes(term)) return false
      return true
    })
  })

  const sortedExpenses = computed<Expense[]>(() => {
    const list = [...filteredExpenses.value]
    list.sort((a, b) => {
      let cmp = 0
      if (sort.field === 'date') cmp = a.date.localeCompare(b.date)
      else cmp = a.amount - b.amount
      if (cmp === 0) cmp = a.id.localeCompare(b.id) // stabiele tie-break
      return sort.order === 'asc' ? cmp : -cmp
    })
    return list
  })

  function setFilter(patch: Partial<ExpenseFilter>): void {
    Object.assign(filter, patch)
  }

  function setSort(patch: Partial<ExpenseSort>): void {
    Object.assign(sort, patch)
  }

  return { filter, sort, filteredExpenses, sortedExpenses, setFilter, setSort }
}
