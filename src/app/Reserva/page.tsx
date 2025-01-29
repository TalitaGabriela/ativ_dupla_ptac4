
import { redirect } from "next/navigation"
import { Menu } from "../components/Menu"

import { fecthUser } from "../functions/usuarios"

export default async function Reservas() {

    const user = await fecthUser()
    if (!user) redirect('/Login')

    return (
        <div>
            <Menu usuario={user} />
        </div>
    )
}