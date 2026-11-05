# AGENTS.md — Expense Tracker

## Goal
Vue 3 + TypeScript + Vite app om persoonlijke uitgaven te beheren: CRUD, filteren op categorie, sorteren op datum/bedrag, samenvatting per categorie, persistent in localStorage.

## Data model
Expense: { id: string; title: string; amount: number; category: Category; date: string (ISO); note?: string }

## Component architectuur
- useExpenses composable (singleton): state, CRUD, filter/sort, persistence, composeert useExpenseStorage/useExpenseFilters/useExpenseSummary
- ExpenseForm.vue (create/edit), ExpenseList.vue, ExpenseItem.vue, ExpenseFilters.vue, SummaryDashboard.vue, App.vue

## TypeScript types
Category, SortField, SortOrder, Expense, ExpenseDraft, ExpenseFilter, ExpenseSort, ExpenseSummary, ExpenseFormErrors (src/types/expense.ts)

## Validatie
title verplicht (trimmed, 1-80 tekens); amount verplicht, >0 en eindig; category verplicht; date verplicht (ISO); note optioneel (max 200).

## Edge cases
Geen expenses → empty state; localStorage parse error → lege lijst + waarschuwing; negatieve/NaN bedragen geweigerd; unieke id via crypto.randomUUID(); sortering stabiel.

## Architecture
src/
├── types/expense.ts
├── utils/expenseValidation.ts
├── composables/
│   ├── useExpenseStorage.ts   (load/save + STORAGE_KEY + parse-warning)
│   ├── useExpenseFilters.ts   (filter/sort state + computed)
│   ├── useExpenseSummary.ts   (summary computed)
│   └── useExpenses.ts         (singleton state + CRUD + compositie)
└── components/
    ├── ExpenseForm.vue
    ├── ExpenseList.vue
    ├── ExpenseItem.vue
    ├── ExpenseFilters.vue
## Code conventies
Variabelenamen moeten leesbaar en beschrijvend zijn; enkel-letter namen (zoals `e`, `c`, `k`) zijn niet toegestaan. Gebruik volledige namen (bijv. `event`, `expense`, `category`, `key`).

    └── SummaryDashboard.vue
App.vue orchestrates all.

## UX regels
Submit disabled tot geldig; verwijderen met confirm; inline foutmeldingen; toon totaal + breakdown per categorie; responsive layout; scoped CSS.