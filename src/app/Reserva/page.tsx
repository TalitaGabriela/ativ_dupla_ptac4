
import { cookies } from "next/headers"
import { Menu } from "../components/Menu"
import { ApiURL } from "../config"
import { redirect } from "next/navigation"
import { fecthUser } from "../functions/fetchUser"

export default async function Reservas() {

    const user = await fecthUser()
    if(!user) redirect ('/')

    return (
        <div>
            <Menu usuario={user} />
        </div>
    )
}