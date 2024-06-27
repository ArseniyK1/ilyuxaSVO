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
        <q-form @submit.prevent="registerUser">
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
        <div v-if="registeredUsers.length" class="q-mt-md">
          <div
            v-for="user in registeredUsers"
            :key="user.login"
            class="q-pa-sm"
          >
            {{ user.name }}
            <q-btn flat label="Изменить" @click="editUser(user)" />
            <q-btn flat label="Удалить" @click="deleteUser(user)" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card flat bordered class="my-card q-mt-md">
      <q-card-section>
        <div class="text-h6">Добавление подразделения</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="createDepartment">
          <q-input
            v-model="newDepartment.name"
            label="Название"
            outlined
            class="q-mb-sm"
          />
          <q-input
            v-model="newDepartment.rooms"
            label="Аудитории"
            outlined
            class="q-mb-sm"
          />
          <q-btn label="Создать" type="submit" color="primary" />
        </q-form>
        <div v-if="departments.length" class="q-mt-md">
          <div v-for="dept in departments" :key="dept.name" class="q-pa-sm">
            {{ dept.name }}
            <q-btn flat label="Изменить" @click="editDepartment(dept)" />
            <q-btn flat label="Удалить" @click="deleteDepartment(dept)" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const user = ref({
  name: "administrator",
  login: "administrator",
  password: "admin",
});

const newUser = ref({
  name: "",
  login: "",
  password: "",
  role: "",
});

const registeredUsers = ref([]);

const newDepartment = ref({
  name: "",
  rooms: "",
});

const departments = ref([]);

const roles = [
  { label: "Преподаватель", value: "first" },
  { label: "ЛПР", value: "second" },
];

const updateField = (field) => {
  // Функция для обновления полей
  console.log(`Updating ${field}:`, user.value[field]);
};

const registerUser = () => {
  // Функция для регистрации нового пользователя
  registeredUsers.value.push({ ...newUser.value });
  console.log("Registering new user:", newUser.value);
  newUser.value = { name: "", login: "", password: "", role: "" };
};

const createDepartment = () => {
  // Функция для создания нового подразделения
  departments.value.push({ ...newDepartment.value });
  console.log("Creating new department:", newDepartment.value);
  newDepartment.value = { name: "", rooms: "" };
};

const editUser = (user) => {
  // Функция для редактирования пользователя
  console.log("Editing user:", user);
};

const deleteUser = (user) => {
  // Функция для удаления пользователя
  const index = registeredUsers.value.indexOf(user);
  if (index !== -1) {
    registeredUsers.value.splice(index, 1);
  }
};

const editDepartment = (dept) => {
  // Функция для редактирования подразделения
  console.log("Editing department:", dept);
};

const deleteDepartment = (dept) => {
  // Функция для удаления подразделения
  const index = departments.value.indexOf(dept);
  if (index !== -1) {
    departments.value.splice(index, 1);
  }
};
</script>

<style scoped>
.my-card {
  max-width: 600px;
  margin: auto;
}
</style>
