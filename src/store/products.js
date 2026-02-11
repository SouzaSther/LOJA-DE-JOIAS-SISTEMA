/**
 * Store de Produtos
 * Gerencia catálogo de produtos e operações relacionadas
 */

import { defineStore } from 'pinia'
import { mockApi } from '../api/mockApi'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [],
    featuredProducts: [],
    categories: [],
    currentProduct: null,
    selectedCategory: 'Todos',
    loading: false,
    error: null
  }),

  getters: {
    /**
     * Retorna produtos filtrados pela categoria selecionada
     */
    filteredProducts: (state) => {
      if (state.selectedCategory === 'Todos') {
        return state.products
      }
      return state.products.filter(p => p.category === state.selectedCategory)
    },

    /**
     * Retorna produtos em estoque
     */
    availableProducts: (state) => {
      return state.products.filter(p => p.inStock)
    }
  },

  actions: {
    /**
     * Carrega todos os produtos
     */
    async fetchProducts(category = null) {
      this.loading = true
      this.error = null
      
      try {
        const response = await mockApi.getProducts(category)
        this.products = response.data
      } catch (error) {
        this.error = error.message
        console.error('Erro ao buscar produtos:', error)
      } finally {
        this.loading = false
      }
    },

    /**
     * Carrega produtos em destaque
     */
    async fetchFeaturedProducts() {
      try {
        const response = await mockApi.getFeaturedProducts()
        this.featuredProducts = response.data
      } catch (error) {
        console.error('Erro ao buscar produtos em destaque:', error)
      }
    },

    /**
     * Carrega categorias disponíveis
     */
    async fetchCategories() {
      try {
        const response = await mockApi.getCategories()
        this.categories = response.data
      } catch (error) {
        console.error('Erro ao buscar categorias:', error)
      }
    },

    /**
     * Carrega detalhes de um produto específico
     */
    async fetchProductById(id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await mockApi.getProductById(id)
        this.currentProduct = response.data
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Erro ao buscar produto:', error)
        return null
      } finally {
        this.loading = false
      }
    },

    /**
     * Define categoria selecionada para filtro
     */
    setSelectedCategory(category) {
      this.selectedCategory = category
    },

    /**
     * Limpa produto atual
     */
    clearCurrentProduct() {
      this.currentProduct = null
    }
  }
})
