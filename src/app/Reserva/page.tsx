"use client"
import { FormEvent, useEffect, useState } from "react";
import { Mesa } from "../interfaces/mesa"
import type { Reservas } from "../interfaces/reservas";
import { parseCookies } from "nookies";


export default function Reservas() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [reservas, setReservas] = useState<Reservas[]>([]);
  const [dateTables, setDateTables] = useState(new Date().toISOString().split("T")[0]);
  const [adm, setAdm] = useState(false);
  const [carregar, setCarregar] = useState(true)
  const [formReserva, setFormReserva] = useState({
    mesa_id: 0,
    n_pessoas: 1,
    data: "",
  })

  // 
  async function fetchData() {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];

    try {
      setCarregar(true)
      const resMesa = await fetch(`http://localhost:8000/mesa/disponivel?data=${dateTables}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resMesa) {
        const mesaDate = await resMesa.json()
        setMesas(mesaDate.mesas || []);
      }

      const resReservas = await fetch(`http://localhost:8000/reservas`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resReservas) {
        const reservaDate = await resReservas.json();
        setReservas(reservaDate.reservas || []);
        setAdm(reservaDate.adm || false);
      }
    } catch (error) {
      console.error("Erro ao buscar:", error);
    } finally {
      setCarregar(false)
    }
  }

  // Busca de Reservas
  async function buscaReserva() {
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];

    try {
      const response = await fetch(`http://localhost:8000/reservas/list?data=${dateTables}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response) {
        const data = await response.json()
        setReservas(data.reservas || [])
      } else {
        console.error("Erro ao buscar reservas")
      }
    } catch (error) {
      console.error("Erro ao buscar reservas:", error)
    }
  }

  async function novaReserva(e: FormEvent) {
    e.preventDefault();
    const cookies = parseCookies();
    const token = cookies["restaurant-token"];

    try {
      const response = await fetch(`http://localhost:8000/reservas/reservaNova`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer $token`,
        },
        body: JSON.stringify(formReserva),
      });

      if (response) {
        fetchData();
      } else {
        console.error("Erro ao criar reserva")
      }
    } catch (error) {
      console.error("Erro ao criar reserva:", error)
    }
  }

  function handleChangeDate(e: React.ChangeEvent<HTMLInputElement>) {
    setDateTables(e.target.value);
  }

  useEffect(() => {
    fetchData();
  }, [dateTables]);

  if (carregar) {
    return <p>Carregando</p>
  }

  return (
    <div>

      <div>
        <h1>Reservas</h1>

        {/* Botão para ADMs */}
        {adm && (
          <>
            <h2>Buscar Reservas</h2>
            <input type="date" value={dateTables} onChange={handleChangeDate} />
            <button onClick={buscaReserva}>Buscar Reservas</button>
          </>
        )}

        {/* Reservas */}
        <h1>{adm ? "Reservas" : "Reservas feitas"}</h1>
        <ul>
          {reservas.map((reserva) => (
            <li key={reserva.id}>
              <p>Mesa {reserva.mesa.codigo || reserva.mesa_id}</p>
              <p>Data: {new Date(reserva.data).toLocaleDateString()}</p>
              <p>Pessoas: {reserva.n_pessoas}</p>
              {adm && <p>Cliente: {reserva.usuario?.nome || "Não encontrado"}</p>}
            </li>
          ))}
        </ul>

        {/* Mesas não Reservadas */}
        <h1>Mesas não Reservadas</h1>
        <div>
          {mesas.map((mesa) => (
            <button key={mesa.id} onClick={() => setFormReserva({ ...formReserva, mesa_id: mesa.id, data: dateTables })}>
              Mesa {mesa.codigo} - {mesa.n_lugares} lugares
            </button>
          ))}
        </div>

        {/* Fazer uma Reserva */}
        <form onSubmit={novaReserva}>
          <label>Número de pessoas:</label>
          <input type="number"
            min={1}
            max={mesas.find((mesaN) => mesaN.id === formReserva.mesa_id)?.n_lugares || 1} value={formReserva.n_pessoas} onChange={(e) => setFormReserva({ ...formReserva, n_pessoas: Number(e.target.value) })} />
          <button type="submit">Reservar</button>
        </form>

      </div>
    </div>
  )
}
