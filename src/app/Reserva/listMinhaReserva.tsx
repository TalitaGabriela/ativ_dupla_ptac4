'use client'

import { useActionState, useState } from "react"
import Reserva from "../interfaces/reservas"
import { FecthAtualizaReserva, FecthCancelarReserva } from "../functions/reserva"
import styles from "../styles/listaReser.module.css"
import Navbar from "../components/Navbar"


type ListMesasReservaProps = {
    reservas: Reserva[]
}
export default function ListMesasReserva({ reservas }: ListMesasReservaProps) {
    const [reserva, setReserva] = useState<Reserva | null>(null)
    const [cancelarReserva, setCancelarReserva] = useState<Reserva | null>(null)
    const [state, action, isPading] = useActionState(FecthAtualizaReserva, { error: false, mensagem: '' })


    function openModal(reserva: Reserva) {
        state.error = false,
            state.mensagem = ''
        setReserva(reserva)
    }

    async function handleCancelReserva() {
        const response = await FecthCancelarReserva(cancelarReserva?.id as number)
        console.log(response)
    }

    return (
        <div>
            <Navbar />
            <div className={styles.container}>

                <div className={styles.reservasContainer}>
                    <h2 className={styles.title}>Suas Reservas:</h2>
                    {!reservas || reservas.length === 0 ? (
                        <p className={styles.noReserva}>Você fez reservas</p>
                    ) :
                        (
                            <div className={styles.listaReservas}>
                                {
                                    reservas.map(reserva => {
                                        return (
                                            <div key={reserva.id} className={`${styles.reservaCard} ${!reserva.status ? styles.cancelled : ''}`}>
                                                <p><strong>Mesa:</strong> {reserva.mesa?.codigo}</p>
                                                <p><strong>Data:</strong> {reserva.data}</p>
                                                <p><strong>Pessoas:</strong> {reserva.n_pessoas}</p>

                                                {reserva.status ? (
                                                    <div className={styles.buttonGroup}>
                                                        <button className={styles.button} onClick={() => openModal(reserva)}>
                                                            Alterar
                                                        </button>
                                                        <button className={`${styles.button} ${styles.cancelButton}`} onClick={() => setCancelarReserva(reserva)}>
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <p className={styles.cancelado}>Reserva Cancelada</p>
                                                )}
                                            </div>
                                        )
                                    })}
                            </div>
                        )}
                </div>

                {
                    reserva && !state.mensagem && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <h3>Confirmar Reserva:</h3>
                                <form action={action} className={styles.form}>
                                    <label>
                                        Data:
                                        <input type="date"
                                            defaultValue={reserva.data}
                                            className={styles.input}
                                            readOnly
                                            name="data" />
                                    </label>

                                    <input type="number"
                                        hidden
                                        readOnly
                                        defaultValue={reserva.id}
                                        name="reservaId" />

                                    <label>
                                        Mesa Selecionada:
                                        <input type="number"
                                            defaultValue={reserva.mesa?.codigo}
                                            name="codigo"
                                            className={styles.input} />
                                    </label>

                                    <label>
                                        Número de Pessoas:
                                        <input type="number"
                                            max={reserva.mesa?.n_lugares}
                                            defaultValue={reserva.n_pessoas}
                                            min={1}
                                            name="n_pessoas"
                                            className={styles.input} />
                                    </label>

                                    {state.error && <p className={styles.error}>{state.mensagem}</p>}
                                    <div>
                                        <button className={styles.button} type="button" onClick={() => setReserva(null)}>Cancelar</button>
                                        <button className={styles.button} type="submit">Confirmar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )
                }
                {
                    cancelarReserva && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <h3>Confirmar cancelamento Reserva:</h3>
                                <p>Realmente deseja cancelar?</p>


                                <div className={styles.buttonGroup}>
                                    <button className={styles.button} type="button" onClick={() => setReserva(null)}>Não</button>
                                    <button className={`${styles.button} ${styles.cancelButton}`} type="button" onClick={handleCancelReserva}>Sim, Cancelar</button>
                                </div>

                            </div>
                        </div>
                    )
                }

            </div >
        </div>
    )
}