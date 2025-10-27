# V.O.C.E API Backend

API backend Node.js/Express conectada ao banco MySQL para o sistema de monitoramento V.O.C.E.

## 🚀 Instalação

```bash
cd server
npm install
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente no arquivo `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=v_o_c_e
DB_PORT=3306
JWT_SECRET=sua-chave-secreta-aqui
PORT=3000
```

## 🏃 Executar

### Modo desenvolvimento (com hot reload):
```bash
npm run dev
```

### Modo produção:
```bash
npm run build
npm start
```

## 📡 Endpoints da API

### Autenticação

- `POST /api/auth/login` - Login de professor
  ```json
  {
    "username": "prof.exemplo",
    "password": "senha123"
  }
  ```

- `POST /api/auth/register` - Registro de novo professor
  ```json
  {
    "full_name": "Professor Exemplo",
    "username": "prof.exemplo",
    "email": "exemplo@email.com",
    "password": "senha123"
  }
  ```

### Dashboard

- `GET /api/dashboard/stats` - Estatísticas do dashboard (requer autenticação)

### Logs

- `GET /api/logs/recent?limit=10` - Acessos recentes (requer autenticação)
- `GET /api/logs?startDate=2025-01-01&endDate=2025-12-31&category=IA` - Logs filtrados (requer autenticação)

### Estudantes

- `GET /api/students` - Listar todos os estudantes
- `GET /api/students/:id` - Buscar estudante por ID
- `POST /api/students` - Criar novo estudante
- `PUT /api/students/:id` - Atualizar estudante
- `DELETE /api/students/:id` - Deletar estudante

### Turmas

- `GET /api/classes` - Listar todas as turmas
- `GET /api/classes/:id` - Buscar turma por ID
- `POST /api/classes` - Criar nova turma
- `PUT /api/classes/:id` - Atualizar turma
- `DELETE /api/classes/:id` - Deletar turma
- `POST /api/classes/:id/students/:studentId` - Adicionar estudante à turma
- `DELETE /api/classes/:id/students/:studentId` - Remover estudante da turma

### Analytics

- `GET /api/analytics/categories` - Breakdown por categoria
- `GET /api/analytics/by-hour` - Atividade por hora do dia
- `GET /api/analytics/by-weekday` - Atividade por dia da semana
- `GET /api/analytics/top-sites?limit=10` - Top sites mais acessados

## 🔒 Autenticação

Todos os endpoints (exceto login e registro) requerem autenticação via JWT token.

Inclua o token no header:
```
Authorization: Bearer seu_token_aqui
```

## 📊 Estrutura do Banco

O sistema usa o banco `v_o_c_e` com as seguintes tabelas:
- `professors` - Professores do sistema
- `students` - Estudantes
- `classes` - Turmas
- `class_members` - Professores nas turmas
- `class_students` - Estudantes nas turmas
- `logs` - Logs de acesso
- `category_overrides` - Sobrescritas de categoria
- `password_resets` - Tokens de reset de senha
- `old_logs` - Logs arquivados

## 🛠️ Tecnologias

- Node.js + TypeScript
- Express.js
- MySQL2 (com promises)
- JWT para autenticação
- Bcrypt para hash de senhas
- CORS habilitado
