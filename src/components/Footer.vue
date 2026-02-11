<template>
  <!-- Rodapé elegante com informações institucionais -->
  <footer class="footer bg-dark text-light">
    <div class="container py-5">
      <div class="row">
        <!-- Sobre a Aurora Joias -->
        <div class="col-lg-4 col-md-6 mb-4">
          <h4 class="footer-title mb-3">
            <span class="text-gold">✦</span> Aurora Joias
          </h4>
          <p class="footer-text">
            Elegância e sofisticação em cada peça. Há mais de 20 anos criando 
            joias exclusivas que celebram os momentos mais especiais da sua vida.
          </p>
          <div class="social-links mt-3">
            <a href="#" class="social-link" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="social-link" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="social-link" aria-label="Pinterest">
              <i class="bi bi-pinterest"></i>
            </a>
            <a href="#" class="social-link" aria-label="WhatsApp">
              <i class="bi bi-whatsapp"></i>
            </a>
          </div>
        </div>

        <!-- Links Rápidos -->
        <div class="col-lg-2 col-md-6 mb-4">
          <h5 class="footer-title mb-3">Institucional</h5>
          <ul class="footer-links">
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Nossa História</a></li>
            <li><a href="#">Certificações</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Trabalhe Conosco</a></li>
          </ul>
        </div>

        <!-- Atendimento -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="footer-title mb-3">Atendimento</h5>
          <ul class="footer-links">
            <li><a href="#">Central de Ajuda</a></li>
            <li><a href="#">Política de Troca</a></li>
            <li><a href="#">Garantia</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos de Uso</a></li>
          </ul>
        </div>

        <!-- Contato -->
        <div class="col-lg-3 col-md-6 mb-4">
          <h5 class="footer-title mb-3">Contato</h5>
          <ul class="footer-contact">
            <li>
              <i class="bi bi-telephone"></i>
              <span>(11) 3456-7890</span>
            </li>
            <li>
              <i class="bi bi-whatsapp"></i>
              <span>(11) 98765-4321</span>
            </li>
            <li>
              <i class="bi bi-envelope"></i>
              <span>contato@aurorajoias.com.br</span>
            </li>
            <li>
              <i class="bi bi-geo-alt"></i>
              <span>Av. Paulista, 1000<br>São Paulo - SP</span>
            </li>
          </ul>
          
          <!-- Selos de Segurança -->
          <div class="security-badges mt-3">
            <div class="badge-item">
              <i class="bi bi-shield-check text-gold"></i>
              <small>Compra Segura</small>
            </div>
            <div class="badge-item">
              <i class="bi bi-lock text-gold"></i>
              <small>SSL</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <hr class="footer-divider">

      <!-- Copyright e Formas de Pagamento -->
      <div class="row align-items-center">
        <div class="col-md-6 mb-3 mb-md-0">
          <p class="footer-copyright mb-0">
            © {{ currentYear }} Aurora Joias. Todos os direitos reservados.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <div class="payment-methods">
            <span class="payment-label">Formas de pagamento:</span>
            <i class="bi bi-credit-card"></i>
            <i class="bi bi-credit-card-2-front"></i>
            <span class="payment-text">PIX</span>
            <i class="bi bi-bank"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    
    return {
      currentYear
    }
  }
}
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%);
  color: #cccccc;
  margin-top: auto;
}

.footer-title {
  font-family: var(--font-heading);
  color: var(--color-white);
  font-weight: 600;
  font-size: 1.1rem;
}

.footer-text {
  color: #999999;
  line-height: 1.8;
  font-size: 0.9rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(201, 169, 97, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-3px);
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: #999999;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
}

.footer-links a:hover {
  color: var(--color-primary);
  padding-left: 5px;
}

.footer-contact {
  list-style: none;
  padding: 0;
}

.footer-contact li {
  display: flex;
  align-items: start;
  margin-bottom: 1rem;
  color: #999999;
  font-size: 0.9rem;
}

.footer-contact i {
  color: var(--color-primary);
  margin-right: 0.75rem;
  font-size: 1.1rem;
  margin-top: 2px;
}

.security-badges {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.badge-item i {
  font-size: 1.5rem;
}

.badge-item small {
  color: #999999;
  font-size: 0.75rem;
}

.footer-divider {
  border-color: rgba(255, 255, 255, 0.1);
  margin: 2rem 0;
}

.footer-copyright {
  color: #999999;
  font-size: 0.9rem;
}

.payment-methods {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #999999;
}

.payment-label {
  font-size: 0.85rem;
}

.payment-methods i {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.payment-text {
  font-weight: 600;
  color: var(--color-primary);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .payment-methods {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .footer-copyright {
    text-align: center;
  }
}
</style>
