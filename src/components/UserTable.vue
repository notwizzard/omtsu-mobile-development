<script setup>
import { fullName, age } from '../models/user'

defineProps({
  users: { type: Array, required: true },
})

const emit = defineEmits(['edit', 'delete'])

const headers = [
  { title: 'Пользователь', key: 'name', sortable: false },
  { title: 'Дата рождения', key: 'birthDate' },
  { title: 'Возраст', key: 'age', align: 'center' },
  { title: 'Город', key: 'city' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
]

function initials(user) {
  return `${user.firstName[0] ?? ''}${user.lastName[0] ?? ''}`.toUpperCase()
}

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('ru-RU')
}
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="users"
    item-value="id"
    hover
    class="rounded-lg"
  >
    <template #item.name="{ item }">
      <div class="d-flex align-center py-2">
        <v-avatar color="primary" size="40" class="mr-3">
          <span class="text-caption font-weight-bold">{{ initials(item) }}</span>
        </v-avatar>
        <div>
          <div class="font-weight-medium">{{ fullName(item) }}</div>
          <div class="text-caption text-medium-emphasis">
            {{ item.email || 'без e-mail' }}
          </div>
        </div>
      </div>
    </template>

    <template #item.birthDate="{ item }">
      {{ formatDate(item.birthDate) }}
    </template>

    <template #item.age="{ item }">
      <v-chip v-if="age(item) !== null" size="small" variant="tonal">
        {{ age(item) }}
      </v-chip>
      <span v-else>—</span>
    </template>

    <template #item.city="{ item }">
      {{ item.city || '—' }}
    </template>

    <template #no-data>
      <div class="text-center py-12 text-medium-emphasis">
        <v-icon icon="mdi-account-off-outline" size="48" class="mb-2" />
        <div>Пользователи не найдены</div>
      </div>
    </template>

    <template #item.actions="{ item }">
      <v-btn
        icon="mdi-pencil"
        variant="text"
        size="small"
        color="primary"
        @click="emit('edit', item)"
      />
      <v-btn
        icon="mdi-delete-outline"
        variant="text"
        size="small"
        color="error"
        @click="emit('delete', item)"
      />
    </template>
  </v-data-table>
</template>
