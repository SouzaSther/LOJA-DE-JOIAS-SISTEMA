<template>
  <!-- Navbar elegante e responsiva -->
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
    <div class="container">
      <!-- Logo -->
      <router-link to="/" class="navbar-brand">
        <h3 class="brand-logo mb-0">
          <span class="text-gold">✦</span> Aurora Joias
        </h3>
      </router-link>

      <!-- Toggle para mobile - hamburger animado -->
      <button
        class="mobile-menu-toggle d-lg-none"
        type="button"
        @click="toggleMenu"
        :class="{ 'is-active': menuOpen }"
        aria-label="Menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Desktop Menu -->
      <div class="navbar-collapse d-none d-lg-flex">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Início</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/catalogo" class="nav-link">Catálogo</router-link>
          </li>

          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link to="/perfil" class="nav-link">
                <i class="bi bi-person"></i> {{ userName }}
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/carrinho" class="nav-link position-relative">
                <i class="bi bi-bag"></i> Carrinho
                <span
                  v-if="cartItemCount > 0"
                  class="badge badge-primary position-absolute top-0 start-100 translate-middle"
                >
                  {{ cartItemCount }}
                </span>
              </router-link>
            </li>
            <li class="nav-item">
              <button @click="handleLogout" class="btn btn-outline btn-sm ms-2">
                Sair
              </button>
            </li>
          </template>

          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="btn btn-outline btn-sm ms-2">
                Entrar
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cadastro" class="btn btn-primary btn-sm ms-2">
                Cadastrar
              </router-link>
            </li>
          </template>
        </ul>
      </div>

      <!-- Mobile Menu Overlay -->
      <Teleport to="body">
        <Transition name="overlay-fade">
          <div
            v-if="menuOpen"
            class="mobile-overlay"
            @click="closeMenu"
          ></div>
        </Transition>

        <Transition name="slide-panel">
          <div v-if="menuOpen" class="mobile-menu-panel">
            <!-- Header do painel -->
            <div class="mobile-menu-header">
              <h3 class="brand-logo mb-0">
                <span class="text-gold">✦</span> Aurora Joias
              </h3>
              <button class="mobile-close-btn" @click="closeMenu" aria-label="Fechar menu">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>

            <!-- Separador dourado -->
            <div class="mobile-menu-divider"></div>

            <!-- Links de navegação -->
            <nav class="mobile-nav">
              <TransitionGroup name="stagger" appear>
                <router-link
                  v-for="(item, index) in menuItems"
                  :key="item.to"
                  :to="item.to"
                  class="mobile-nav-link"
                  :class="{ 'is-active': isActiveRoute(item.to) }"
                  :style="{ transitionDelay: `${index * 60}ms` }"
                  @click="closeMenu"
                >
                  <i :class="item.icon" class="mobile-nav-icon"></i>
                  <span class="mobile-nav-text">{{ item.label }}</span>
                  <i class="bi bi-chevron-right mobile-nav-arrow"></i>
                </router-link>
              </TransitionGroup>
            </nav>

            <!-- Separador -->
            <div class="mobile-menu-divider"></div>

            <!-- Ações de autenticação -->
            <div class="mobile-menu-actions">
              <template v-if="isLoggedIn">
                <div class="mobile-user-info">
                  <div class="mobile-user-avatar">
                    <i class="bi bi-person-fill"></i>
                  </div>
                  <div>
                    <p class="mobile-user-name">{{ userName }}</p>
                    <p class="mobile-user-label">Minha Conta</p>
                  </div>
                </div>
                <button @click="handleLogout" class="mobile-logout-btn">
                  <i class="bi bi-box-arrow-right"></i>
                  Sair da conta
                </button>
              </template>

              <template v-else>
                <router-link to="/login" class="mobile-btn mobile-btn-outline" @click="closeMenu">
                  <i class="bi bi-box-arrow-in-right"></i>
                  Entrar
                </router-link>
                <router-link to="/cadastro" class="mobile-btn mobile-btn-primary" @click="closeMenu">
                  <i class="bi bi-person-plus"></i>
                  Criar Conta
                </router-link>
              </template>
            </div>

            <!-- Footer do menu -->
            <div class="mobile-menu-footer">
              <p>Joias exclusivas com elegância</p>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>
  </nav>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useCartStore } from '../store/cart'

export default {
  name: 'Navbar',

  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const cartStore = useCartStore()
    const menuOpen = ref(false)

    // Computed
    const isLoggedIn = computed(() => authStore.isLoggedIn)
    const userName = computed(() => authStore.user?.name?.split(' ')[0] || 'Usuário')
    const cartItemCount = computed(() => cartStore.itemCount)

    const menuItems = computed(() => {
      const items = [
        { to: '/', label: 'Início', icon: 'bi bi-house' },
        { to: '/catalogo', label: 'Catálogo', icon: 'bi bi-grid-3x3-gap' },
      ]

      if (isLoggedIn.value) {
        items.push(
          { to: '/perfil', label: 'Meu Perfil', icon: 'bi bi-person' },
          {
            to: '/carrinho',
            label: cartItemCount.value > 0
              ? `Carrinho (${cartItemCount.value})`
              : 'Carrinho',
            icon: 'bi bi-bag'
          }
        )
      }

      return items
    })

    // Methods
    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value
    }

    const closeMenu = () => {
      menuOpen.value = false
    }

    const isActiveRoute = (to) => {
      return route.path === to
    }

    const handleLogout = () => {
      authStore.logout()
      cartStore.items = []
      router.push('/')
      closeMenu()
    }

    // Bloquear scroll do body quando menu aberto
    watch(menuOpen, (open) => {
      document.body.style.overflow = open ? 'hidden' : ''
    })

    return {
      isLoggedIn,
      userName,
      cartItemCount,
      menuOpen,
      menuItems,
      toggleMenu,
      closeMenu,
      isActiveRoute,
      handleLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 1rem 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.brand-logo {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--color-secondary);
  letter-spacing: 1px;
}

/* ========== Desktop nav links ========== */
.nav-link {
  font-weight: 500;
  color: var(--color-text);
  padding: 0.5rem 1rem !important;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link.router-link-active {
  color: var(--color-primary);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background-color: var(--color-primary);
}

.bi {
  font-size: 1.1rem;
  margin-right: 0.25rem;
}

/* ========== Hamburger animado ========== */
.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
  position: relative;
}

.hamburger-line {
  display: block;
  width: 22px;
  height: 2px;
  background-color: var(--color-secondary);
  border-radius: 2px;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.mobile-menu-toggle.is-active .hamburger-line:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.mobile-menu-toggle.is-active .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.mobile-menu-toggle.is-active .hamburger-line:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ========== Mobile overlay ========== */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
  z-index: 1050;
}

.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.35s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}

/* ========== Mobile menu panel ========== */
.mobile-menu-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  max-width: 85vw;
  height: 100vh;
  height: 100dvh;
  background: var(--color-white);
  z-index: 1060;
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 30px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
}

.slide-panel-enter-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-panel-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-panel-enter-from,
.slide-panel-leave-to {
  transform: translateX(100%);
}

/* ========== Mobile menu header ========== */
.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  min-height: 70px;
}

.mobile-menu-header .brand-logo {
  font-size: 1.25rem;
}

.mobile-close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: var(--color-beige, #f5f1ea);
  color: var(--color-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.mobile-close-btn:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

/* ========== Separador dourado ========== */
.mobile-menu-divider {
  height: 1px;
  margin: 0 1.5rem;
  background: linear-gradient(
    to right,
    transparent,
    var(--color-primary, #c9a961) 30%,
    var(--color-primary, #c9a961) 70%,
    transparent
  );
  opacity: 0.3;
}

/* ========== Links de navegação mobile ========== */
.mobile-nav {
  padding: 0.75rem 0;
  flex: 1;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.9rem 1.5rem;
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  position: relative;
  letter-spacing: 0.3px;
}

.mobile-nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background-color: var(--color-primary);
  border-radius: 0 2px 2px 0;
  transition: height 0.25s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link:active {
  background: var(--color-beige, #f5f1ea);
  color: var(--color-primary);
}

.mobile-nav-link.is-active {
  color: var(--color-primary);
  background: rgba(201, 169, 97, 0.06);
}

.mobile-nav-link.is-active::before {
  height: 60%;
}

.mobile-nav-icon {
  font-size: 1.15rem;
  width: 20px;
  text-align: center;
  opacity: 0.7;
}

.mobile-nav-link:hover .mobile-nav-icon,
.mobile-nav-link.is-active .mobile-nav-icon {
  opacity: 1;
}

.mobile-nav-text {
  flex: 1;
}

.mobile-nav-arrow {
  font-size: 0.7rem;
  opacity: 0.3;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover .mobile-nav-arrow {
  opacity: 0.6;
  transform: translateX(2px);
}

/* Stagger animation */
.stagger-enter-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

/* ========== Ações de autenticação ========== */
.mobile-menu-actions {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.75rem 0;
  margin-bottom: 0.25rem;
}

.mobile-user-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #b39347));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-size: 1.15rem;
}

.mobile-user-name {
  font-weight: 600;
  color: var(--color-secondary);
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.3;
}

.mobile-user-label {
  font-size: 0.8rem;
  color: var(--color-text-light, #666);
  margin: 0;
  line-height: 1.3;
}

.mobile-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.25rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  text-decoration: none;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: all 0.25s ease;
  cursor: pointer;
  border: none;
}

.mobile-btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark, #b39347));
  color: var(--color-white);
}

.mobile-btn-primary:hover {
  box-shadow: 0 4px 15px rgba(201, 169, 97, 0.35);
  transform: translateY(-1px);
  color: var(--color-white);
}

.mobile-btn-outline {
  background: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
}

.mobile-btn-outline:hover {
  background: var(--color-primary);
  color: var(--color-white);
}

.mobile-logout-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: 1.5px solid var(--color-border, #e0e0e0);
  background: transparent;
  color: var(--color-text-light, #666);
  font-weight: 500;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.3px;
}

.mobile-logout-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
  background: rgba(220, 53, 69, 0.04);
}

/* ========== Footer do menu ========== */
.mobile-menu-footer {
  padding: 1rem 1.5rem 1.5rem;
  text-align: center;
  margin-top: auto;
}

.mobile-menu-footer p {
  font-size: 0.75rem;
  color: var(--color-text-light, #666);
  opacity: 0.6;
  font-style: italic;
  font-family: var(--font-heading);
  margin: 0;
  letter-spacing: 0.5px;
}
</style>
