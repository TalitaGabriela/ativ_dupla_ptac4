'use client'

import styles from "../../styles/listaMesa.module.css"
import { FormEvent, useActionState, useState } from "react"
import Mesa from "../../interfaces/mesa"
import { FecthReserva } from "../../functions/reserva"
import { FecthNovaReserva } from "../../functions/reserva"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import PerfilMesa from "../../interfaces/mesa"



type ListMesasReservaProp = {
    mesas: Mesa[]
}
export function ListMesasReserva({ mesas }: ListMesasReservaProp) {
    const [data, setData] = useState('')
    const [reservas, setReservas] = useState<PerfilMesa[] | null>(null)
    const [carregaReservas, setCarregaReservas] = useState(false)
    const [selectMesa, setSelectMesa] = useState<Mesa | null>(null)
    const [response, setResponse] = useState({ error: false, mensagem: '' })
    const router = useRouter()

    async function handleFecthData() {
        const response = await FecthReserva(data)
        setCarregaReservas(false)
        console.log(response)
        setReservas(response)

    }

    async function handleFormSubmit(e: FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const mesaId = parseInt(formData.get('mesaId') as string)
        const n_pessoas = parseInt(formData.get('n_pessoas') as string)

        const response = await FecthNovaReserva(mesaId, n_pessoas, data)
        setResponse(response)
        console.log(response)
        if (!response.error) {
            router.push('/Reserva/novo')
        }
    }

    return (
        <div>
            <Navbar />
            <div className={styles.container}>

                <div className={styles.reservaContainer}>
                    <h2 className={styles.title}>Fazer Reserva</h2>
                    <div className={styles.inputGroup}>
                        <input type="date"
                            className={styles.input}
                            value={data}
                            onChange={e => setData(e.target.value)} />
                        <button className={styles.button} type="button" onClick={handleFecthData}>Buscar</button>
                    </div>

                    <div className={styles.listaMesas}>
                        {reservas?.map(mesa => {
                            return (
                                <button className={styles.mesaButton} onClick={() => setSelectMesa(mesa)} key={mesa.id}>{mesa.codigo}</button>
                            )
                        })
                        }
                    </div>
                </div>

                {selectMesa && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h3>Confirmar Reserva:</h3>
                            <form onSubmit={handleFormSubmit} className={styles.form}>
                                <label>
                                    Data:
                                    <input type="date"
                                        defaultValue={data}
                                        readOnly
                                        max={selectMesa.id}
                                        name="data"
                                        className={styles.input} />
                                </label>

                                <input type="number"
                                    hidden
                                    readOnly
                                    defaultValue={selectMesa.id}
                                    name="mesaId"
                                />

                                <label>
                                    Número de Pessoas:
                                    <input type="number"
                                        max={selectMesa.n_lugares}
                                        min={1}
                                        name="n_pessoas"
                                        className={styles.input} />
                                </label>
                                {response.error && <p className={styles.error}>{response.mensagem}</p>}
                                <div className={styles.buttonGroup}>
                                    <button className={styles.buttonC} type="button" onClick={() => setSelectMesa(null)}>Cancelar</button>
                                    <button className={styles.button} type="submit">Confirmar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}