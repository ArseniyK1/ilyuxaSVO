<template>
  <q-page class="page-container">
    <q-btn
      label="2024-В"
      @click="$router.push('/2024-v')"
      color="grey-7"
      class="custom-btn"
      style="border-radius: 10px"
    />
  </q-page>
</template>

<script setup></script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  padding-top: 100px; /* Отступ от верхней части страницы */
}

.custom-btn {
  padding-left: 30px; /* Увеличенная ширина кнопки */
  padding-right: 30px;
  margin-top: 20px; /* Отступ от верхнего края страницы */
}
</style>
