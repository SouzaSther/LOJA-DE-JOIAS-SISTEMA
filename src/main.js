/**
 * Aurora Joias - E-commerce de Joias
 * Main entry point da aplicação Vue.js
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Importa Bootstrap JS para componentes interativos
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Cria instância do Pinia
const pinia = createPinia()

// Cria e configura a aplicação
const app = createApp(App)

// Registra plugins
app.use(pinia)
app.use(router)

// Monta a aplicação
app.mount('#app')

// Log de inicialização
console.log('%c Aurora Joias ✦ ', 'background: #c9a961; color: #fff; font-size: 20px; padding: 10px;')
console.log('E-commerce de Joias - Versão 1.0.0')
