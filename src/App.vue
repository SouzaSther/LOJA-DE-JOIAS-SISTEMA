<template>
  <div id="app" class="app-wrapper">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content com transições -->
    <main class="main-content">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useAuthStore } from './store/auth'
import { useCartStore } from './store/cart'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  
  components: {
    Navbar,
    Footer
  },
  
  setup() {
    const authStore = useAuthStore()
    const cartStore = useCartStore()

    // Restaura sessão ao iniciar a aplicação
    onMounted(() => {
      authStore.restoreSession()
      
      // Se há usuário logado, carrega o carrinho
      if (authStore.isLoggedIn) {
        cartStore.loadCart()
      }
    })
  }
}
</script>

<style>
/* Importa Bootstrap CSS */
@import 'bootstrap/dist/css/bootstrap.min.css';
/* Importa Bootstrap Icons */
@import 'bootstrap-icons/font/bootstrap-icons.css';
/* Importa estilos customizados */
@import './assets/css/main.css';

/* App Wrapper */
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Transições personalizadas */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* Scrollbar customizada */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary-dark);
}

/* Seleção de texto */
::selection {
  background-color: var(--color-primary);
  color: var(--color-white);
}

::-moz-selection {
  background-color: var(--color-primary);
  color: var(--color-white);
}
</style>
