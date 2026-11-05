export type Category = 'Food' | 'Transport' | 'Entertainment' | 'Other'

export type SortField = 'date' | 'amount'

export type SortOrder = 'asc' | 'desc'

export interface Expense {
  id: string
  title: string
  amount: number
  category: Category
  date: string
  note?: string
}

export type ExpenseDraft = Omit<Expense, 'id'>

export interface ExpenseFilter {
  category: Category | 'All'
  search?: string
}

export interface ExpenseSort {
  field: SortField
  order: SortOrder
}

export interface ExpenseSummary {
  total: number
  byCategory: Record<Category, number>
}

export type ExpenseFormErrors = Partial<Record<keyof ExpenseDraft, string>>