'use client'

import { useActionState, useState } from "react"
import Reserva from "../interfaces/reservas"
import { FecthAtualizaReserva, FecthCancelarReserva } from "../functions/reserva"


type ListMesasReservaProps = {
    reservas: Reserva[]
}
export default function ListMesasReserva({ reservas }: ListMesasReservaProps) {
    const [reserva, setReserva] = useState<Reserva | null>(null)
    const [cancelarReserva, setCancelarReserva] = useState<Reserva | null>(null)
    const [state, action, isPading] = useActionState(FecthAtualizaReserva, { error: false, mensagem: '' })
    const [response, setResponse] = useState({})

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
            <div>
                <h2>Suas Reservas:</h2>
                {reservas.length === 0 ? (
                    <p>Você fez reservas</p>
                ) :
                    (
                        <div>
                            {
                                reservas.map(reserva => {
                                    return (
                                        <div key={reserva.id} style={{ background: `${reserva.status ? '' : 'grey'}` }
                                        }>
                                            <p>Mesa: {reserva.mesa?.codigo}</p>
                                            <p>Data: {reserva.data}</p>
                                            <p>Pessoas: {reserva.n_pessoas} </p>

                                            {reserva.status ? (
                                                <div>
                                                    <button onClick={() => openModal(reserva)}>
                                                        Alterar
                                                    </button>
                                                    <button onClick={() => setCancelarReserva(reserva)}>
                                                        Cancelar
                                                    </button>
                                                </div>):
                                                (
                                                    <p>Reserva Cancelada</p>
                                                )

                                            }
                                        </div>

                                    )
                                })
                            }
                        </div>
                    )}
            </div>

            {
                reserva && !state.mensagem && (
                    <div>
                        <div>
                            <h3>Confirmar Reserva:</h3>
                            <form action={action}>
                                <label>
                                    Data:
                                    <input type="date"
                                        defaultValue={reserva.data}
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
                                        name="codigo" />
                                </label>

                                <label>
                                    Número de Pessoas:
                                    <input type="number"
                                        max={reserva.mesa?.n_lugares}
                                        defaultValue={reserva.n_pessoas}
                                        min={1}
                                        name="n_pessoas" />
                                </label>
                                {state.error && <p>{state.mensagem}</p>}
                                <div>
                                    <button type="button" onClick={() => setReserva(null)}>Cancelar</button>
                                    <button type="submit">Confirmar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
            {
                cancelarReserva && (
                    <div>
                        <div>
                            <h3>Confirmar cancelamento Reserva:</h3>
                            <p>Realmente deseja cancelar?</p>

                            {<p></p>}
                            <div>
                                <button type="button" onClick={() => setReserva(null)}>Cancelar</button>
                                <button type="button" onClick={handleCancelReserva}>Confirmar Cancelamento</button>
                            </div>

                        </div>
                    </div>
                )
            }

        </div >
    )
}