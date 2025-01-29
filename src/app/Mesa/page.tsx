'use client'
import PerfilMesa from "../interfaces/mesa"
import ResponseSignin from "../interfaces/response";
import { useState } from "react"
import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies";
import { ApiURL } from "../config";


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
            <div>
                <h2>Cadastrar Mesa</h2>
                <form onSubmit={onSubmit}>
                    <a href="#" onClick={() => router.push('/')}></a>

                    <div>
                        <label htmlFor="codigo">Codigo Mesa</label>
                        <input type="text"
                            id="codigo"
                            value={mesa.codigo}
                            onChange={(e) => alterarCodigo(e.target.value)}
                            required
                            min={4} />
                    </div>

                    <div>
                        <label htmlFor="lugares">Número de Lugares</label>
                        <input type="number"
                            id="lugares"
                            value={mesa.n_lugares}
                            onChange={(e) => alterarLugares(e.target.value)}
                            required
                            min={1} />
                    </div>

                    {error && (
                        <div>
                            <p>{error}</p>
                        </div>
                    )}

                    <div>
                        <button type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

