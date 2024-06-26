<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input v-model="login" label="Логин" required />
      <q-input v-model="password" label="Пароль" type="password" required />
      <div class="row justify-center q-gutter-md">
        <q-btn label="Вход" @click="loginUser" color="secondary" />
        <q-btn label="Регистрация" @click="$router.push('/auth/register')" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import {useAuthStore} from "stores/auth";

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const login = ref('')
    const password = ref('')
    const authStore = useAuthStore()
    const router = useRouter()

    const loginUser = async () => {
      const success = await authStore.loginUser(login.value, password.value)
      if (success) {
        router.push('/')
      } else {
        alert('Неправильный логин или пароль!')
      }
    }

    const onSubmit = (event) => {
      event.preventDefault()
      loginUser()
    }

    return {
      login,
      password,
      onSubmit,
      loginUser
    }
  }
})
</script>
