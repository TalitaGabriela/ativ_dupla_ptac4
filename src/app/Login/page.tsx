"use client"
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Usuario from "../interfaces/usuario";
import { ApiURL } from "../config";
import { stringify } from "querystring";
import { setCookie } from "nookies";
import { parseCookies } from 'nookies';
import Navbar from "../components/Navbar";

export default function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [error, setError] = useState('')
    const router = useRouter();

    interface ResponseSignin {
        erro: boolean,
        mensagem: string,
        token?: string
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${ApiURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'aplication/json'
                },
                body: JSON.stringify({ email, senha })
            })
            if (response) {
                const data: ResponseSignin = await response.json()
                const { erro, mensagem, token = '' } = data
                console.log(data)
                if (erro) {
                    setError(mensagem)
                } else {
                    setCookie(undefined, 'restaurant-token', token, {
                        maxAge: 60 * 60 * 1 // 1 hora
                    })
                }
            } else {

            }
        } catch (error) {
            console.error("Erro de requisição", error)
        }
    }


    return (
        <div>
            <Navbar />
            <div style={styles.container}>
                <div style={styles.cadastro}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} style={styles.form}>
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
        </div>

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