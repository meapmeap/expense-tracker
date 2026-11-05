# tasks.md — Expense Tracker

## Fase 1 - Types & State

### Taak 1.1 - Definieer expense types [x]
- **Bestand:** `src/types/expense.ts`
- **Werk:** Category, SortField, SortOrder, Expense, ExpenseDraft, ExpenseFilter, ExpenseSort, ExpenseSummary, ExpenseFormErrors.
- **Finish-state:** Compileert zonder errors; geen `any`.

### Taak 1.2 - Implementeer useExpenses composable [x]
- **Bestand:** `src/composables/useExpenses.ts`
- **Werk:** Reactive state, CRUD, filtering, sorting, summary, localStorage persistence + load.
- **Finish-state:** Importeerbaar; typed; persist/restore werkt.

## Fase 2 - Componenten

### Taak 2.1 - ExpenseForm [x]
- **Bestand:** `src/components/ExpenseForm.vue`
- **Werk:** Formulier create/edit met validatie; emit submit met ExpenseDraft.
- **Finish-state:** Validatie werkt; disabled tot geldig.

### Taak 2.2 - ExpenseItem [x]
- **Bestand:** `src/components/ExpenseItem.vue`
- **Werk:** Card met details; emit edit/delete.
- **Finish-state:** Events werken; scoped CSS.

### Taak 2.3 - ExpenseList [x]
- **Bestand:** `src/components/ExpenseList.vue`
- **Werk:** Lijst van ExpenseItem; empty state.
- **Finish-state:** Rendert lijst/empty state.

### Taak 2.4 - ExpenseFilters [x]
- **Bestand:** `src/components/ExpenseFilters.vue`
- **Werk:** Categorie filter + sort controls; emit changes.
- **Finish-state:** Events bubbelen.

### Taak 2.5 - SummaryDashboard [x]
- **Bestand:** `src/components/SummaryDashboard.vue`
- **Werk:** Totaal + breakdown per categorie.
- **Finish-state:** Correcte berekeningen.

## Fase 3 - Integratie

### Taak 3.1 - App.vue [x]
- **Bestand:** `src/App.vue`
- **Werk:** Orkestreert componenten; koppelt events aan useExpenses.
- **Finish-state:** Volledige app speelbaar.

## Fase 4 - Kwaliteit

### Taak 4.1 - Type-check & build [x]
- **Werk:** `npm run build`; geen `any`.
- **Finish-state:** Build slaagt.

### Taak 4.2 - Cleanup & docs [x]
- **Werk:** Verwijder HelloWorld.vue; controleer imports; update README.
- **Finish-state:** Project clean.