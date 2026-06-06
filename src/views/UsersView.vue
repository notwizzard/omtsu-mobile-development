<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../stores/users'
import UserTable from '../components/UserTable.vue'
import UserFormDialog from '../components/UserFormDialog.vue'

const store = useUsersStore()

const dialog = ref(false)
const editing = ref(null)

function openCreate() {
  editing.value = null
  dialog.value = true
}

function onEdit(user) {
  editing.value = user
  dialog.value = true
}

function onSave(data) {
  if (editing.value) store.update(editing.value.id, data)
  else store.add(data)
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
      <v-btn color="primary" variant="flat" prepend-icon="mdi-plus" @click="openCreate">
        Добавить
      </v-btn>
    </div>

    <v-card border flat>
      <UserTable :users="store.filtered" @edit="onEdit" @delete="onDelete" />
    </v-card>

    <UserFormDialog v-model="dialog" :user="editing" @save="onSave" />
  </v-container>
</template>
