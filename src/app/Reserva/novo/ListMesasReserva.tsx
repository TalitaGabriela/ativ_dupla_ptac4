'use client'

import { FormEvent, useActionState, useState } from "react"
import Mesa from "../../interfaces/mesa"
import { FecthReserva } from "../../functions/reserva"
import { FecthNovaReserva } from "../../functions/reserva"
import Reserva from "../../interfaces/reservas"
import { error } from "console"
import { useRouter } from "next/navigation"


type ListMesasReservaProp = {
    mesas: Mesa[]
}
export function ListMesasReserva({ mesas }: ListMesasReservaProp) {
    const [data, setData] = useState('')
    const [reservas, setReservas] = useState<Mesa[] | null>(null)
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
            <div>
                <h2>Fazer Reserva</h2>
                <div>
                    <input type="date"
                        value={data}
                        onChange={e => setData(e.target.value)} />
                    <button type="button" onClick={handleFecthData}>Buscar</button>
                </div>


                {reservas?.map(mesa => {


                    return (
                        <button onClick={() => setSelectMesa(mesa)} key={mesa.id}>{mesa.codigo}</button>
                    )
                })
                }
            </div>

            {selectMesa && (
                <div>
                    <div>
                        <h3>Confirmar Reserva:</h3>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Data:
                                <input type="date"
                                    defaultValue={data}
                                    readOnly
                                    max={selectMesa.id}
                                    name="data" />
                            </label>

                            <input type="number"
                                hidden
                                readOnly
                                defaultValue={selectMesa.id}
                                name="mesaId" />

                            <label>
                                Mesa Selecionada:
                                <input type="number"
                                    defaultValue={selectMesa.codigo}
                                    name="codigo" />
                            </label>

                            <label>
                                Número de Pessoas:
                                <input type="number"
                                    max={selectMesa.n_lugares}
                                    min={1}
                                    name="n_pessoas" />
                            </label>
                            {response.error && <p>{response.mensagem}</p>}
                            <div>
                                <button type="button" onClick={() => setSelectMesa(null)}>Cancelar</button>
                                <button type="submit">Confirmar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}