'use client'
import PerfilMesa from "../interfaces/mesa"
import ResponseSignin from "../interfaces/response";
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies";
import { ApiURL } from "../config";
import styles from "../styles/mesa.module.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Mesa() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [mesa, setMesa] = useState<PerfilMesa>({
        codigo: '',
        n_lugares: 0
    });

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const { 'restaurant-token': token } = parseCookies();

        const response = await fetch(`${ApiURL}/mesa/novo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(mesa)
        })
        if (response) {
            const data: ResponseSignin = await response.json()
            const { error, msg } = data;
            console.log(data)

            if (error) {
                setError(msg)
            }
            console.log("Mesa Cadastrada", mesa);
            router.push("/Reserva")
        }
    }

    const alterarCodigo = (novoCodigo: string) => {
        setMesa((mesaAnterior) => ({
            ...mesaAnterior,
            codigo: novoCodigo
        }));
    }

    const alterarLugares = (novoLugares: string) => {
        setMesa((mesaAnterior) => ({
            ...mesaAnterior,
            n_lugares: Number(novoLugares)
        }));
    }


    return (
        <div>
            <Navbar />
            <div className={styles.body}>

                <div className={styles.container}>
                    <h2 className={styles.title}>Cadastrar Mesa</h2>
                    <form onSubmit={onSubmit} className={styles.form}>
                        <a href="#" onClick={() => router.push('/')}></a>

                        <div className={styles.inputGroup}>
                            <label htmlFor="codigo">Mesa:</label>
                            <input type="text"
                                id="codigo"
                                className={styles.input}
                                value={mesa.codigo}
                                onChange={(e) => alterarCodigo(e.target.value)}
                                required
                                min={4} />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="lugares">Número de Lugares</label>
                            <input type="number"
                                id="lugares"
                                className={styles.input}
                                value={mesa.n_lugares}
                                onChange={(e) => alterarLugares(e.target.value)}
                                required
                                min={1} />
                        </div>

                        {error && (
                            <div className={styles.errorMessage}>
                                <p>{error}</p>
                            </div>
                        )}

                        <div>
                            <button className={styles.button} type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );

}

