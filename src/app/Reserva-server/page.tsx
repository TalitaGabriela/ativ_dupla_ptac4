"use client"
import { useEffect, useState, ChangeEvent } from "react";
import { stringify } from "querystring";
import style from "../styles/reserva.module.css";
import Mesa from "../interfaces/mesa";

  const [mesas, setMesas] = useState<Mesa>()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8000/reservas')
      const data = await response.json()
      setMesas(data.mesas)
    }
  })

  function getDateNow() {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }
  const [selectedTable, setSelectedTable] = useState(null)
  const [dateTables, setDateTables] = useState(getDateNow)
  const tables = [
    {
      id: 1,
      nome: "Mesa 1"
    },
    {
      id: 2,
      nome: "Mesa 2"
    },
    {
      id: 3,
      nome: "Mesa 3"
    },
  ]
  const reservas = [
    {
      id: 1,
      Mesa: 1,
      data: '2025-01-22'
    },
    {
      id: 2,
      Mesa: 2,
      data: '2025-01-22'
    },
    {
      id: 3,
      Mesa: 3,
      data: '2025-01-22'
    },
  ]

  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setDateTables(e.target.value)
  }


  return (
    <div className={style.body}>

      {/* Lado esquerdo - Informações do cliente */}
      <div className={style.cliente}>
        <div className={style.box}>
          {/*<img
            src="https://github.com/MrMinerin.png"
            alt="Usuário"
            className={style.img}
          />*/}
          <h2 className={style.nome}>Jéferson Carlos de Souza</h2>
          <p className={style.cargo}>Cliente</p>
        </div>
      </div>

      {/* Lado central - Mesas disponíveis */}
      <div className={style.reserva}>
        <h2 className={style.titulo}>Mesas Disponíveis</h2>

        {/* Seleção de data */}
        <label className={style.form}>
          <input
            type="date"
            min={dateTables}
            value={dateTables}
            className={style.input}
            onChange={handleChangeDate}
          />
        </label>


      </div>
      <div>
        {tables.map((table) => {
          if (reservas.find(reserva => dateTables === reserva.data && reserva.mesa === table.id)) {
            return (
              <button key={table.id} onClick={() => setSelectedTable(table.nome)}>
                {table.nome}
              </button>
            )
          } else {
            return (
              <button key={table.id} onClick={() => setSelectedTable(table.nome)}
              >
                {table.nome}
              </button>
            )
          }
        })}
      </div>
      <div>
        {selectedTable ? (
          <div>
            <h2>Reservar {selectedTable}</h2>
            <form>
              <label>
                Nome:
                <input
                  type="text"
                  placeholder="Seu nome"
                />
              </label>
              <label>
                Data:
                <input
                  type="date"
                />
              </label>
              <label className="flex flex-col">
                Pessoas:
                <input
                  type="number"
                  max={4}
                  min={1}
                />
              </label>
              <button
                type="submit"
              >
                Confirmar Reserva
              </button>
            </form>
          </div>
        ) : (
          <p>Selecione uma mesa para reservar</p>
        )}
      </div>
    </div>
  );