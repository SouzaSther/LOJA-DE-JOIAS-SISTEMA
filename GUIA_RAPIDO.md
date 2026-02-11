# 🚀 Guia Rápido - Aurora Joias

## Início Rápido

### 1. Iniciar o Projeto
```bash
cd /home/user/aurora-joias
npm run serve
```

### 2. Acessar
```
http://localhost:3000
```

## 📝 Credenciais de Teste

O sistema usa localStorage, então você precisa criar uma conta primeiro.

### Criar Conta de Teste:
1. Acesse: http://localhost:3000/cadastro
2. Preencha:
   - Nome: João Silva
   - Email: joao@teste.com
   - Senha: 123456
3. Faça login

## 🎯 Fluxo de Teste Completo

### 1. Explorar sem Login
- ✅ Visualizar página inicial
- ✅ Ver catálogo de produtos
- ✅ Ver detalhes de um produto
- ❌ Adicionar ao carrinho (requer login)

### 2. Criar Conta
```
Rota: /cadastro
- Nome completo
- Email
- Telefone (opcional)
- Senha (mín. 6 caracteres)
```

### 3. Fazer Login
```
Rota: /login
- Email cadastrado
- Senha
```

### 4. Adicionar Produtos ao Carrinho
```
Rota: /produto/:id
- Ver detalhes
- Clicar em "Adicionar ao Carrinho"
```

### 5. Finalizar Compra
```
Rota: /carrinho
- Revisar itens
- Ajustar quantidades
- Ver cálculo de frete
- Clicar em "Finalizar Compra"
```

### 6. Ver Pedidos
```
Rota: /perfil
- Aba "Meus Pedidos"
- Histórico completo
```

## 🎨 Testando Funcionalidades

### Filtros de Categoria
```
Rota: /catalogo
- Clique nas categorias
- Todos / Anéis / Brincos / Colares / etc.
```

### Galeria de Imagens
```
Rota: /produto/:id
- Clique nas miniaturas
- Navegue pelas imagens
```

### Controle de Quantidade
```
Rota: /carrinho
- Botões + e -
- Remove item
```

### Responsividade
- Redimensione a janela
- Menu hamburguer em mobile
- Layout adaptativo

## 🔧 Estrutura de Dados

### Produtos Disponíveis (12 no total)
1. Colar de Pérolas Aurora - R$ 1.299,90
2. Anel Solitário Diamante - R$ 8.999,00
3. Brincos de Esmeralda - R$ 3.499,90
4. Pulseira Riviera Deluxe - R$ 5.799,00
5. Colar Corrente Veneziana - R$ 899,90
6. Anel Trilogy Safira - R$ 4.299,00
7. Brincos Argola Clássica - R$ 649,90
8. Pulseira Cartier Love - R$ 3.899,00 (Esgotada)
9. Pingente Coração Rubi - R$ 1.899,00
10. Aliança Casamento Ouro - R$ 1.599,00
11. Colar Gargantilha Luxo - R$ 2.299,00
12. Anel Aparador Deluxe - R$ 2.799,00

### Categorias
- Todos
- Anéis
- Brincos
- Colares
- Pulseiras
- Pingentes
- Alianças

## 💡 Dicas de Teste

### Testar Frete Grátis
- Adicione produtos até somar > R$ 500
- Veja o frete ficar grátis no carrinho

### Testar Estoque
- Tente adicionar "Pulseira Cartier Love"
- Está marcada como esgotada

### Testar Persistência
- Faça login
- Adicione produtos
- Feche o navegador
- Abra novamente
- Você ainda estará logado

### Testar Múltiplas Contas
- Abra em janela anônima
- Crie outra conta
- Cada uma tem seu próprio carrinho

## 🐛 Resolução de Problemas

### Servidor não inicia
```bash
cd /home/user/aurora-joias
rm -rf node_modules package-lock.json
npm install
npm run serve
```

### Porta 3000 em uso
```bash
# O Vite tentará usar outra porta automaticamente
# Ou especifique uma porta diferente em vite.config.js
```

### Dados corrompidos
```bash
# Limpe o localStorage no console do navegador:
localStorage.clear()
# Depois recarregue a página
```

### Página em branco
- Abra o console do navegador (F12)
- Verifique erros
- Certifique-se de que o servidor está rodando

## 📱 Teste Responsivo

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 991px
- Desktop: > 991px

### Chrome DevTools
1. Pressione F12
2. Clique no ícone de dispositivo móvel
3. Teste diferentes resoluções

## 🎨 Paleta de Cores

```css
Primária (Dourado): #c9a961
Secundária (Cinza): #2c2c2c
Bege: #f5f1ea
Branco: #ffffff
Texto: #333333
```

## 📊 Performance

### Lighthouse Score Esperado
- Performance: ~90+
- Accessibility: ~85+
- Best Practices: ~90+
- SEO: ~85+

## 🔐 Segurança (Mock)

⚠️ **ATENÇÃO**: Este é um projeto de demonstração!
- Não use em produção
- Senhas armazenadas em texto simples
- Sem validação de backend real
- localStorage pode ser acessado facilmente

## ✨ Features Destacadas

1. **Animações Suaves**: Transições entre páginas
2. **Design Responsivo**: Mobile-first
3. **Imagens de Alta Qualidade**: Unsplash
4. **Tipografia Elegante**: Google Fonts
5. **Componentes Reutilizáveis**: Vue 3 Composition API
6. **Estado Centralizado**: Pinia stores
7. **Roteamento Dinâmico**: Vue Router
8. **Mock API Realista**: Delays e validações

## 📞 Comandos Úteis

```bash
# Iniciar desenvolvimento
npm run serve

# Build para produção
npm run build

# Preview da build
npm run preview

# Verificar processos rodando
ps aux | grep vite

# Parar servidor
pkill -f vite
```

---

**Divirta-se explorando o Aurora Joias! ✦**
