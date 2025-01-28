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
                            <Link href={'/Reservas'}>
                                <ClipboardList /> Todas Reservas
                            </Link>

                            <Link href={'/Mesas'}>
                                <ChefHat /> Mesas
                            </Link>

                            <Link href={'/Perfil'}>
                                <User /> Perfil
                            </Link>
                        </div>
                    ) :
                    (
                        <div>
                            <Link href={'/Reservas/novo'}>
                                <ClipboardList /> Novas Reservas
                            </Link>

                            <Link href={'/Reservas/nova'}>
                                <ClipboardList />Minha Reservas
                            </Link>

                            <Link href={'/Mesas'}>
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