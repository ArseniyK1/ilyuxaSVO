import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    userRole: 'user',
    username: ''
  }),
  getters: {
    getRole: (state) => state.userRole
  },
  actions: {
    async loginUser(login, password) {
      const user = await this.getUserFromDB(login)
      if (user && user.password === password) {
        this.isAuthenticated = true
        this.userRole = user.role || 'user'
        this.username = user.username || ''
        localStorage.clear()
        localStorage.setItem('authState', JSON.stringify({ isAuthenticated: true, userRole: this.userRole, username: this.username }))
        return true
      } else {
        return false
      }
    },
    async registerUser(username, login, password, role = 'user') {
      await this.addUserToDB({ username, login, password, role })
      return true
    },
      logout() {
      this.isAuthenticated = false
      this.userRole = 'user'
      this.username = ''
      localStorage.removeItem('authState')
    },
    async restoreAuthState() {
      const authState = localStorage.getItem('authState')
      if (authState) {
        const { isAuthenticated, userRole, username } = JSON.parse(authState)
        this.isAuthenticated = isAuthenticated
        this.userRole = userRole
        this.username = username
      }
    },
    async getUserFromDB(login) {
      return new Promise((resolve) => {
        const request = indexedDB.open('authDB', 1)
        request.onsuccess = function (event) {
          const db = event.target.result
          const transaction = db.transaction(['users'], 'readonly')
          const store = transaction.objectStore('users')
          const userRequest = store.get(login)
          userRequest.onsuccess = function () {
            resolve(userRequest.result)
          }
        }
      })
    },
    async addUserToDB(user) {
      return new Promise((resolve) => {
        const request = indexedDB.open('authDB', 1)
        request.onupgradeneeded = function (event) {
          const db = event.target.result
          if (!db.objectStoreNames.contains('users')) {
            db.createObjectStore('users', { keyPath: 'login' })
          }
        }
        request.onsuccess = function (event) {
          const db = event.target.result
          const transaction = db.transaction(['users'], 'readwrite')
          const store = transaction.objectStore('users')
          store.add(user)
          transaction.oncomplete = function () {
            resolve(true)
          }
        }
      })
    }
  }
})
