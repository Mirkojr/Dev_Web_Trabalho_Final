# 🤝 Guia de Contribuição

Este documento define as diretrizes para contribuição no projeto **Smash or Pass Recipes**.  
O objetivo é manter o código organizado, padronizado e de fácil manutenção.

---

## 📌 Fluxo de Trabalho

1. Crie uma branch a partir da `main`
2. Desenvolva sua funcionalidade
3. Faça commits seguindo o padrão definido
4. Abra um Pull Request (PR)
5. Aguarde revisão antes do merge

---

## 🌿 Padrão de Branches

Utilize nomes descritivos seguindo o formato:

```bash
tipo/nome-da-feature
```

### Exemplos:

```bash
feat/auth-login
feat/create-recipe
fix/erro-criacao-receita
refactor/organizacao-services
```

---

## 🧾 Padrão de Commits

Utilizamos o padrão **Conventional Commits**.

### 📌 Formato

```txt
<tipo>(escopo opcional): descrição
```

---

### ✏️ Exemplos

```bash
feat(auth): implementar login com JWT
fix(recipe): corrigir erro ao salvar receita
docs(readme): atualizar instruções
refactor(user): melhorar estrutura de autenticação
```

## 📚 Tipos de Commits

- feat → nova funcionalidade
- fix → correção de bug
- docs → documentação
- style → alterações visuais (sem lógica)
- refactor → refatoração
- test → testes
- chore → tarefas gerais

---

## 🚫 Evitar

```bash
update code
ajustes
teste
```

## 🔀 Pull Requests (PR)

### 📌 Antes de abrir um PR

- Certifique-se de que o código funciona
- Revise seu próprio código
- Garanta que não há erros básicos

---

### 📌 O PR deve conter

- Descrição clara do que foi feito
- (Se aplicável) como testar a funcionalidade

---

### 📌 Exemplo de PR

```markdown
## O que foi feito

Implementação do endpoint de criação de receitas

## Como testar

Enviar POST para /recipes com os campos obrigatórios

## Observações

Nenhuma
```

---

## 📏 Boas Práticas

- Commits pequenos e frequentes
- Código legível e organizado
- Seguir a arquitetura definida (routes, controllers, services, etc.)
- Não misturar múltiplas funcionalidades no mesmo PR

---

## 🚫 Regras Importantes

- Não commitar diretamente na branch `main`
- Todo código deve passar por revisão
- Evitar commits muito grandes ou genéricos

---

## 📊 Organização da Equipe

- Cada integrante é responsável por suas tarefas
- O progresso deve ser atualizado regularmente
- Dúvidas devem ser discutidas antes de implementar soluções complexas

---

## 📌 Observação Final

Seguir estas diretrizes garante melhor organização do projeto, facilita a colaboração entre os membros da equipe e contribui para uma avaliação mais positiva do trabalho.
