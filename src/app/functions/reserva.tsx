'use server'
import { cookies } from "next/headers"
import { ApiURL } from "../config"
import Reserva from "../interfaces/reservas"

export async function FecthReserva(data: string): Promise<Reserva[] | null> {
    if (!data) {
        return null
    }
    try {
        const cookiesStored = await cookies()
        const token = cookiesStored.get('restaurant-token')
        const response = await fetch(`${ApiURL}/reservas/date`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer: ${token?.value}` },
            body: JSON.stringify({ data })
        })

        const dataRes = await response.json()
        return dataRes.reservas
    } catch (error) {
        return null
    }

}