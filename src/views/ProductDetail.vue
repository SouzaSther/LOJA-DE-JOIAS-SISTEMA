<template>
  <div class="product-detail-page">
    <!-- Loading -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
    </div>

    <!-- Produto não encontrado -->
    <div v-else-if="!product" class="container py-5 text-center">
      <i class="bi bi-exclamation-circle icon-large text-muted mb-3"></i>
      <h2 class="text-muted mb-4">Produto não encontrado</h2>
      <router-link to="/catalogo" class="btn btn-primary">
        Voltar ao Catálogo
      </router-link>
    </div>

    <!-- Detalhes do Produto -->
    <div v-else class="container py-5">
      <div class="row">
        <!-- Galeria de Imagens -->
        <div class="col-lg-6 mb-4">
          <div class="image-gallery">
            <!-- Imagem Principal -->
            <div class="main-image-wrapper">
              <img 
                :src="mainImage" 
                :alt="product.name" 
                class="main-image"
              />
            </div>

            <!-- Thumbnails -->
            <div class="thumbnails" v-if="product.images.length > 1">
              <div 
                v-for="(image, index) in product.images" 
                :key="index"
                @click="selectImage(index)"
                class="thumbnail-wrapper"
                :class="{ active: currentImageIndex === index }"
              >
                <img :src="image" :alt="`${product.name} - ${index + 1}`" class="thumbnail" />
              </div>
            </div>
          </div>
        </div>

        <!-- Informações do Produto -->
        <div class="col-lg-6">
          <div class="product-details">
            <!-- Categoria -->
            <div class="product-category text-muted mb-2">
              {{ product.category }}
            </div>

            <!-- Nome -->
            <h1 class="product-title mb-3">
              {{ product.name }}
            </h1>

            <!-- Preço -->
            <div class="product-price mb-4">
              {{ formattedPrice }}
            </div>

            <!-- Status de Estoque -->
            <div class="stock-status mb-4">
              <span v-if="product.inStock" class="badge badge-success">
                <i class="bi bi-check-circle"></i> Em Estoque
              </span>
              <span v-else class="badge badge-danger">
                <i class="bi bi-x-circle"></i> Esgotado
              </span>
            </div>

            <!-- Descrição -->
            <div class="product-description mb-4">
              <h5 class="mb-3">Descrição</h5>
              <p>{{ product.description }}</p>
            </div>

            <!-- Características -->
            <div class="product-features mb-4">
              <h5 class="mb-3">Características</h5>
              <ul class="features-list">
                <li><i class="bi bi-check-circle text-gold"></i> Certificado de autenticidade incluso</li>
                <li><i class="bi bi-check-circle text-gold"></i> Garantia de 1 ano</li>
                <li><i class="bi bi-check-circle text-gold"></i> Embalagem premium para presente</li>
                <li><i class="bi bi-check-circle text-gold"></i> Frete grátis acima de R$ 500</li>
              </ul>
            </div>

            <!-- Botões de Ação -->
            <div class="action-buttons">
              <button 
                @click="addToCart"
                :disabled="!product.inStock || addingToCart"
                class="btn btn-primary btn-lg w-100 mb-3"
              >
                <span v-if="addingToCart">
                  <span class="spinner-border spinner-border-sm me-2"></span>
                  Adicionando...
                </span>
                <span v-else>
                  <i class="bi bi-bag-plus"></i> Adicionar ao Carrinho
                </span>
              </button>

              <button class="btn btn-outline btn-lg w-100">
                <i class="bi bi-heart"></i> Adicionar aos Favoritos
              </button>
            </div>

            <!-- Mensagem de sucesso -->
            <div v-if="showSuccessMessage" class="alert alert-success mt-3 fade-in">
              <i class="bi bi-check-circle"></i> Produto adicionado ao carrinho!
            </div>

            <!-- Mensagem de erro -->
            <div v-if="errorMessage" class="alert alert-danger mt-3 fade-in">
              <i class="bi bi-exclamation-circle"></i> {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'
import { useAuthStore } from '../store/auth'

export default {
  name: 'ProductDetail',
  
  setup() {
    const route = useRoute()
    const router = useRouter()
    const productsStore = useProductsStore()
    const cartStore = useCartStore()
    const authStore = useAuthStore()

    const product = ref(null)
    const loading = ref(true)
    const currentImageIndex = ref(0)
    const addingToCart = ref(false)
    const showSuccessMessage = ref(false)
    const errorMessage = ref('')

    // Computed
    const mainImage = computed(() => {
      return product.value?.images[currentImageIndex.value] || ''
    })

    const formattedPrice = computed(() => {
      return product.value?.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    })

    // Methods
    const selectImage = (index) => {
      currentImageIndex.value = index
    }

    const addToCart = async () => {
      // Verifica se usuário está logado
      if (!authStore.isLoggedIn) {
        router.push({ name: 'Login', query: { redirect: route.fullPath } })
        return
      }

      addingToCart.value = true
      errorMessage.value = ''
      showSuccessMessage.value = false

      const result = await cartStore.addItem(product.value)

      if (result.success) {
        showSuccessMessage.value = true
        setTimeout(() => {
          showSuccessMessage.value = false
        }, 3000)
      } else {
        errorMessage.value = result.error || 'Erro ao adicionar produto'
      }

      addingToCart.value = false
    }

    // Lifecycle
    onMounted(async () => {
      loading.value = true
      const productId = route.params.id
      
      product.value = await productsStore.fetchProductById(productId)
      
      if (!product.value) {
        // Produto não encontrado
        loading.value = false
        return
      }

      loading.value = false
    })

    return {
      product,
      loading,
      mainImage,
      formattedPrice,
      currentImageIndex,
      addingToCart,
      showSuccessMessage,
      errorMessage,
      selectImage,
      addToCart
    }
  }
}
</script>

<style scoped>
/* Image Gallery */
.image-gallery {
  position: sticky;
  top: 100px;
}

.main-image-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: var(--color-beige);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnails {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.thumbnail-wrapper {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all var(--transition-fast);
}

.thumbnail-wrapper:hover {
  border-color: var(--color-primary);
}

.thumbnail-wrapper.active {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Product Details */
.product-details {
  padding: 1rem;
}

.product-category {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  font-size: 0.9rem;
}

.product-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-secondary);
  line-height: 1.2;
}

.product-price {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.product-description {
  line-height: 1.8;
  color: var(--color-text);
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.features-list i {
  font-size: 1.2rem;
}

.icon-large {
  font-size: 4rem;
  display: block;
}

/* Responsividade */
@media (max-width: 991px) {
  .image-gallery {
    position: static;
  }
}

@media (max-width: 768px) {
  .product-title {
    font-size: 2rem;
  }

  .product-price {
    font-size: 2rem;
  }
}
</style>
