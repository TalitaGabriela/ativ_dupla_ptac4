import { fecthUser } from "../../functions/fetchUser"
import { Menu } from "../../components/Menu"
import { redirect } from "next/navigation"
import { fecthMesa } from "../../functions/mesas"
import { ListMesasReserva } from "./ListMesasReserva"

export default async function NovaReserva() {
    const user = await fecthUser()
    const mesas = await fecthMesa()
    if (!user || !mesas) redirect('/Login')
    return (
        <div>
            <Menu usuario={user} />
            <ListMesasReserva mesas={mesas} />
        </div>
    )
}