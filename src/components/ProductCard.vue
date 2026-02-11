<template>
  <!-- Card de produto elegante e responsivo -->
  <div class="product-card card" @click="goToProduct">
    <!-- Imagem do produto -->
    <div class="product-image-wrapper">
      <img 
        :src="product.images[0]" 
        :alt="product.name" 
        class="product-image"
        loading="lazy"
      />
      
      <!-- Badge de destaque ou estoque -->
      <div class="product-badges">
        <span v-if="product.featured" class="badge badge-primary">
          Destaque
        </span>
        <span v-if="!product.inStock" class="badge badge-danger">
          Esgotado
        </span>
      </div>
    </div>

    <!-- Informações do produto -->
    <div class="product-info">
      <div class="product-category text-muted small">
        {{ product.category }}
      </div>
      
      <h5 class="product-name">
        {{ product.name }}
      </h5>
      
      <div class="product-price">
        {{ formattedPrice }}
      </div>
      
      <!-- Botão de ação -->
      <button 
        class="btn btn-outline w-100 mt-3"
        @click.stop="goToProduct"
      >
        Ver Detalhes
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ProductCard',
  
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  
  setup(props) {
    const router = useRouter()
    
    // Formata preço para moeda brasileira
    const formattedPrice = computed(() => {
      return props.product.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    })
    
    // Navega para página de detalhes do produto
    const goToProduct = () => {
      router.push(`/produto/${props.product.id}`)
    }
    
    return {
      formattedPrice,
      goToProduct
    }
  }
}
</script>

<style scoped>
.product-card {
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  background-color: var(--color-beige);
  aspect-ratio: 1 / 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.08);
}

.product-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1;
}

.product-info {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-category {
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.product-name {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-secondary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
  min-height: 2.8rem;
}

.product-price {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-top: auto;
}

/* Animação de hover no card */
.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(201, 169, 97, 0.05) 0%,
    transparent 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.product-card:hover::before {
  opacity: 1;
}

/* Responsividade */
@media (max-width: 576px) {
  .product-name {
    font-size: 1rem;
    min-height: 2.5rem;
  }
  
  .product-price {
    font-size: 1.2rem;
  }
}
</style>
