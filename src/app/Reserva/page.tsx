"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Mesas } from "../interfaces/mesas"
import type { Reservas } from "../interfaces/reservas";


export default function Reservas() {
  const [mesas, setMesas] = useState<Mesas[]>([]);
  const [reservas, setReservas] = useState<Reservas[]>([]);
  const [formReserva, setFormReserva] = useState({
    id: 0,
    usuario_id: 0,
    mesa_id: 0,
    data: getDateNow(),
    n_pessoas: 0,
    status: true
  })

  // console.log(formReserva["data"])
  // key , value

  function alterFormReserva<K extends keyof Reservas>(key: K, value: Reservas[K]) {
    console.log(key, value)
    setFormReserva((prevForm) => ({
      ...prevForm,
      [key]: value
    }))
  }

  async function fetchData() {
    const responseReservas = await fetch('http://localhost:3333/reservas');
    const responseMesas = await fetch('http://localhost:3333/mesas');
    const dataReservas = await responseReservas.json();
    const dataMesas = await responseMesas.json();

    setMesas(dataMesas);
    setReservas(dataReservas)
  }

  useEffect(() => {

    fetchData();
  }, []);

  function getDateNow() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  const [selectedTable, setSelectedTable] = useState('');
  const [dateTables, setDateTables] = useState(getDateNow);
  const SimulaReservas = [{
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
    alterFormReserva("data", e.target.value)
  }

  async function handleSubmitForm(e: FormEvent) {
    e.preventDefault()
    console.log(formReserva)
    await fetch('http://localhost:3333/reservas', {
      method: 'POST',
      body: JSON.stringify(formReserva)
    })
    fetchData()
  }

  return (
    <div>

      <div>

        <div>

          <img src="https://github.com/MrMinerin.png"
            alt="Usuário" />
          <h2>Jeferson</h2>
          <p>Cliente</p>
        </div>
      </div>


      <div>
        <div>
          <h2>Mesas Disponíveis</h2>
          <label>
            <input type="date"
              value={dateTables}
              min={getDateNow()}
              onChange={handleChangeDate} />
          </label>
        </div>

        <div>
          {mesas.map((table) => {
            const isReserved = SimulaReservas.some(
              (reserva) => reserva.data === dateTables && reserva.mesa === table.id
            );

            if (isReserved) {
              return (
                <button
                  key={table.id} disabled>
                  {table.codigo} (Reservada)
                </button>

              );
            } else {
              return (
                <button
                  key={table.id}

                  onClick={() => {
                    alterFormReserva("mesa_id", table.id)
                    setSelectedTable(table.codigo)
                  }}
                >
                  {table.codigo}
                </button>
              );
            }
          })}
        </div>
      </div>

      <div>
        {selectedTable ? (
          <div>
            <h2>Reservar {selectedTable}</h2>
            <form onSubmit={handleSubmitForm}>
              <label>
                nome:
                <input type="text"
                  placeholder="Seu nome"
                  onChange={(e) => alterFormReserva("usuario_id", parseInt(e.target.value))} />
              </label>
              <label>
                pessoas:
                <input type="number"
                  max={4}
                  min={1}
                  onChange={(e) => alterFormReserva("n_pessoas", parseInt(e.target.value))} />

              </label>
              <button type="submit">
                Confirmar Reserva
              </button>
            </form>
          </div>
        ) : (
          <p>Selecione uma mesa para reservar</p>

        )}
      </div>
    </div>

  )
}
