"use client"
import { ChangeEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import style from "../styles/reserva.module.css"; // Importando o módulo CSS

type MesasType = {
  id: number,
  codigo: string,
  n_lugares: number
}

export default function Reservas() {
  const [mesas, setMesas] = useState<MesasType[]>([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/Reserva');
      const data = await response.json();
      setMesas(data.mesas);
    }
    fetchData();
  }, []);

  function getDateNow() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  const [selectedTable, setSelectedTable] = useState('');
  const [dateTables, setDateTables] = useState(getDateNow);
  const reservas = [{
    id: 1,
    mesa: 1,
    data: '2024-11-29'
  },
  {
    id: 1,
    mesa: 2,
    data: '2024-11-29'
  },
  {
    id: 1,
    mesa: 2,
    data: '2024-11-28'
  }];

  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setDateTables(e.target.value);
  }

  return (
    <div className={style.body}>
    <Navbar/>
      <div className={style.container}>
        
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

        {/* Lado central - Mesas disponíveis e seleção */}
        <div className={style.reserva}>
          <h2 className={style.titulo}>Mesas Disponíveis</h2>
          
          {/* Seleção de data */}
          <label className={style.form}>
            <input
              type="date"
              value={dateTables}
              min={getDateNow()}
              className={style.input}
              onChange={handleChangeDate}
            />
          </label>

          {/* Botões de mesas disponíveis */}
          <div className={style.grid}>
            {mesas.map((table) => {
              if (reservas.find(reserva => dateTables === reserva.data && reserva.mesa === table.id)) {
                return (
                  <button
                    key={table.id}
                    className={style.buttonUnavailable}
                    onClick={() => setSelectedTable(table.codigo)}
                  >
                    {table.codigo}
                  </button>
                );
              } else {
                return (
                  <button
                    key={table.id}
                    className={style.buttonAvailable}
                    onClick={() => setSelectedTable(table.codigo)}
                  >
                    {table.codigo}
                  </button>
                );
              }
            })}
          </div>
        </div>

        {/* Lado direito - Formulário de reserva */}
        <div className={style.formulario}>
          {selectedTable ? (
            <div>
              <h2 className={style.tituloReserva}>Reservar {selectedTable}</h2>
              <form className={style.form}>
                <label className={style.label}>
                  Nome:
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Seu nome"
                  />
                </label>
                <label className={style.label}>
                  Data:
                  <input
                    type="date"
                    className={style.input}
                  />
                </label>
                <label className={style.label}>
                  Pessoas:
                  <input
                    type="number"
                    max={4}
                    min={1}
                    className={style.input}
                  />
                </label>
                <button
                  type="submit"
                  className={style.buttonConfirmar}
                >
                  Confirmar Reserva
                </button>
              </form>
            </div>
          ) : (
            <p className={style.texto}>Selecione uma mesa para reservar</p>
          )}
        </div>

      </div>
    </div>
  );
}
