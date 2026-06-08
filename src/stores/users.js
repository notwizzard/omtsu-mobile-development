import { defineStore } from 'pinia'
import { createUser, fullName } from '../models/user'
import { seedUsers } from '../data/seed'

const STORAGE_KEY = 'omtsu-users'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    console.warn('Failed to read users from storage', e)
  }
  return seedUsers
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: load(),
    search: '',
  }),

  getters: {
    /** users filtered by the current search query (by first name) */
    filtered(state) {
      const q = state.search.trim().toLowerCase()
      if (!q) return state.users
      return state.users.filter(
        (u) =>
          u.firstName.toLowerCase().includes(q) ||
          fullName(u).toLowerCase().includes(q),
      )
    },
    total: (state) => state.users.length,
  },

  actions: {
    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.users))
    },

    add(data) {
      const user = createUser(data)
      this.users.unshift(user)
      this.persist()
      return user
    },

    update(id, data) {
      const idx = this.users.findIndex((u) => u.id === id)
      if (idx === -1) return
      this.users[idx] = createUser({ ...data, id })
      this.persist()
    },

    remove(id) {
      this.users = this.users.filter((u) => u.id !== id)
      this.persist()
    },

    setSearch(value) {
      this.search = value
    },
  },
})
