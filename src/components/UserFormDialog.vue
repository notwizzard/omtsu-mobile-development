<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  user: { type: Object, default: null },
})

const emit = defineEmits(['update:modelValue', 'save'])

const blank = () => ({ firstName: '', lastName: '', birthDate: '', email: '', city: '' })
const form = ref(blank())
const formRef = ref(null)

const isEdit = computed(() => !!props.user)

watch(
  () => props.modelValue,
  (open) => {
    if (open) form.value = props.user ? { ...props.user } : blank()
  },
)

const required = (v) => !!String(v ?? '').trim() || 'Обязательное поле'
const emailRule = (v) =>
  !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Некорректный e-mail'

function close() {
  emit('update:modelValue', false)
}

async function submit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  emit('save', { ...form.value })
  close()
}
</script>

<template>
  <v-dialog :model-value="modelValue" max-width="520" @update:model-value="emit('update:modelValue', $event)">
    <v-card>
      <v-card-title class="d-flex align-center pa-5">
        <v-icon :icon="isEdit ? 'mdi-account-edit' : 'mdi-account-plus'" color="primary" class="mr-2" />
        {{ isEdit ? 'Редактировать пользователя' : 'Новый пользователь' }}
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-5">
        <v-form ref="formRef" @submit.prevent="submit">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.firstName" label="Имя" :rules="[required]" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field v-model="form.lastName" label="Фамилия" :rules="[required]" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.birthDate" label="Дата рождения" type="date" :rules="[required]" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.email" label="E-mail (необязательно)" :rules="[emailRule]" />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="form.city" label="Город (необязательно)" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4">
        <v-spacer />
        <v-btn variant="text" @click="close">Отмена</v-btn>
        <v-btn color="primary" variant="flat" @click="submit">
          {{ isEdit ? 'Сохранить' : 'Создать' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
