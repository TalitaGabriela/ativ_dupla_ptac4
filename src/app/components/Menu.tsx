import Link from "next/link"
import Usuario from "../interfaces/usuario"
import { ChefHat, ChefHatIcon, ClipboardList, HandPlatter, SendToBack, Table, User } from "lucide-react"
import styles from "../styles/menu.module.css"

type MenuProps = {
    usuario: Usuario
}

export function Menu({ usuario }: MenuProps) {
    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.userInfo}>
                    <img src="https://github.com/JoaoPe22.png" alt="Usuario" />
                    <h2>{usuario.nome}</h2>
                    <p>{usuario.tipo}</p>
                </div>


                <div className={styles.menuLinks}>
                    {usuario.tipo === 'adm' ?
                        (
                            <div>
                                <Link href={'/Reserva'}>
                                    <ClipboardList /> Todas Reservas
                                </Link>

                                <Link href={'/Mesa'}>
                                    <HandPlatter /> Mesas
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

                                <Link href={'/Reserva'}>
                                    <ClipboardList />Minha Reservas
                                </Link>

                                <Link href={'/Perfil'}>
                                    <User /> Perfil
                                </Link>
                            </div>

                        )}
                </div>
            </div>
        </div>

    )
}