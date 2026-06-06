<script setup>
import UsersView from './views/UsersView.vue'
</script>

<template>
  <v-app>
    <v-app-bar flat color="surface" border>
      <v-app-bar-title class="font-weight-bold">
        <v-icon icon="mdi-account-group" color="primary" class="mr-2" />
        Пользователи
      </v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-background">
      <UsersView />
    </v-main>
  </v-app>
</template>
