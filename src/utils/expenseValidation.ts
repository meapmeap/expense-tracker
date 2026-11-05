import type { ExpenseDraft, ExpenseFormErrors } from '../types/expense'

export function validateExpenseDraft(draft: ExpenseDraft): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {}
  if (!draft.title.trim()) errors.title = 'Titel is verplicht'
  else if (draft.title.trim().length > 80) errors.title = 'Max 80 tekens'
  if (!Number.isFinite(draft.amount) || draft.amount <= 0) errors.amount = 'Bedrag moet > 0 zijn'
  if (!draft.category) errors.category = 'Categorie is verplicht'
  if (!draft.date) errors.date = 'Datum is verplicht'
  if (draft.note && draft.note.length > 200) errors.note = 'Max 200 tekens'
  return errors
}