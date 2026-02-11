/**
 * Mock API para simular backend
 * Simula requisições HTTP com delay para experiência realista
 */

import productsData from '../data/products.json'

// Simula delay de rede
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Simula localStorage para persistência de dados
const storage = {
  get: (key) => {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      return null
    }
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const mockApi = {
  // ========== PRODUTOS ==========
  
  /**
   * Busca todos os produtos
   * @param {string} category - Categoria para filtrar (opcional)
   */
  async getProducts(category = null) {
    await delay(300)
    let products = productsData.products
    
    if (category && category !== 'Todos') {
      products = products.filter(p => p.category === category)
    }
    
    return { data: products }
  },

  /**
   * Busca produto por ID
   * @param {number} id - ID do produto
   */
  async getProductById(id) {
    await delay(200)
    const product = productsData.products.find(p => p.id === parseInt(id))
    
    if (!product) {
      throw new Error('Produto não encontrado')
    }
    
    return { data: product }
  },

  /**
   * Busca produtos em destaque
   */
  async getFeaturedProducts() {
    await delay(200)
    const featured = productsData.products.filter(p => p.featured)
    return { data: featured }
  },

  /**
   * Busca categorias disponíveis
   */
  async getCategories() {
    await delay(100)
    return { data: productsData.categories }
  },

  // ========== AUTENTICAÇÃO ==========
  
  /**
   * Realiza login de usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   */
  async login(email, password) {
    await delay(500)
    
    const users = storage.get('users') || []
    const user = users.find(u => u.email === email && u.password === password)
    
    if (!user) {
      throw new Error('Email ou senha incorretos')
    }
    
    // Remove senha do objeto retornado
    const { password: _, ...userWithoutPassword } = user
    
    return { 
      data: {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + Date.now()
      }
    }
  },

  /**
   * Registra novo usuário
   * @param {object} userData - Dados do novo usuário
   */
  async register(userData) {
    await delay(500)
    
    const users = storage.get('users') || []
    
    // Verifica se email já existe
    if (users.find(u => u.email === userData.email)) {
      throw new Error('Email já cadastrado')
    }
    
    // Cria novo usuário
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '',
      createdAt: new Date().toISOString()
    }
    
    users.push(newUser)
    storage.set('users', users)
    
    // Remove senha do objeto retornado
    const { password: _, ...userWithoutPassword } = newUser
    
    return { 
      data: {
        user: userWithoutPassword,
        token: 'mock-jwt-token-' + Date.now()
      }
    }
  },

  // ========== CARRINHO ==========
  
  /**
   * Busca carrinho do usuário
   * @param {number} userId - ID do usuário
   */
  async getCart(userId) {
    await delay(200)
    const carts = storage.get('carts') || {}
    return { data: carts[userId] || [] }
  },

  /**
   * Adiciona item ao carrinho
   * @param {number} userId - ID do usuário
   * @param {object} item - Item a ser adicionado
   */
  async addToCart(userId, item) {
    await delay(300)
    const carts = storage.get('carts') || {}
    
    if (!carts[userId]) {
      carts[userId] = []
    }
    
    // Verifica se item já existe no carrinho
    const existingIndex = carts[userId].findIndex(i => i.id === item.id)
    
    if (existingIndex >= 0) {
      carts[userId][existingIndex].quantity += 1
    } else {
      carts[userId].push({ ...item, quantity: 1 })
    }
    
    storage.set('carts', carts)
    return { data: carts[userId] }
  },

  /**
   * Remove item do carrinho
   * @param {number} userId - ID do usuário
   * @param {number} productId - ID do produto
   */
  async removeFromCart(userId, productId) {
    await delay(200)
    const carts = storage.get('carts') || {}
    
    if (carts[userId]) {
      carts[userId] = carts[userId].filter(i => i.id !== productId)
      storage.set('carts', carts)
    }
    
    return { data: carts[userId] || [] }
  },

  /**
   * Atualiza quantidade de item no carrinho
   * @param {number} userId - ID do usuário
   * @param {number} productId - ID do produto
   * @param {number} quantity - Nova quantidade
   */
  async updateCartItemQuantity(userId, productId, quantity) {
    await delay(200)
    const carts = storage.get('carts') || {}
    
    if (carts[userId]) {
      const item = carts[userId].find(i => i.id === productId)
      if (item) {
        item.quantity = quantity
        storage.set('carts', carts)
      }
    }
    
    return { data: carts[userId] || [] }
  },

  /**
   * Limpa carrinho do usuário
   * @param {number} userId - ID do usuário
   */
  async clearCart(userId) {
    await delay(200)
    const carts = storage.get('carts') || {}
    carts[userId] = []
    storage.set('carts', carts)
    return { data: [] }
  },

  // ========== PEDIDOS ==========
  
  /**
   * Cria novo pedido
   * @param {number} userId - ID do usuário
   * @param {object} orderData - Dados do pedido
   */
  async createOrder(userId, orderData) {
    await delay(800)
    
    const orders = storage.get('orders') || []
    
    const newOrder = {
      id: Date.now(),
      userId: userId,
      items: orderData.items,
      total: orderData.total,
      status: 'Processando',
      createdAt: new Date().toISOString(),
      paymentMethod: orderData.paymentMethod || 'Pendente'
    }
    
    orders.push(newOrder)
    storage.set('orders', orders)
    
    // Limpa carrinho após criar pedido
    await this.clearCart(userId)
    
    return { data: newOrder }
  },

  /**
   * Busca pedidos do usuário
   * @param {number} userId - ID do usuário
   */
  async getUserOrders(userId) {
    await delay(300)
    const orders = storage.get('orders') || []
    const userOrders = orders.filter(o => o.userId === userId)
    
    // Ordena por data (mais recente primeiro)
    userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    
    return { data: userOrders }
  }
}
