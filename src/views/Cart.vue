<template>
  <div class="cart-page">
    <!-- Header -->
    <section class="cart-header py-4 bg-light">
      <div class="container">
        <h1 class="page-title text-center mb-2">Carrinho de Compras</h1>
        <p class="page-subtitle text-center text-muted">
          Revise seus itens antes de finalizar a compra
        </p>
      </div>
    </section>

    <div class="container py-5">
      <!-- Carrinho Vazio -->
      <div v-if="items.length === 0" class="empty-cart text-center py-5">
        <i class="bi bi-bag-x icon-large text-muted mb-4"></i>
        <h3 class="text-muted mb-3">Seu carrinho está vazio</h3>
        <p class="text-muted mb-4">Adicione produtos ao carrinho para continuar comprando</p>
        <router-link to="/catalogo" class="btn btn-primary btn-lg">
          Ir para o Catálogo
        </router-link>
      </div>

      <!-- Carrinho com Itens -->
      <div v-else class="row">
        <!-- Lista de Itens -->
        <div class="col-lg-8 mb-4">
          <div class="cart-items">
            <div 
              v-for="item in items" 
              :key="item.id"
              class="cart-item card mb-3"
            >
              <div class="row g-0">
                <!-- Imagem -->
                <div class="col-md-3">
                  <img 
                    :src="item.images[0]" 
                    :alt="item.name" 
                    class="cart-item-image"
                  />
                </div>

                <!-- Informações -->
                <div class="col-md-9">
                  <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 class="cart-item-name">{{ item.name }}</h5>
                        <p class="cart-item-category text-muted">{{ item.category }}</p>
                      </div>
                      <button 
                        @click="removeItem(item.id)"
                        class="btn-remove"
                        title="Remover item"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </div>

                    <div class="cart-item-footer mt-3">
                      <!-- Quantidade -->
                      <div class="quantity-controls">
                        <button 
                          @click="decreaseQuantity(item.id, item.quantity)"
                          class="btn-quantity"
                        >
                          <i class="bi bi-dash"></i>
                        </button>
                        <span class="quantity-value">{{ item.quantity }}</span>
                        <button 
                          @click="increaseQuantity(item.id, item.quantity)"
                          class="btn-quantity"
                        >
                          <i class="bi bi-plus"></i>
                        </button>
                      </div>

                      <!-- Preço -->
                      <div class="cart-item-price">
                        {{ formatPrice(item.price * item.quantity) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumo do Pedido -->
        <div class="col-lg-4">
          <div class="order-summary card sticky-summary">
            <div class="card-body">
              <h4 class="summary-title mb-4">Resumo do Pedido</h4>

              <!-- Itens -->
              <div class="summary-row">
                <span>Subtotal ({{ itemCount }} {{ itemCount === 1 ? 'item' : 'itens' }})</span>
                <span>{{ formattedSubtotal }}</span>
              </div>

              <!-- Frete -->
              <div class="summary-row">
                <span>Frete</span>
                <span class="text-success">
                  {{ subtotal >= 500 ? 'Grátis' : formatPrice(50) }}
                </span>
              </div>

              <hr class="my-3">

              <!-- Total -->
              <div class="summary-row summary-total">
                <span>Total</span>
                <span>{{ formattedTotal }}</span>
              </div>

              <!-- Informação de Frete Grátis -->
              <div v-if="subtotal < 500" class="free-shipping-info mt-3">
                <small class="text-muted">
                  <i class="bi bi-info-circle"></i>
                  Falta {{ formatPrice(500 - subtotal) }} para frete grátis!
                </small>
              </div>

              <!-- Botão Finalizar -->
              <button 
                @click="handleCheckout"
                :disabled="checkingOut"
                class="btn btn-primary w-100 btn-lg mt-4"
              >
                <span v-if="checkingOut">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Processando...
                </span>
                <span v-else>
                  <i class="bi bi-credit-card"></i> Finalizar Compra
                </span>
              </button>

              <!-- Continuar Comprando -->
              <router-link 
                to="/catalogo" 
                class="btn btn-outline w-100 mt-3"
              >
                Continuar Comprando
              </router-link>

              <!-- Selos de Segurança -->
              <div class="security-badges mt-4">
                <div class="badge-item">
                  <i class="bi bi-shield-check text-gold"></i>
                  <small>Compra Segura</small>
                </div>
                <div class="badge-item">
                  <i class="bi bi-lock text-gold"></i>
                  <small>Pagamento Protegido</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de Sucesso -->
      <div v-if="showSuccessModal" class="success-modal fade-in">
        <div class="success-modal-content">
          <i class="bi bi-check-circle-fill text-success mb-3"></i>
          <h3 class="mb-3">Pedido Realizado com Sucesso!</h3>
          <p class="text-muted mb-4">
            Seu pedido #{{ orderId }} foi confirmado e será processado em breve.
          </p>
          <router-link to="/perfil" class="btn btn-primary">
            Ver Meus Pedidos
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../store/cart'

export default {
  name: 'Cart',
  
  setup() {
    const router = useRouter()
    const cartStore = useCartStore()
    
    const checkingOut = ref(false)
    const showSuccessModal = ref(false)
    const orderId = ref(null)

    // Computed
    const items = computed(() => cartStore.items)
    const itemCount = computed(() => cartStore.itemCount)
    const subtotal = computed(() => cartStore.subtotal)
    const formattedSubtotal = computed(() => cartStore.formattedTotal)
    
    const total = computed(() => {
      const shipping = subtotal.value >= 500 ? 0 : 50
      return subtotal.value + shipping
    })

    const formattedTotal = computed(() => {
      return total.value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    })

    // Methods
    const formatPrice = (price) => {
      return price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    }

    const removeItem = async (productId) => {
      await cartStore.removeItem(productId)
    }

    const increaseQuantity = async (productId, currentQuantity) => {
      await cartStore.updateQuantity(productId, currentQuantity + 1)
    }

    const decreaseQuantity = async (productId, currentQuantity) => {
      if (currentQuantity > 1) {
        await cartStore.updateQuantity(productId, currentQuantity - 1)
      }
    }

    const handleCheckout = async () => {
      checkingOut.value = true

      // Simula processamento de pagamento
      const result = await cartStore.checkout('Cartão de Crédito')

      if (result.success) {
        orderId.value = result.order.id
        showSuccessModal.value = true

        // Redireciona após 3 segundos
        setTimeout(() => {
          showSuccessModal.value = false
          router.push('/perfil')
        }, 3000)
      }

      checkingOut.value = false
    }

    return {
      items,
      itemCount,
      subtotal,
      formattedSubtotal,
      total,
      formattedTotal,
      checkingOut,
      showSuccessModal,
      orderId,
      formatPrice,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      handleCheckout
    }
  }
}
</script>

<style scoped>
/* Header */
.cart-header {
  background: linear-gradient(135deg, var(--color-beige) 0%, var(--color-white) 100%);
  border-bottom: 1px solid var(--color-border);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-secondary);
}

/* Empty Cart */
.empty-cart {
  padding: 4rem 2rem;
}

.icon-large {
  font-size: 5rem;
  display: block;
}

/* Cart Items */
.cart-item {
  transition: all var(--transition-medium);
}

.cart-item:hover {
  box-shadow: var(--shadow-md);
}

.cart-item-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.cart-item-name {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-secondary);
  margin-bottom: 0.5rem;
}

.cart-item-category {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-remove {
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 1.2rem;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.btn-remove:hover {
  color: #dc3545;
}

.cart-item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Quantity Controls */
.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  padding: 0.25rem;
}

.btn-quantity {
  background: none;
  border: none;
  color: var(--color-primary);
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  transition: all var(--transition-fast);
}

.btn-quantity:hover {
  background-color: rgba(201, 169, 97, 0.1);
}

.quantity-value {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.cart-item-price {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

/* Order Summary */
.sticky-summary {
  position: sticky;
  top: 100px;
}

.summary-title {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-secondary);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.summary-total {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-secondary);
  font-family: var(--font-heading);
}

.free-shipping-info {
  padding: 0.75rem;
  background-color: rgba(201, 169, 97, 0.1);
  border-radius: 4px;
  text-align: center;
}

.security-badges {
  display: flex;
  justify-content: space-around;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border);
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.badge-item i {
  font-size: 1.75rem;
}

/* Success Modal */
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.success-modal-content {
  background-color: var(--color-white);
  padding: 3rem;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  animation: slideUp 0.5s ease;
}

.success-modal-content i {
  font-size: 4rem;
  display: block;
}

/* Responsividade */
@media (max-width: 768px) {
  .cart-item-image {
    height: 150px;
  }

  .cart-item-footer {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
  }

  .sticky-summary {
    position: static;
  }
}
</style>
