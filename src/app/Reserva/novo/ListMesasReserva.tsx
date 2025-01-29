'use client'

import { useState } from "react"
import Mesa from "../../interfaces/mesa"
import { FecthReserva } from "../../functions/reserva"
import Reserva from "../../interfaces/reservas"


type ListMesasReservaProp = {
    mesas: Mesa[]
}
export function ListMesasReserva({ mesas }: ListMesasReservaProp) {
    const [data, setData] = useState('')
    const [reservas, setReservas] = useState<Reserva[] | null>(null)
    const [carregaReservas, setCarregaReservas] = useState(false)

    async function handleFecthData() {
        const response = await FecthReserva(data)
        setReservas(response)
        setCarregaReservas(false)
        await new Promise(reseolve => setTimeout(reseolve, 3000))
    }

    return (
        <div>
            <div>
                <h2>Fazer Reserva</h2>
                <div>
                    <input type="date"
                        value={data}
                        onChange={e => setData(e.target.value)} />
                    <button type="button" onClick={handleFecthData}>Buscar</button>
                </div>

{carregaReservas && <p>Carregando mesas...</p>}
                {reservas && !carregaReservas &&
                    mesas.map(mesa => {
                        if (reservas.find(reserva => reserva.mesa_id === mesa.id)) return (
                            // está reservado
                            <button key={mesa.id}>{mesa.codigo}</button>
                        )
                        return (
                            <button key={mesa.id}>{mesa.codigo}</button>
                        )
                    })
                }
            </div>
        </div>
    )
}