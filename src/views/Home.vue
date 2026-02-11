<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title fade-in">
          Aurora Joias
        </h1>
        <p class="hero-subtitle fade-in">
          Elegância e sofisticação que brilham em cada detalhe
        </p>
        <router-link to="/catalogo" class="btn btn-primary btn-lg fade-in">
          Ver Catálogo
        </router-link>
      </div>
    </section>

    <!-- Produtos em Destaque -->
    <section class="featured-section py-5">
      <div class="container">
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Destaques da Coleção</h2>
          <p class="section-subtitle text-muted">
            Peças exclusivas selecionadas especialmente para você
          </p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
        </div>

        <!-- Grid de produtos -->
        <div v-else class="product-grid">
          <ProductCard 
            v-for="product in featuredProducts" 
            :key="product.id"
            :product="product"
            class="slide-up"
          />
        </div>

        <!-- Botão ver mais -->
        <div class="text-center mt-5">
          <router-link to="/catalogo" class="btn btn-outline btn-lg">
            Ver Todos os Produtos
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-sm-6 mb-4">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-gem"></i>
              </div>
              <h4 class="feature-title">Qualidade Premium</h4>
              <p class="feature-text text-muted">
                Joias confeccionadas com materiais nobres e acabamento impecável
              </p>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 mb-4">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-shield-check"></i>
              </div>
              <h4 class="feature-title">Certificado</h4>
              <p class="feature-text text-muted">
                Todas as peças acompanham certificado de autenticidade
              </p>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 mb-4">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-truck"></i>
              </div>
              <h4 class="feature-title">Entrega Segura</h4>
              <p class="feature-text text-muted">
                Frete grátis para todo Brasil em compras acima de R$ 500
              </p>
            </div>
          </div>

          <div class="col-md-3 col-sm-6 mb-4">
            <div class="feature-item">
              <div class="feature-icon">
                <i class="bi bi-arrow-repeat"></i>
              </div>
              <h4 class="feature-title">Troca Garantida</h4>
              <p class="feature-text text-muted">
                Política de troca facilitada em até 30 dias após a compra
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section py-5">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="cta-title mb-3">
            Encontre a joia perfeita para você
          </h2>
          <p class="cta-subtitle mb-4">
            Atendimento personalizado e consultoria especializada
          </p>
          <div class="cta-buttons">
            <router-link to="/catalogo" class="btn btn-primary btn-lg me-3">
              Explorar Coleção
            </router-link>
            <a href="#" class="btn btn-outline btn-lg">
              <i class="bi bi-whatsapp"></i> Falar com Especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useProductsStore } from '../store/products'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Home',
  
  components: {
    ProductCard
  },
  
  setup() {
    const productsStore = useProductsStore()
    const featuredProducts = ref([])
    const loading = ref(true)

    onMounted(async () => {
      loading.value = true
      await productsStore.fetchFeaturedProducts()
      featuredProducts.value = productsStore.featuredProducts
      loading.value = false
    })

    return {
      featuredProducts,
      loading
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero-section {
  position: relative;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f1ea 0%, #ffffff 50%, #f5f1ea 100%);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(201, 169, 97, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(201, 169, 97, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
  animation-delay: 0.2s;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  color: var(--color-text-light);
  margin-bottom: 2.5rem;
  font-weight: 300;
  line-height: 1.6;
  animation-delay: 0.4s;
}

.hero-content .btn {
  animation-delay: 0.6s;
  padding: 1rem 3rem;
  font-size: 1rem;
}

/* Featured Section */
.featured-section {
  background-color: var(--color-white);
}

.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-light);
}

/* Features Section */
.features-section {
  background-color: var(--color-beige);
  padding: 4rem 0;
}

.feature-item {
  text-align: center;
  padding: 2rem 1rem;
}

.feature-icon {
  font-size: 3.5rem;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-secondary);
  margin-bottom: 1rem;
}

.feature-text {
  font-size: 0.95rem;
  line-height: 1.6;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--color-secondary) 0%, #1a1a1a 100%);
  color: var(--color-white);
  padding: 5rem 0 !important;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-white);
}

.cta-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsividade */
@media (max-width: 768px) {
  .hero-section {
    min-height: 70vh;
  }

  .section-title {
    font-size: 2rem;
  }

  .cta-title {
    font-size: 2rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  .cta-buttons .btn {
    width: 100%;
    margin: 0.5rem 0 !important;
  }
}
</style>
