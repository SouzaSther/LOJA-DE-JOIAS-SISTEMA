/**
 * Vue Router Configuration
 * Define rotas e navegação da aplicação
 */

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

// Lazy loading de views para melhor performance
const Home = () => import('../views/Home.vue')
const Catalog = () => import('../views/Catalog.vue')
const ProductDetail = () => import('../views/ProductDetail.vue')
const Cart = () => import('../views/Cart.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const UserProfile = () => import('../views/UserProfile.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      title: 'Aurora Joias - Elegância e Sofisticação',
      transition: 'fade'
    }
  },
  {
    path: '/catalogo',
    name: 'Catalog',
    component: Catalog,
    meta: { 
      title: 'Catálogo - Aurora Joias',
      transition: 'slide-left'
    }
  },
  {
    path: '/produto/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { 
      title: 'Produto - Aurora Joias',
      transition: 'slide-up'
    }
  },
  {
    path: '/carrinho',
    name: 'Cart',
    component: Cart,
    meta: { 
      title: 'Carrinho - Aurora Joias',
      requiresAuth: true,
      transition: 'slide-left'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { 
      title: 'Login - Aurora Joias',
      guest: true,
      transition: 'fade'
    }
  },
  {
    path: '/cadastro',
    name: 'Register',
    component: Register,
    meta: { 
      title: 'Cadastro - Aurora Joias',
      guest: true,
      transition: 'fade'
    }
  },
  {
    path: '/perfil',
    name: 'UserProfile',
    component: UserProfile,
    meta: { 
      title: 'Meu Perfil - Aurora Joias',
      requiresAuth: true,
      transition: 'slide-left'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Sempre rola para o topo ao navegar
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Atualiza título da página
  document.title = to.meta.title || 'Aurora Joias'
  
  // Verifica autenticação
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // Redireciona para login se rota requer autenticação
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guest && authStore.isLoggedIn) {
    // Redireciona para home se já está logado
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
