
import { Menu } from "../components/Menu"
import { redirect } from "next/navigation"
import { fecthUser } from "../functions/fetchUser"

export default async function Reservas() {

    const user = await fecthUser()
    if (!user) redirect('/Login')

    return (
        <div>
            <Menu usuario={user} />
        </div>
    )
}