<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">Редактирование пользователя</div>
      </q-card-section>

      <q-card-section>
        <q-form>
          <q-input v-model="user.name" label="Имя" outlined class="q-mb-sm">
            <template v-slot:append>
              <q-btn flat label="Изменить" @click="updateField('name')" />
            </template>
          </q-input>

          <q-input v-model="user.login" label="Логин" outlined class="q-mb-sm">
            <template v-slot:append>
              <q-btn flat label="Изменить" @click="updateField('login')" />
            </template>
          </q-input>

          <q-input
            v-model="user.password"
            label="Пароль"
            outlined
            type="password"
            class="q-mb-sm"
          >
            <template v-slot:append>
              <q-btn flat label="Изменить" @click="updateField('password')" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card q-mt-md">
      <q-card-section>
        <div class="text-h6">Регистрация нового пользователя</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="registerUser">
          <q-input
            v-model="newUser.name"
            label="Имя"
            outlined
            class="q-mb-sm"
          />
          <q-input
            v-model="newUser.login"
            label="Логин"
            outlined
            class="q-mb-sm"
          />
          <q-input
            v-model="newUser.password"
            label="Пароль"
            outlined
            type="password"
            class="q-mb-sm"
          />

          <q-select
            v-model="newUser.role"
            :options="roles"
            label="Выбор прав"
            outlined
            class="q-mb-sm"
          />

          <q-btn label="Зарегистрировать" type="submit" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const user = ref({
  name: "Текущее имя",
  login: "текущий_логин",
  password: "текущий_пароль",
});

const newUser = ref({
  name: "",
  login: "",
  password: "",
  role: "",
});

const roles = [
  { label: "Первое", value: "first" },
  { label: "Второе", value: "second" },
  { label: "Третье", value: "third" },
];

const updateField = (field) => {
  // Функция для обновления полей
  console.log(`Updating ${field}:`, user.value[field]);
};

const registerUser = () => {
  // Функция для регистрации нового пользователя
  console.log("Registering new user:", newUser.value);
};
</script>

<style scoped>
.my-card {
  max-width: 600px;
  margin: auto;
}
</style>
