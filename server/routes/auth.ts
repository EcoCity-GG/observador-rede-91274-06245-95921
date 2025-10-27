import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../database';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const professors = await db.query(
      'SELECT * FROM professors WHERE username = ? OR email = ?',
      [username, username]
    );

    if (professors.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const professor = professors[0];
    const validPassword = await bcrypt.compare(password, professor.password_hash);

    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: professor.id, username: professor.username, email: professor.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: professor.id,
        full_name: professor.full_name,
        username: professor.username,
        email: professor.email
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Registro
router.post('/register', async (req, res) => {
  try {
    const { full_name, username, email, password } = req.body;

    // Verificar se usuário já existe
    const existing = await db.query(
      'SELECT * FROM professors WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Usuário ou email já cadastrado' });
    }

    // Hash da senha
    const password_hash = await bcrypt.hash(password, 10);

    // Inserir novo professor
    const result = await db.query(
      'INSERT INTO professors (full_name, username, email, password_hash) VALUES (?, ?, ?, ?)',
      [full_name, username, email, password_hash]
    );

    const token = jwt.sign(
      { id: result.insertId, username, email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: result.insertId,
        full_name,
        username,
        email
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao criar conta' });
  }
});

// Middleware de autenticação
export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Obter perfil do usuário autenticado
router.get('/profile', authenticateToken, async (req: any, res) => {
  try {
    const professors = await db.query(
      'SELECT id, full_name, username, email FROM professors WHERE id = ?',
      [req.user.id]
    );

    if (professors.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(professors[0]);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

export default router;
