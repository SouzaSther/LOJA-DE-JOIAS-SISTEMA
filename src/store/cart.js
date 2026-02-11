/**
 * Store do Carrinho de Compras
 * Gerencia itens do carrinho e operações relacionadas
 */

import { defineStore } from 'pinia'
import { mockApi } from '../api/mockApi'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    loading: false
  }),

  getters: {
    /**
     * Retorna total de itens no carrinho
     */
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    /**
     * Calcula subtotal do carrinho
     */
    subtotal: (state) => {
      return state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
    },

    /**
     * Calcula total com formatação
     */
    total: (state) => {
      const subtotal = state.items.reduce((total, item) => {
        return total + (item.price * item.quantity)
      }, 0)
      
      return subtotal
    },

    /**
     * Formata valor para moeda brasileira
     */
    formattedTotal() {
      return this.total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }
  },

  actions: {
    /**
     * Carrega carrinho do usuário
     */
    async loadCart() {
      const authStore = useAuthStore()
      
      if (!authStore.user) return
      
      this.loading = true
      try {
        const response = await mockApi.getCart(authStore.user.id)
        this.items = response.data
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Adiciona produto ao carrinho
     */
    async addItem(product) {
      const authStore = useAuthStore()
      
      if (!authStore.user) {
        throw new Error('Usuário não autenticado')
      }
      
      this.loading = true
      try {
        const response = await mockApi.addToCart(authStore.user.id, product)
        this.items = response.data
        return { success: true }
      } catch (error) {
        console.error('Erro ao adicionar item:', error)
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },

    /**
     * Remove produto do carrinho
     */
    async removeItem(productId) {
      const authStore = useAuthStore()
      
      if (!authStore.user) return
      
      this.loading = true
      try {
        const response = await mockApi.removeFromCart(authStore.user.id, productId)
        this.items = response.data
      } catch (error) {
        console.error('Erro ao remover item:', error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Atualiza quantidade de um item
     */
    async updateQuantity(productId, quantity) {
      const authStore = useAuthStore()
      
      if (!authStore.user) return
      
      if (quantity <= 0) {
        await this.removeItem(productId)
        return
      }
      
      this.loading = true
      try {
        const response = await mockApi.updateCartItemQuantity(
          authStore.user.id,
          productId,
          quantity
        )
        this.items = response.data
      } catch (error) {
        console.error('Erro ao atualizar quantidade:', error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Limpa todos os itens do carrinho
     */
    async clearCart() {
      const authStore = useAuthStore()
      
      if (!authStore.user) return
      
      this.loading = true
      try {
        await mockApi.clearCart(authStore.user.id)
        this.items = []
      } catch (error) {
        console.error('Erro ao limpar carrinho:', error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Finaliza compra criando pedido
     */
    async checkout(paymentMethod = 'Cartão de Crédito') {
      const authStore = useAuthStore()
      
      if (!authStore.user) {
        throw new Error('Usuário não autenticado')
      }
      
      if (this.items.length === 0) {
        throw new Error('Carrinho vazio')
      }
      
      this.loading = true
      try {
        const orderData = {
          items: this.items,
          total: this.total,
          paymentMethod
        }
        
        const response = await mockApi.createOrder(authStore.user.id, orderData)
        this.items = []
        return { success: true, order: response.data }
      } catch (error) {
        console.error('Erro ao finalizar compra:', error)
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    }
  }
})
