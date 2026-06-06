<script setup>
import { useUsersStore } from '../stores/users'

const store = useUsersStore()
</script>

<template>
  <v-container class="py-8" style="max-width: 1100px">
    <div class="d-flex align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold">Список пользователей</h1>
        <p class="text-medium-emphasis mb-0">Всего: {{ store.total }}</p>
      </div>
    </div>
  </v-container>
</template>
