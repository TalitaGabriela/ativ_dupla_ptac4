import Link from "next/link"
import Usuario from "../interfaces/usuario"
import { ChefHat, ClipboardList, User } from "lucide-react"

type MenuProps = {
    usuario: Usuario
}

export function Menu({ usuario }: MenuProps) {
    return (
        <div>
            <div>
                <img src="https://github.com/TalitaGabriela.png" alt="Usuario" />
                <h2>{usuario.nome}</h2>
                <p>{usuario.tipo}</p>
            </div>
            {
                usuario.tipo === 'adm' ?
                    (
                        <div>
                            <Link href={'/Reserva'}>
                                <ClipboardList /> Todas Reservas
                            </Link>

                            <Link href={'/Mesa'}>
                                <ChefHat /> Mesas
                            </Link>

                            <Link href={'/Perfil'}>
                                <User /> Perfil
                            </Link>
                        </div>
                    ) :
                    (
                        <div>
                            <Link href={'/Reserva/novo'}>
                                <ClipboardList /> Novas Reservas
                            </Link>

                            <Link href={'/Reserva/nova'}>
                                <ClipboardList />Minha Reservas
                            </Link>

                            <Link href={'/Mesa'}>
                                <ClipboardList /> Reservas
                            </Link>

                            <Link href={'/Perfil'}>
                                <User /> Mesas
                            </Link>
                        </div>
                    )
            }
        </div>

    )
}