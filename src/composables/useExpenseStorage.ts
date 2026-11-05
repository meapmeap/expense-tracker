import type { Expense } from '../types/expense'


const STORAGE_KEY = 'expense-tracker-expenses'

export function loadExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Expense[]
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch (err) {
    console.warn('Failed to parse expenses from localStorage; starting with empty list.', err)
    return []
  }
}

export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
}

export { STORAGE_KEY }
