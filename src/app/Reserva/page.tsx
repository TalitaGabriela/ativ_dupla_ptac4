
import { redirect } from "next/navigation"
import { Menu } from "../components/Menu"
import { fecthUser } from "../functions/usuarios"
import ListMinhasReservas from "./listMinhaReserva"
import { FecthMinhasReserva } from "../functions/reserva"


export default async function Reservas() {

    const user = await fecthUser()
    
    const reservas = await FecthMinhasReserva()
    console.log(reservas)
    if (!user || !reservas) redirect('/Login')

    return (
        <div>
            <ListMinhasReservas reservas={reservas} />
            
            <Menu usuario={user} />
        </div>
    )
}