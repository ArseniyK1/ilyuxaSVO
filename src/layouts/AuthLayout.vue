<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="bg-blue-500 text-white" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-blue-500 text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <div class="text-h6">ЛГТУ, 2024</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "stores/auth";
import { useRouter } from "vue-router";
const username = ref(""); // Инициализируем реактивную переменную для имени пользователя
const authStore = useAuthStore();
const router = useRouter();
const logoutHandler = async () => {
  authStore.logout();
  await router.push("/auth/login");
};
</script>

<style lang="sass">
.bg-blue-500
  background: #5ecfad

.text-white
  color: white

.GL
  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7

  &__menu-link:hover
    background: #0366d6
    color: white

  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important

  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
</style>
