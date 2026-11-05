<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import type { ExpenseDraft, ExpenseFormErrors, Category } from '../types/expense'
import { validateExpenseDraft } from '../utils/expenseValidation'

const props = defineProps<{
  initial?: ExpenseDraft | null
  submitting?: boolean
}>()

const emit = defineEmits<{ submit: [draft: ExpenseDraft]; cancel: [] }>()

const categories: Category[] = ['Food', 'Transport', 'Entertainment', 'Other']

function emptyDraft(): ExpenseDraft {
  return { title: '', amount: 0, category: 'Food', date: new Date().toISOString().slice(0, 10), note: '' }
}

const form = reactive<ExpenseDraft>(props.initial ? { ...props.initial } : emptyDraft())
const errors = reactive<ExpenseFormErrors>({})

watch(
  () => props.initial,
  (val) => {
    Object.assign(form, val ? { ...val } : emptyDraft())
    Object.keys(errors).forEach((key) => delete errors[key as keyof ExpenseFormErrors])
  },
)

function validate(): boolean {
  Object.keys(errors).forEach((key) => delete errors[key as keyof ExpenseFormErrors])
    const result = validateExpenseDraft(form)
    Object.assign(errors, result)
    return Object.keys(errors).length === 0
}

const isValid = computed<boolean>(() => {
  return !!form.title.trim() && Number.isFinite(form.amount) && form.amount > 0 && !!form.category && !!form.date
})

function onSubmit(): void {
  if (!validate()) return
  emit('submit', { ...form, title: form.title.trim() })
  if (!props.initial) {
    Object.assign(form, emptyDraft())
  }
}
</script>

<template>
  <form class="expense-form" @submit.prevent="onSubmit">
    <div class="field">
      <label for="title">Titel</label>
      <input id="title" v-model="form.title" type="text" />
      <span v-if="errors.title" class="error">{{ errors.title }}</span>
    </div>
    <div class="field">
      <label for="amount">Bedrag</label>
      <input id="amount" v-model.number="form.amount" type="number" step="0.01" />
      <span v-if="errors.amount" class="error">{{ errors.amount }}</span>
    </div>
    <div class="field">
      <label for="category">Categorie</label>
      <select id="category" v-model="form.category">
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
      <span v-if="errors.category" class="error">{{ errors.category }}</span>
    </div>
    <div class="field">
      <label for="date">Datum</label>
      <input id="date" v-model="form.date" type="date" />
      <span v-if="errors.date" class="error">{{ errors.date }}</span>
    </div>
    <div class="field">
      <label for="note">Notitie</label>
      <textarea id="note" v-model="form.note" />
      <span v-if="errors.note" class="error">{{ errors.note }}</span>
    </div>
    <div class="actions">
      <button type="submit" :disabled="!isValid || submitting">Opslaan</button>
      <button v-if="initial" type="button" @click="emit('cancel')">Annuleren</button>
    </div>
  </form>
</template>

<style scoped>
.expense-form { display: flex; flex-direction: column; gap: 0.75rem; max-width: 480px; }
.field { display: flex; flex-direction: column; gap: 0.25rem; }
.error { color: #c00; font-size: 0.85rem; }
.actions { display: flex; gap: 0.5rem; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
