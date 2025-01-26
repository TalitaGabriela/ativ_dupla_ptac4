"use client"
import styles from "../styles/autenticacao.module.css"
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiURL } from "../config";
import { setCookie,  parseCookies } from "nookies";
import Navbar from "../components/Navbar";

interface ResponseSignin {
    erro: boolean,
    mensagem: string,
    token?: string
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter();

    useEffect(() => {
        const { 'restaurant-token': token } = parseCookies()
        if (token) {
            router.push('/')
        }
    }, [router])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${ApiURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })

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
                    router.push('/')
                }
            } else {
                setError("Resposta não encontrada")
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

                        {/* Email */}
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
                                <label htmlFor="password" className={styles.EmailSenha}>Senha:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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