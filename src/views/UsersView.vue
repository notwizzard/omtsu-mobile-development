<script setup>
import { ref } from 'vue'
import { useUsersStore } from '../stores/users'
import UserTable from '../components/UserTable.vue'
import UserFormDialog from '../components/UserFormDialog.vue'
import ConfirmDialog from '../components/ConfirmDialog.vue'
import { fullName } from '../models/user'

const store = useUsersStore()

const dialog = ref(false)
const editing = ref(null)

const confirm = ref(false)
const pendingDelete = ref(null)

const snackbar = ref(false)
const snackText = ref('')

function notify(text) {
  snackText.value = text
  snackbar.value = true
}

function openCreate() {
  editing.value = null
  dialog.value = true
}

function onEdit(user) {
  editing.value = user
  dialog.value = true
}

function onSave(data) {
  if (editing.value) {
    store.update(editing.value.id, data)
    notify('Пользователь обновлён')
  } else {
    store.add(data)
    notify('Пользователь создан')
  }
}

function onDelete(user) {
  pendingDelete.value = user
  confirm.value = true
}

function confirmDelete() {
  if (pendingDelete.value) {
    store.remove(pendingDelete.value.id)
    notify('Пользователь удалён')
  }
  confirm.value = false
  pendingDelete.value = null
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
      <div class="pa-4">
        <v-text-field
          :model-value="store.search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Поиск по имени…"
          hide-details
          clearable
          density="comfortable"
          @update:model-value="store.setSearch($event ?? '')"
        />
      </div>
      <v-divider />
      <UserTable :users="store.filtered" @edit="onEdit" @delete="onDelete" />
    </v-card>

    <UserFormDialog v-model="dialog" :user="editing" @save="onSave" />

    <ConfirmDialog
      v-model="confirm"
      title="Удалить пользователя?"
      :message="pendingDelete ? `Пользователь «${fullName(pendingDelete)}» будет удалён безвозвратно.` : ''"
      @confirm="confirmDelete"
    />

    <v-snackbar v-model="snackbar" :timeout="2500" color="primary" location="bottom right">
      {{ snackText }}
    </v-snackbar>
  </v-container>
</template>
