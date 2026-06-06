<script setup>
import { useUsersStore } from '../stores/users'
import UserTable from '../components/UserTable.vue'

const store = useUsersStore()

function onEdit(user) {
  console.log('edit', user)
}

function onDelete(user) {
  store.remove(user.id)
}
</script>

<template>
  <v-container class="py-8" style="max-width: 1100px">
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold">Список пользователей</h1>
        <p class="text-medium-emphasis mb-0">Всего: {{ store.total }}</p>
      </div>
    </div>

    <v-card border flat>
      <UserTable :users="store.filtered" @edit="onEdit" @delete="onDelete" />
    </v-card>
  </v-container>
</template>
