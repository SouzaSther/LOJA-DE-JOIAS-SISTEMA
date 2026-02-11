/**
 * Store de Autenticação
 * Gerencia estado do usuário logado e operações de login/registro
 */

import { defineStore } from 'pinia'
import { mockApi } from '../api/mockApi'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    /**
     * Retorna dados do usuário logado
     */
    currentUser: (state) => state.user,
    
    /**
     * Verifica se usuário está autenticado
     */
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    /**
     * Realiza login do usuário
     */
    async login(email, password) {
      try {
        const response = await mockApi.login(email, password)
        
        this.user = response.data.user
        this.token = response.data.token
        this.isAuthenticated = true
        
        // Persiste dados no localStorage
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('auth_user', JSON.stringify(response.data.user))
        
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    /**
     * Registra novo usuário
     */
    async register(userData) {
      try {
        const response = await mockApi.register(userData)
        
        this.user = response.data.user
        this.token = response.data.token
        this.isAuthenticated = true
        
        // Persiste dados no localStorage
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('auth_user', JSON.stringify(response.data.user))
        
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    },

    /**
     * Realiza logout do usuário
     */
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      
      // Remove dados do localStorage
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
    },

    /**
     * Restaura sessão do usuário do localStorage
     */
    restoreSession() {
      const token = localStorage.getItem('auth_token')
      const user = localStorage.getItem('auth_user')
      
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        this.isAuthenticated = true
      }
    }
  }
})
