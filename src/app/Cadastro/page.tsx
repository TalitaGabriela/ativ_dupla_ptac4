"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Usuario from '../interfaces/usuario';

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [usuario, setUsuario] = useState<Usuario>({ nome: '', email: '', senha: '', tipo: "cliente" })
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
        senha: novoSenha
      })
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulação de verificação de login
    if (nome === 'Joao Pedro' && email === 'joao.canezin22@gmail.com' && senha === 'senha') {
      router.push('/');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (

    <div style={styles.container}>
      <div style={styles.cadastro}>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input
              type="nome"
              id="nome"
              value={usuario.nome}
              onChange={(e) => alterarNome(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={usuario.email}
              onChange={(e) => alterarEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div>
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={usuario.senha}
              onChange={(e) => alterarSenha(e.target.value)}
              required

              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Cadastrar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div >
    </div >

  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cadastro: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
    textAling: 'center',
  },

  form: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '20px'
  },

  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',


  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
}