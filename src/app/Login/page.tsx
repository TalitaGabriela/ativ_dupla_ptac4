"use client"
import Link from "next/link";
import styles from "../styles/autenticacao.module.css"
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
        <div className={styles.body}>
            <Navbar />
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.containerCadasLog}>
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div>
                                <label htmlFor="email" className={styles.EmailSenha}>Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <div>
                                <label htmlFor="senha" className={styles.EmailSenha}>Senha:</label>
                                <input
                                    type="password"
                                    id="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className={styles.input}
                                />
                            </div>
                            <button type="submit" className={styles.button}>Entrar</button>
                        </form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <a href="/Cadastro" className={styles.rotaCadastro}>Cadastra-se</a>
                    </div >
                </div >
            </div>
        </div>

    );
}