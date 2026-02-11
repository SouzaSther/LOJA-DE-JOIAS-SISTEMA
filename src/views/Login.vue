<template>
  <div class="login-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="login-card card">
            <div class="card-body p-5">
              <!-- Logo/Título -->
              <div class="text-center mb-4">
                <h2 class="login-title mb-2">
                  <span class="text-gold">✦</span> Aurora Joias
                </h2>
                <p class="text-muted">Entre na sua conta</p>
              </div>

              <!-- Formulário -->
              <form @submit.prevent="handleLogin">
                <!-- Email -->
                <div class="mb-3">
                  <label for="email" class="form-label">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    class="form-control"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <!-- Senha -->
                <div class="mb-3">
                  <label for="password" class="form-label">Senha</label>
                  <div class="password-input-wrapper">
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      id="password"
                      v-model="formData.password"
                      class="form-control"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      @click="togglePassword"
                      class="btn-toggle-password"
                    >
                      <i :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                    </button>
                  </div>
                </div>

                <!-- Lembrar-me -->
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="remember"
                    v-model="formData.remember"
                    class="form-check-input"
                  />
                  <label for="remember" class="form-check-label">
                    Lembrar-me
                  </label>
                </div>

                <!-- Mensagem de Erro -->
                <div v-if="errorMessage" class="alert alert-danger fade-in">
                  <i class="bi bi-exclamation-circle"></i> {{ errorMessage }}
                </div>

                <!-- Botão Entrar -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="btn btn-primary w-100 btn-lg mb-3"
                >
                  <span v-if="loading">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Entrando...
                  </span>
                  <span v-else>Entrar</span>
                </button>

                <!-- Link Esqueci Senha -->
                <div class="text-center mb-3">
                  <a href="#" class="text-muted small">Esqueceu sua senha?</a>
                </div>

                <!-- Divider -->
                <div class="divider">
                  <span>ou</span>
                </div>

                <!-- Link Cadastro -->
                <div class="text-center">
                  <p class="mb-2">Ainda não tem uma conta?</p>
                  <router-link to="/cadastro" class="btn btn-outline w-100">
                    Criar Conta
                  </router-link>
                </div>
              </form>
            </div>
          </div>

          <!-- Info adicional -->
          <div class="login-info text-center mt-4">
            <p class="text-muted small">
              <i class="bi bi-shield-check text-gold"></i>
              Suas informações estão seguras conosco
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useCartStore } from '../store/cart'

export default {
  name: 'Login',
  
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    const cartStore = useCartStore()

    const loading = ref(false)
    const errorMessage = ref('')
    const showPassword = ref(false)

    const formData = reactive({
      email: '',
      password: '',
      remember: false
    })

    // Methods
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const handleLogin = async () => {
      loading.value = true
      errorMessage.value = ''

      const result = await authStore.login(formData.email, formData.password)

      if (result.success) {
        // Carrega carrinho do usuário
        await cartStore.loadCart()

        // Redireciona para página anterior ou home
        const redirect = route.query.redirect || '/'
        router.push(redirect)
      } else {
        errorMessage.value = result.error
      }

      loading.value = false
    }

    return {
      formData,
      loading,
      errorMessage,
      showPassword,
      togglePassword,
      handleLogin
    }
  }
}
</script>

<style scoped>
.login-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-beige) 0%, var(--color-white) 100%);
}

.login-card {
  box-shadow: var(--shadow-lg);
  border: none;
}

.login-title {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 2rem;
  color: var(--color-secondary);
}

.password-input-wrapper {
  position: relative;
}

.btn-toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0.5rem;
}

.btn-toggle-password:hover {
  color: var(--color-primary);
}

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--color-border);
}

.divider span {
  padding: 0 1rem;
  color: var(--color-text-light);
  font-size: 0.9rem;
}

.login-info {
  animation: fadeIn 1s ease;
}

/* Responsividade */
@media (max-width: 576px) {
  .card-body {
    padding: 2rem !important;
  }

  .login-title {
    font-size: 1.75rem;
  }
}
</style>
