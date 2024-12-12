"use client"
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import style from "../styles/reserva.module.css"

type MesasType ={
    id: number,
    codigo: string,
    n_lugares: number,
}

type Reservas = {
    
    status: boolean,
}

export default function Reservas() {
    const [mesas, setMesas] = useState<MesasType[]>([])
        useEffect(() => {
            async function fetchData(){
                const response = await fetch('http:localhost:3333/reservas')
                const data = await response.json()
                setMesas(data.mesas)
            }
            fetchData()
        }, [])
    
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
                            <label>Mesas disponíveis:</label>
                            <br/>
                            <button id="mesa1" className={style.button}>Mesa 1</button>
                            <br/>
                            <button id="mesa2" className={style.button}>Mesa 2</button>
                            <br/>
                            <button id="mesa3" className={style.button}>Mesa 3</button>
                            <br/>
                            <button id="mesa4" className={style.button}>Mesa 4</button>
                            <br/>
                            <button id="mesa5" className={style.button}>Mesa 5</button>
                            <br/>
                            <button id="mesa6" className={style.button}>Mesa 6</button>
                            <br/>
                            <button id="mesa7" className={style.button}>Mesa 7</button>
                            <br/>
                            <button id="mesa8" className={style.button}>Mesa 8</button>
                            <br/>
                            <button id="mesa9" className={style.button}>Mesa 9</button>
                            <br/>
                            <button id="mesa10" className={style.button}>Mesa 10</button>
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