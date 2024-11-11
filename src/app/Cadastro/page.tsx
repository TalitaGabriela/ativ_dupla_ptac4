"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';
import Navbar from '../components/Navbar';
import styles from "../styles/autenticacao.module.css"

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usuario, setUsuario] = useState<Usuario>({ nome: '', email: '', password: '', tipo: "cliente" })
  const router = useRouter();

  const alterarNome = (novoNome: string) => {
    setUsuario(
      (usuarioAnterior) => ({
        ...usuarioAnterior,
        nome: novoNome
      })
    )
  }

  const alterarEmail = (novoEmail: string) => {
    setUsuario(
      (usuarioAnterior) => ({
        ...usuarioAnterior,
        email: novoEmail
      })
    )
  }

  const alterarSenha = (novoSenha: string) => {
    setUsuario(
      (usuarioAnterior) => ({
        ...usuarioAnterior,
        password: novoSenha
      })
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulação de verificação de login
    if (nome === 'Joao Pedro' && email === 'joao.canezin22@gmail.com' && password === 'password') {
      router.push('/');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className={styles.body}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.containerCadasLog}>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label htmlFor="nome" className={styles.EmailSenha}>Nome:</label>
                <input
                  type="nome"
                  id="nome"
                  value={usuario.nome}
                  onChange={(e) => alterarNome(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div>
                <label htmlFor="email" className={styles.EmailSenha}>Email:</label>
                <input
                  type="email"
                  id="email"
                  value={usuario.email}
                  onChange={(e) => alterarEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div>
                <label htmlFor="password" className={styles.EmailSenha}>Senha:</label>
                <input
                  type="password"
                  id="password"
                  value={usuario.password}
                  onChange={(e) => alterarSenha(e.target.value)}
                  required

                  className={styles.input}
                />
              </div>
              <button type="submit" className={styles.button}>Cadastrar</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className={styles.possuiConta}>
              <p>Já possui uma conta?</p>
              <a href="/Login" className={styles.rotaCadastro}>Acessar conta</a>
            </div>
          </div >
        </div>
      </div >

    </div>

  );
}