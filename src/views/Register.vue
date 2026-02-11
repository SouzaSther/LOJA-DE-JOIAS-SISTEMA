<template>
  <div class="register-page">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="register-card card">
            <div class="card-body p-5">
              <!-- Logo/Título -->
              <div class="text-center mb-4">
                <h2 class="register-title mb-2">
                  <span class="text-gold">✦</span> Aurora Joias
                </h2>
                <p class="text-muted">Crie sua conta e comece a comprar</p>
              </div>

              <!-- Formulário -->
              <form @submit.prevent="handleRegister">
                <div class="row">
                  <!-- Nome Completo -->
                  <div class="col-12 mb-3">
                    <label for="name" class="form-label">Nome Completo *</label>
                    <input
                      type="text"
                      id="name"
                      v-model="formData.name"
                      class="form-control"
                      placeholder="João da Silva"
                      required
                    />
                  </div>

                  <!-- Email -->
                  <div class="col-12 mb-3">
                    <label for="email" class="form-label">E-mail *</label>
                    <input
                      type="email"
                      id="email"
                      v-model="formData.email"
                      class="form-control"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <!-- Telefone -->
                  <div class="col-12 mb-3">
                    <label for="phone" class="form-label">Telefone (opcional)</label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="formData.phone"
                      class="form-control"
                      placeholder="(11) 98765-4321"
                    />
                  </div>

                  <!-- Senha -->
                  <div class="col-md-6 mb-3">
                    <label for="password" class="form-label">Senha *</label>
                    <div class="password-input-wrapper">
                      <input
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        v-model="formData.password"
                        class="form-control"
                        placeholder="Senha"
                        required
                        minlength="6"
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

                  <!-- Confirmar Senha -->
                  <div class="col-md-6 mb-3">
                    <label for="confirmPassword" class="form-label">Confirmar Senha *</label>
                    <div class="password-input-wrapper">
                      <input
                        :type="showConfirmPassword ? 'text' : 'password'"
                        id="confirmPassword"
                        v-model="formData.confirmPassword"
                        class="form-control"
                        placeholder="Repita a senha"
                        required
                      />
                      <button
                        type="button"
                        @click="toggleConfirmPassword"
                        class="btn-toggle-password"
                      >
                        <i :class="showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Aceitar Termos -->
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    id="terms"
                    v-model="formData.acceptTerms"
                    class="form-check-input"
                    required
                  />
                  <label for="terms" class="form-check-label small">
                    Aceito os <a href="#">Termos de Uso</a> e a 
                    <a href="#">Política de Privacidade</a>
                  </label>
                </div>

                <!-- Newsletter -->
                <div class="mb-4 form-check">
                  <input
                    type="checkbox"
                    id="newsletter"
                    v-model="formData.newsletter"
                    class="form-check-input"
                  />
                  <label for="newsletter" class="form-check-label small">
                    Quero receber novidades e promoções exclusivas por e-mail
                  </label>
                </div>

                <!-- Mensagem de Erro -->
                <div v-if="errorMessage" class="alert alert-danger fade-in">
                  <i class="bi bi-exclamation-circle"></i> {{ errorMessage }}
                </div>

                <!-- Botão Cadastrar -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="btn btn-primary w-100 btn-lg mb-3"
                >
                  <span v-if="loading">
                    <span class="spinner-border spinner-border-sm me-2"></span>
                    Criando conta...
                  </span>
                  <span v-else>Criar Conta</span>
                </button>

                <!-- Divider -->
                <div class="divider">
                  <span>ou</span>
                </div>

                <!-- Link Login -->
                <div class="text-center">
                  <p class="mb-2">Já tem uma conta?</p>
                  <router-link to="/login" class="btn btn-outline w-100">
                    Fazer Login
                  </router-link>
                </div>
              </form>
            </div>
          </div>

          <!-- Info adicional -->
          <div class="register-info text-center mt-4">
            <div class="row text-muted small">
              <div class="col-md-4 mb-2">
                <i class="bi bi-shield-check text-gold"></i>
                <div>Dados Seguros</div>
              </div>
              <div class="col-md-4 mb-2">
                <i class="bi bi-truck text-gold"></i>
                <div>Frete Grátis</div>
              </div>
              <div class="col-md-4 mb-2">
                <i class="bi bi-arrow-repeat text-gold"></i>
                <div>Troca Fácil</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useCartStore } from '../store/cart'

export default {
  name: 'Register',
  
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const cartStore = useCartStore()

    const loading = ref(false)
    const errorMessage = ref('')
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)

    const formData = reactive({
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
      newsletter: true
    })

    // Methods
    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const toggleConfirmPassword = () => {
      showConfirmPassword.value = !showConfirmPassword.value
    }

    const handleRegister = async () => {
      loading.value = true
      errorMessage.value = ''

      // Validações
      if (formData.password !== formData.confirmPassword) {
        errorMessage.value = 'As senhas não coincidem'
        loading.value = false
        return
      }

      if (formData.password.length < 6) {
        errorMessage.value = 'A senha deve ter no mínimo 6 caracteres'
        loading.value = false
        return
      }

      if (!formData.acceptTerms) {
        errorMessage.value = 'Você deve aceitar os termos de uso'
        loading.value = false
        return
      }

      // Tenta registrar
      const result = await authStore.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })

      if (result.success) {
        // Carrega carrinho do usuário
        await cartStore.loadCart()

        // Redireciona para home
        router.push('/')
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
      showConfirmPassword,
      togglePassword,
      toggleConfirmPassword,
      handleRegister
    }
  }
}
</script>

<style scoped>
.register-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-beige) 0%, var(--color-white) 100%);
  padding: 2rem 0;
}

.register-card {
  box-shadow: var(--shadow-lg);
  border: none;
}

.register-title {
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

.form-check-label a {
  color: var(--color-primary);
  text-decoration: underline;
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

.register-info {
  animation: fadeIn 1s ease;
}

.register-info i {
  font-size: 1.5rem;
  display: block;
  margin-bottom: 0.5rem;
}

/* Responsividade */
@media (max-width: 576px) {
  .card-body {
    padding: 2rem !important;
  }

  .register-title {
    font-size: 1.75rem;
  }
}
</style>
