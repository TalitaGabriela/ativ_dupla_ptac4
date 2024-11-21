"use client"
import Navbar from "../components/Navbar";
import style from "../styles/reserva.module.css"

export default function Reserva() {
    return (
        <div className={style.body}>
            <Navbar />

            <div className={style.container}>
                <h1>Faça sua Reserva</h1>
                <div className={style.reserva}>

                    {/* Cliente */}
                    <form className={style.form}>
                        <div>
                            <label>Cliente</label>
                            <input className={style.input} />
                        </div>
                    </form>

                    {/* Mesa */}
                    <form className={style.form}>
                        <div>
                            <label>Mesa</label>
                            <input className={style.input} />
                        </div>
                    </form>

                    {/* Data */}
                    <form className={style.form}>
                        <div>
                            <label>Data</label>
                            <input className={style.input} type="date" />
                        </div>
                    </form>

                    {/* Numero de pessoas */}
                    <form className={style.form}>
                        <div>
                            <label>Numero de Pessoas</label>
                            <input className={style.input} type="number" />
                        </div>
                    </form>

                    {/* Status */}
                    <form className={style.form}>
                        <div>
                            <label>Status</label>
                            <input className={style.input} />
                        </div>
                    </form>

                </div>
                <button type="submit" className={style.button}>Reservar</button>
            </div>
        </div>
    )
}