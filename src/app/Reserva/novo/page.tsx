import { fecthUser } from "../../functions/usuarios"
import { Menu } from "../../components/Menu"
import { redirect } from "next/navigation"

import { ListMesasReserva } from "./ListMesasReserva"
import { FetchMesas } from "../../functions/mesas"


export default async function NovaReserva() {
    const user = await fecthUser()
    const mesa = await FetchMesas()
    if (!user || !mesa) redirect('/Login')
    return (
        <div>
            <Menu usuario={user} />
            <ListMesasReserva mesas={mesa} />
        </div>
    )
}