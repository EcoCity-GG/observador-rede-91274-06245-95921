import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface User {
  id: string;
  full_name: string;
  username: string;
  email: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      return { success: true, message: 'Login realizado com sucesso' };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    }
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      
      // Atualizar perfil com nome
      await updateProfile(userCredential.user, {
        displayName: data.fullName
      });

      // Salvar dados adicionais no Firestore
      await setDoc(doc(db, "professors", userCredential.user.uid), {
        full_name: data.fullName,
        username: data.username,
        email: data.email,
        createdAt: new Date().toISOString()
      });

      return { success: true, message: 'Conta criada com sucesso' };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao criar conta');
    }
  },

  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { 
        success: true, 
        message: 'Email de recuperação enviado com sucesso' 
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao enviar email');
    }
  },

  async resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<AuthResponse> {
    // Firebase handles password reset via email link
    return { 
      success: true, 
      message: 'Use o link enviado no email para redefinir sua senha' 
    };
  },

  async changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Promise<AuthResponse> {
    // This would require reauthentication in Firebase
    return { 
      success: true, 
      message: 'Para alterar senha, use a opção "Esqueci minha senha"' 
    };
  },

  async getProfile(): Promise<User | null> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return null;

      const docRef = doc(db, "professors", currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: currentUser.uid,
          full_name: data.full_name,
          username: data.username,
          email: currentUser.email || data.email
        };
      }

      // Fallback se não tiver documento no Firestore
      return {
        id: currentUser.uid,
        full_name: currentUser.displayName || '',
        username: currentUser.email?.split('@')[0] || '',
        email: currentUser.email || ''
      };
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      return null;
    }
  },

  async updateProfile(fullName: string): Promise<AuthResponse> {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('Usuário não autenticado');

      await updateProfile(currentUser, {
        displayName: fullName
      });

      await setDoc(doc(db, "professors", currentUser.uid), {
        full_name: fullName
      }, { merge: true });

      return { success: true, message: 'Perfil atualizado com sucesso' };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao atualizar perfil');
    }
  },
};
