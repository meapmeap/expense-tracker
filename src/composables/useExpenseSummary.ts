import { computed } from 'vue'
import type { Expense, ExpenseSummary, Category } from '../types/expense'

const CATEGORIES: Category[] = ['Food', 'Transport', 'Entertainment', 'Other']

export function useExpenseSummary(expenses: Expense[]) {
  const summary = computed<ExpenseSummary>(() => {
    const byCategory = {} as Record<Category, number>
    CATEGORIES.forEach((category) => (byCategory[category] = 0))
    let total = 0
    expenses.forEach((expense) => {
      total += expense.amount
      byCategory[expense.category] += expense.amount
    })
    return { total, byCategory }
  })

  return { summary }
}
