<template>
  <div class="profile-page">
    <!-- Header -->
    <section class="profile-header py-4 bg-light">
      <div class="container">
        <h1 class="page-title mb-2">Meu Perfil</h1>
        <p class="page-subtitle text-muted">
          Gerencie suas informações e pedidos
        </p>
      </div>
    </section>

    <div class="container py-5">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-lg-3 mb-4">
          <div class="profile-sidebar card">
            <div class="card-body">
              <!-- Avatar -->
              <div class="profile-avatar text-center mb-4">
                <div class="avatar-circle">
                  <i class="bi bi-person-fill"></i>
                </div>
                <h5 class="mt-3 mb-1">{{ user?.name }}</h5>
                <p class="text-muted small">{{ user?.email }}</p>
              </div>

              <!-- Menu -->
              <nav class="profile-menu">
                <button
                  @click="activeTab = 'info'"
                  :class="{ active: activeTab === 'info' }"
                  class="menu-item"
                >
                  <i class="bi bi-person"></i> Dados Pessoais
                </button>
                <button
                  @click="activeTab = 'orders'"
                  :class="{ active: activeTab === 'orders' }"
                  class="menu-item"
                >
                  <i class="bi bi-bag"></i> Meus Pedidos
                </button>
                <button
                  @click="handleLogout"
                  class="menu-item logout"
                >
                  <i class="bi bi-box-arrow-right"></i> Sair
                </button>
              </nav>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="col-lg-9">
          <!-- Dados Pessoais -->
          <div v-if="activeTab === 'info'" class="profile-content card">
            <div class="card-body p-4">
              <h4 class="content-title mb-4">
                <i class="bi bi-person text-gold"></i> Dados Pessoais
              </h4>

              <div class="info-grid">
                <div class="info-item">
                  <label class="info-label">Nome Completo</label>
                  <p class="info-value">{{ user?.name }}</p>
                </div>

                <div class="info-item">
                  <label class="info-label">E-mail</label>
                  <p class="info-value">{{ user?.email }}</p>
                </div>

                <div class="info-item">
                  <label class="info-label">Telefone</label>
                  <p class="info-value">{{ user?.phone || 'Não informado' }}</p>
                </div>

                <div class="info-item">
                  <label class="info-label">Membro desde</label>
                  <p class="info-value">{{ formatDate(user?.createdAt) }}</p>
                </div>
              </div>

              <button class="btn btn-primary mt-4">
                <i class="bi bi-pencil"></i> Editar Informações
              </button>
            </div>
          </div>

          <!-- Meus Pedidos -->
          <div v-if="activeTab === 'orders'" class="profile-content card">
            <div class="card-body p-4">
              <h4 class="content-title mb-4">
                <i class="bi bi-bag text-gold"></i> Histórico de Pedidos
              </h4>

              <!-- Loading -->
              <div v-if="loadingOrders" class="loading-container">
                <div class="spinner"></div>
              </div>

              <!-- Sem pedidos -->
              <div v-else-if="orders.length === 0" class="no-orders text-center py-5">
                <i class="bi bi-bag-x icon-large text-muted mb-3"></i>
                <h5 class="text-muted mb-3">Nenhum pedido realizado</h5>
                <p class="text-muted mb-4">Comece a explorar nosso catálogo!</p>
                <router-link to="/catalogo" class="btn btn-primary">
                  Ver Produtos
                </router-link>
              </div>

              <!-- Lista de pedidos -->
              <div v-else class="orders-list">
                <div 
                  v-for="order in orders" 
                  :key="order.id"
                  class="order-card card mb-3"
                >
                  <div class="card-body">
                    <div class="order-header">
                      <div>
                        <h6 class="order-id mb-1">
                          Pedido #{{ order.id }}
                        </h6>
                        <p class="order-date text-muted small mb-0">
                          {{ formatDate(order.createdAt) }}
                        </p>
                      </div>
                      <span class="badge badge-primary">
                        {{ order.status }}
                      </span>
                    </div>

                    <hr class="my-3">

                    <!-- Itens do pedido -->
                    <div class="order-items mb-3">
                      <div 
                        v-for="item in order.items" 
                        :key="item.id"
                        class="order-item"
                      >
                        <img 
                          :src="item.images[0]" 
                          :alt="item.name" 
                          class="order-item-image"
                        />
                        <div class="order-item-info">
                          <h6 class="mb-1">{{ item.name }}</h6>
                          <p class="text-muted small mb-0">
                            Quantidade: {{ item.quantity }} | 
                            {{ formatPrice(item.price) }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <!-- Total -->
                    <div class="order-footer">
                      <div class="order-total">
                        <span>Total:</span>
                        <strong>{{ formatPrice(order.total) }}</strong>
                      </div>
                      <div class="order-payment">
                        <small class="text-muted">
                          <i class="bi bi-credit-card"></i> 
                          {{ order.paymentMethod }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useCartStore } from '../store/cart'
import { mockApi } from '../api/mockApi'

export default {
  name: 'UserProfile',
  
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const cartStore = useCartStore()

    const activeTab = ref('orders')
    const orders = ref([])
    const loadingOrders = ref(true)

    // Computed
    const user = computed(() => authStore.user)

    // Methods
    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }

    const formatPrice = (price) => {
      return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }

    const handleLogout = () => {
      authStore.logout()
      cartStore.items = []
      router.push('/')
    }

    const loadOrders = async () => {
      if (!user.value) return

      loadingOrders.value = true
      try {
        const response = await mockApi.getUserOrders(user.value.id)
        orders.value = response.data
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error)
      } finally {
        loadingOrders.value = false
      }
    }

    // Lifecycle
    onMounted(() => {
      loadOrders()
    })

    return {
      user,
      activeTab,
      orders,
      loadingOrders,
      formatDate,
      formatPrice,
      handleLogout
    }
  }
}
</script>

<style scoped>
/* Header */
.profile-header {
  background: linear-gradient(135deg, var(--color-beige) 0%, var(--color-white) 100%);
  border-bottom: 1px solid var(--color-border);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-secondary);
}

/* Sidebar */
.profile-sidebar {
  position: sticky;
  top: 100px;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  margin: 0 auto;
}

.profile-menu {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border: none;
  background: none;
  color: var(--color-text);
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
  border-radius: 4px;
  font-weight: 500;
}

.menu-item:hover {
  background-color: rgba(201, 169, 97, 0.1);
  color: var(--color-primary);
}

.menu-item.active {
  background-color: var(--color-primary);
  color: var(--color-white);
}

.menu-item.logout {
  margin-top: 1rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
  color: #dc3545;
}

.menu-item.logout:hover {
  background-color: rgba(220, 53, 69, 0.1);
}

/* Content */
.profile-content {
  min-height: 400px;
}

.content-title {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-secondary);
}

/* Info Grid */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-item {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.info-label {
  font-weight: 600;
  color: var(--color-text-light);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  display: block;
}

.info-value {
  font-size: 1.1rem;
  color: var(--color-secondary);
  margin: 0;
}

/* Orders */
.no-orders {
  padding: 3rem 1rem;
}

.icon-large {
  font-size: 4rem;
  display: block;
}

.order-card {
  border: 1px solid var(--color-border);
  transition: all var(--transition-medium);
}

.order-card:hover {
  box-shadow: var(--shadow-md);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.order-id {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-secondary);
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-item {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.order-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.order-item-info h6 {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--color-secondary);
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.order-total {
  font-size: 1.25rem;
  font-family: var(--font-heading);
}

.order-total strong {
  color: var(--color-primary);
}

/* Responsividade */
@media (max-width: 991px) {
  .profile-sidebar {
    position: static;
  }

  .avatar-circle {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }
}
</style>
