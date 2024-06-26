<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input v-model="username" label="Имя" required />
      <q-input v-model="login" label="Логин" required />
      <q-input v-model="password" label="Пароль" type="password" required />
      <q-checkbox v-model="isTeacher" label="Зарегистрироваться как преподаватель" />
      <q-checkbox v-model="isDecisionMaker" label="Зарегистрироваться как Лицо Принимающее Решения" />
      <div class="row justify-center q-gutter-md">
        <q-btn label="Регистрация" type="submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from "stores/auth";

export default defineComponent({
  name: 'RegisterPage',
  setup() {
    const username = ref('')
    const login = ref('')
    const password = ref('')
    const isTeacher = ref(false)
    const isDecisionMaker = ref(false)
    const authStore = useAuthStore()
    const router = useRouter()

    const registerUser = async () => {
      let role = 'user'
      if (isTeacher.value) role = 'teacher'
      if (isDecisionMaker.value) role = 'decision_maker'
      await authStore.registerUser(username.value, login.value, password.value, role)
      await router.push('/auth/login')
    }

    const onSubmit = (event) => {
      event.preventDefault()
      registerUser()
    }

    return {
      username,
      login,
      password,
      isTeacher,
      isDecisionMaker,
      onSubmit,
      registerUser
    }
  }
})
</script>
