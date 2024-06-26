<template>
  <q-layout class="bg-grey-1">
    <q-header elevated class="text-white" style="background: #5ECFAD" height-hint="61.59">
      <q-toolbar class="q-py-sm q-px-md">
        <!--        <q-select-->
        <!--          ref="search" dark dense standout use-input hide-selected-->
        <!--          class="GL__toolbar-select"-->
        <!--          color="black" :stack-label="false" label="Search or jump to..."-->
        <!--          v-model="text" :options="filteredOptions" @filter="filter"-->
        <!--          style="width: 300px"-->
        <!--        >-->

        <!--          <template v-slot:append>-->
        <!--            <img src="https://cdn.quasar.dev/img/layout-gallery/img-github-search-key-slash.svg">-->
        <!--          </template>-->

        <!--          <template v-slot:no-option>-->
        <!--            <q-item>-->
        <!--              <q-item-section>-->
        <!--                <div class="text-center">-->
        <!--                  <q-spinner-pie-->
        <!--                    color="grey-5"-->
        <!--                    size="24px"-->
        <!--                  />-->
        <!--                </div>-->
        <!--              </q-item-section>-->
        <!--            </q-item>-->
        <!--          </template>-->

        <!--          <template v-slot:option="scope">-->
        <!--            <q-item-->
        <!--              v-bind="scope.itemProps"-->
        <!--              class="GL__select-GL__menu-link"-->
        <!--            >-->
        <!--              <q-item-section side>-->
        <!--                <q-icon name="collections_bookmark" />-->
        <!--              </q-item-section>-->
        <!--              <q-item-section>-->
        <!--              </q-item-section>-->
        <!--              <q-item-section side :class="{ 'default-type': !scope.opt.type }">-->
        <!--                <q-btn outline dense no-caps text-color="blue-grey-5" size="12px" class="bg-grey-1 q-px-sm">-->
        <!--                  {{ scope.opt.type || 'Jump to' }}-->
        <!--                  <q-icon name="subdirectory_arrow_left" size="14px" />-->
        <!--                </q-btn>-->
        <!--              </q-item-section>-->
        <!--            </q-item>-->
        <!--          </template>-->
        <!--        </q-select>-->

        <div v-if="$q.screen.gt.sm" class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
          <a href="javascript:void(0)" class="text-white" @click="$router.push('/')">
            Главная
          </a>
          <a href="javascript:void(0)" class="text-white" @click="$router.push('/reports')">
            Отчеты
          </a>
          <a href="javascript:void(0)" class="text-white">
            История
          </a>

        </div>

        <q-space />

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
                    <div>Аккаунт: <strong>petr</strong></div>
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

export default {
  name: 'MyLayout',

  setup() {
    const username = ref('') // Инициализируем реактивную переменную для имени пользователя

    // Вызываем метод restoreAuthState при монтировании компонента



    return {
      username,
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
