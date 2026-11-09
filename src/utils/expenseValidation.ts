import type { ExpenseDraft, ExpenseFormErrors } from '../types/expense'

export function validateExpenseDraft(draft: ExpenseDraft): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {}
  const trimmedTitle = draft.title.trim()
  if (!trimmedTitle) errors.title = 'Titel is verplicht'
  else if (trimmedTitle.length > 80) errors.title = 'Max 80 tekens'
  if (!Number.isFinite(draft.amount) || draft.amount <= 0) errors.amount = 'Bedrag moet > 0 zijn'
  if (!draft.category) errors.category = 'Categorie is verplicht'
  if (!draft.date) errors.date = 'Datum is verplicht'
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(draft.date) || Number.isNaN(Date.parse(draft.date))) errors.date = 'Datum moet een geldige ISO-datum zijn'
  if (draft.note && draft.note.length > 200) errors.note = 'Max 200 tekens'
  return errors
}