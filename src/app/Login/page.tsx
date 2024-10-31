"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Usuario from "../interfaces/usuario";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const [error, setError] = useState<string>()
    const [usuarios, setUsuarios] = useState<Usuario[]>([
        {
            id: 1,
            nome: "João Pedro",
            email: "joao.canezin22@gmail.com",
            senha: "senha",
            tipo: "adm"
        },

        {
            id: 1,
            nome: "Brenda Só Fé",
            email: "brendaDoGrau@gmail.com",
            senha: "eunãoseioquecolocar123",
            tipo: "adm"
        }
    ])
    const router = useRouter();
    const onSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault()
        const usuario = usuarios.find((user) => user.email == email && user.senha == senha
        )
        if (usuario) {
            localStorage.setItem('usuario', JSON.stringify(usuario))
            router.push('/home')
        } else {
            setError('Email ou senha inválido')
        }
    }
    useEffect(() => {
        const usuarioLogado = localStorage.getItem('usuario');
        if (usuarioLogado) {
            router.push('/home')
        }
    }, [router])
    return (

        <div style={styles.container}>
            <div style={styles.cadastro}>
                <h1>Login</h1>
                <form onSubmit={onSubmit} style={styles.form}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Cadastrar</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <a href="/Cadastro">Cadastra-se</a>
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