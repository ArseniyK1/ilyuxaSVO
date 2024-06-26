<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white" style="background: #5ECFAD" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <!-- Ваш код тулбара здесь -->
        <!-- Убрал для краткости -->

        <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
          <q-btn dense flat no-wrap>
            <q-avatar rounded size="20px">
              <img src="https://cdn.quasar.dev/img/avatar3.jpg">
            </q-avatar>
            <q-icon name="arrow_drop_down" size="16px" />

            <q-menu auto-close>
              <q-list dense>
                <q-item class="GL__menu-link-signed-in">
                  <q-item-section>
                    <div>Аккаунт: <strong>{{ username }}</strong></div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable class="GL__menu-link">
                  <q-item-section>Открыть профиль</q-item-section>
                </q-item>
                <q-item clickable class="GL__menu-link" @click="logoutHandler">
                  <q-item-section>Выйти</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="text-white" style="background:#5ECFAD" >
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <div class="text-h6">ЛГТУ, 2024</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useAuthStore } from 'stores/auth'

export default {
  name: 'MyLayout',

  setup() {
    const authStore = useAuthStore()
    const username = ref('') // Инициализируем реактивную переменную для имени пользователя

    // Вызываем метод restoreAuthState при монтировании компонента
    onMounted(() => {
      authStore.restoreAuthState()
      username.value = authStore.username // Обновляем имя пользователя после восстановления состояния
    })

    function logoutHandler() {
      authStore.logout()
    }

    return {
      username,
      logoutHandler
    }
  }
}
</script>

<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
    visibility: hidden

    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible

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

  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none
</style>
