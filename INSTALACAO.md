# 📦 Instalação - Aurora Joias

## Opção 1: Extrair do Arquivo Compactado

### 1. Baixar o Projeto
- Baixe o arquivo `aurora-joias-projeto.tar.gz` do AI Drive

### 2. Extrair
```bash
# Linux/Mac
tar -xzf aurora-joias-projeto.tar.gz
cd aurora-joias

# Windows (use 7-Zip ou WinRAR)
# Clique com botão direito > Extrair aqui
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Executar
```bash
npm run serve
# ou
npm run dev
```

### 5. Acessar
```
http://localhost:3000
```

## Opção 2: Criar do Zero (se necessário)

### Pré-requisitos
- Node.js 16+ (recomendado 18+)
- npm 7+

### Passo a Passo

1. **Criar Diretório**
```bash
mkdir aurora-joias
cd aurora-joias
```

2. **Inicializar Projeto**
```bash
npm init -y
```

3. **Instalar Dependências**
```bash
# Dependências principais
npm install vue@3.3.4 vue-router@4.2.4 pinia@2.1.6 axios@1.5.0 bootstrap@5.3.1 @popperjs/core@2.11.8

# Dependências de desenvolvimento
npm install -D @vitejs/plugin-vue@4.3.4 vite@4.4.9
```

4. **Copiar Arquivos do Projeto**
- Copie todos os arquivos da pasta extraída

5. **Executar**
```bash
npm run serve
```

## 🔧 Configuração

### package.json
Certifique-se de que está assim:
```json
{
  "name": "aurora-joias",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "serve": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### vite.config.js
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true
  }
})
```

## 🐛 Solução de Problemas

### Erro: "Cannot find module 'vue'"
```bash
npm install
```

### Erro: "Port 3000 is already in use"
- O Vite tentará usar outra porta automaticamente
- Ou feche o processo na porta 3000

### Erro: "npm: command not found"
- Instale o Node.js: https://nodejs.org/

### Página em branco após instalar
```bash
# Limpe o cache e reinstale
rm -rf node_modules package-lock.json
npm install
npm run serve
```

## 📱 Verificação da Instalação

### Checklist
- [ ] Node.js instalado (`node --version`)
- [ ] npm instalado (`npm --version`)
- [ ] Dependências instaladas (`ls node_modules`)
- [ ] Servidor rodando (`npm run serve`)
- [ ] Página abrindo (http://localhost:3000)
- [ ] Sem erros no console do navegador

### Console do Navegador
Deve aparecer:
```
 Aurora Joias ✦
E-commerce de Joias - Versão 1.0.0
```

## 🎯 Próximos Passos

1. ✅ **Explorar a Aplicação**
   - Navegue pelas páginas
   - Teste as funcionalidades

2. ✅ **Criar uma Conta**
   - Acesse /cadastro
   - Preencha os dados

3. ✅ **Adicionar Produtos**
   - Navegue pelo catálogo
   - Adicione itens ao carrinho

4. ✅ **Finalizar Compra**
   - Revise o carrinho
   - Complete o checkout

## 📚 Documentação

- **README.md**: Documentação completa
- **GUIA_RAPIDO.md**: Guia de uso rápido
- **Código**: Comentários em português

## 🌐 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Sistemas Operacionais
- ✅ Windows 10/11
- ✅ macOS 10.15+
- ✅ Linux (Ubuntu, Debian, etc.)

## 📞 Suporte

### Problemas Comuns
1. **Erro de dependências**: Execute `npm install`
2. **Porta ocupada**: Feche processos na porta 3000
3. **Erro de build**: Limpe node_modules e reinstale
4. **Página não carrega**: Verifique se o servidor está rodando

### Logs
```bash
# Ver logs do servidor
cat server.log

# Ver processos rodando
ps aux | grep vite
```

## ✨ Recursos Adicionais

### VS Code Extensions (Recomendadas)
- Volar (Vue 3)
- ESLint
- Prettier
- Auto Rename Tag

### Dicas
- Use `npm run build` para criar build de produção
- Use `npm run preview` para testar a build
- Mantenha o Node.js atualizado

---

**Instalação concluída! Boas compras na Aurora Joias! ✦**
