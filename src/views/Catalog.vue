<template>
  <div class="catalog-page">
    <!-- Header do Catálogo -->
    <section class="catalog-header py-5 bg-light">
      <div class="container">
        <h1 class="page-title text-center mb-2">Nosso Catálogo</h1>
        <p class="page-subtitle text-center text-muted">
          Descubra peças únicas que contam histórias
        </p>
      </div>
    </section>

    <!-- Filtros e Catálogo -->
    <section class="catalog-content py-5">
      <div class="container">
        <!-- Filtros de Categoria -->
        <div class="filters-wrapper mb-4">
          <div class="category-filters">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectCategory(category)"
              class="filter-btn"
              :class="{ active: selectedCategory === category }"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Contador de produtos -->
        <div class="products-info mb-4">
          <p class="text-muted">
            <strong>{{ filteredProducts.length }}</strong> 
            {{ filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados' }}
          </p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading-container">
          <div class="spinner"></div>
        </div>

        <!-- Grid de produtos -->
        <div v-else-if="filteredProducts.length > 0" class="product-grid">
          <ProductCard 
            v-for="product in filteredProducts" 
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- Nenhum produto encontrado -->
        <div v-else class="no-products text-center py-5">
          <i class="bi bi-search icon-large text-muted mb-3"></i>
          <h3 class="text-muted">Nenhum produto encontrado</h3>
          <p class="text-muted">Tente selecionar outra categoria</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../store/products'
import ProductCard from '../components/ProductCard.vue'

export default {
  name: 'Catalog',
  
  components: {
    ProductCard
  },
  
  setup() {
    const productsStore = useProductsStore()
    const categories = ref([])
    const loading = ref(true)

    // Computed
    const selectedCategory = computed(() => productsStore.selectedCategory)
    const filteredProducts = computed(() => productsStore.filteredProducts)

    // Methods
    const selectCategory = (category) => {
      productsStore.setSelectedCategory(category)
    }

    // Lifecycle
    onMounted(async () => {
      loading.value = true
      
      // Carrega categorias e produtos
      await Promise.all([
        productsStore.fetchCategories(),
        productsStore.fetchProducts()
      ])
      
      categories.value = productsStore.categories
      loading.value = false
    })

    return {
      categories,
      selectedCategory,
      filteredProducts,
      loading,
      selectCategory
    }
  }
}
</script>

<style scoped>
/* Header */
.catalog-header {
  background: linear-gradient(135deg, var(--color-beige) 0%, var(--color-white) 100%);
  border-bottom: 1px solid var(--color-border);
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-secondary);
}

.page-subtitle {
  font-size: 1.2rem;
}

/* Filtros */
.filters-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--color-border);
  background-color: var(--color-white);
  color: var(--color-text);
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-medium);
  font-size: 0.95rem;
}

.filter-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
}

.filter-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

/* Produtos Info */
.products-info {
  text-align: center;
}

/* No products */
.no-products {
  padding: 4rem 2rem;
}

.icon-large {
  font-size: 4rem;
  display: block;
}

/* Responsividade */
@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .category-filters {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
}
</style>
