import { fecthUser } from "../../functions/usuarios"
import { Menu } from "../../components/Menu"

import { ListMesasReserva } from "./ListMesasReserva"
import { FetchMesas } from "../../functions/mesas"


export default async function NovaReserva() {
    const user = await fecthUser()
    const mesa = await FetchMesas()
    console.log(user)
    console.log(mesa)
    if (!user || !mesa) return
    return (
        <div>
            <Menu usuario={user} />
            <ListMesasReserva mesas={mesa} />
        </div>
    )
}