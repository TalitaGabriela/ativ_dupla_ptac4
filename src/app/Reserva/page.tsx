"use client"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Mesa from "../interfaces/mesa"
import PerfilReservas from "../interfaces/reservas";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";
import ResponseSignin from "../interfaces/response";
import styles from "../styles/reserva.module.css"


export default function Reservas() {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [mesaClient, setMesaClient] = useState<number | null>(null);
  const [reservas, setReservas] = useState<PerfilReservas[]>([]);
  const [dateTables, setDateTables] = useState(getDateNow());
  const [error, setError] = useState('');
  const [formReserva, setFormReserva] = useState<PerfilReservas>({
    id: 0,
    usuario_id: 0,
    mesa_id: 0,
    data: new Date,
    n_pessoas: 0,
    status: false
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${ApiURL}/mesa`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Erro ao buscar mesa')
        }

        const data = await response.json()
        if (Array.isArray(data.mesas)) {
          setMesas(data.mesas);
        } else {
          console.error('Formato inválido: ', data)
        }

      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, []);

  function getDateNow() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }
  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setDateTables(e.target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log(formReserva)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { 'restaurant-token': token } = parseCookies()

    try {
      const response = await fetch(`${ApiURL}/reservas/novo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ ...reservas, mesa_id: mesaClient })
      })

      if (!response.ok) {
        throw new Error('Erro para cadastrar.');
      }

      const data: ResponseSignin = await response.json();
      if (data.error) {
        setError(data.msg)
      } else {
        console.log('Reserva Cadastrada: ', reservas);
      }

    } catch (error) {
      console.error(error);
      setError('Erro para cadastrar')
    }
  };

  const alterarData = (novaData: string) => {

    setReservas((reservaAnterior) => ({
      ...reservaAnterior,
      data: new Date(novaData)
    }));
  }

  const alterarN_Pessoas = (numPessoas: string) => {
    setReservas((reservaAnterior) => ({
      ...reservaAnterior,
      n_pessoas: Number(numPessoas)
    }));
  }

  return (
    <div>

      <div>
        <h1>Reserva de Mesa</h1>
        <div className={styles.row}>
          <div className={styles.col}>
            <input
              type="date"
              value={dateTables}
              min={getDateNow()}
              onChange={handleChangeDate}
            />

            <div>
              {mesaClient !== null && (
                <div>
                  <h2>Reservar Mesa{mesaClient}</h2>
                  <p>Código:</p>
                  <form onSubmit={handleSubmit}>

                    <div>
                      <label htmlFor="dateInput">Data da Reserva</label>
                      <input type="date"
                        id="dateInput"
                        value={formReserva.data.toISOString().split("T")[0]}
                        onChange={(e) => setFormReserva({ ...formReserva, data: new Date(e.target.value) })}
                      />
                      <div>Coloque a data que irá reservar a mesa</div>
                    </div>

                    <div>
                      <label htmlFor="n_Pessoa">Número de pessao na Mesa</label>
                      <input type="number"
                        id="n_Pessoa"
                        value={formReserva.n_pessoas}
                        onChange={(e) => setFormReserva({ ...formReserva, n_pessoas: Number(e.target.value) })
                        } min={1} />
                      <div>Coloque o número de pessoas</div>
                    </div>

                    {error &&
                      <div>
                        <p>{error}</p>
                      </div>
                    }

                    <button type="submit">Reservar Mesa</button>
                  </form>
                </div>
              )}
              {mesaClient === null && <p>Selecione Mesa para Reservar</p>}
            </div>
          </div>

          <div>
            <div>
              {mesas && mesas.length > 0 ? (
                mesas.map(table => (
                  <div onClick={() => setMesaClient(Number(table.id))}
                    key={table.id}
                  >
                    <img src="#"
                      alt={`Mesa ${table.id}`} />
                    <h4>Mesa 0{table.id} - {table.n_lugares} cadeiras</h4>
                    <p><span>group</span>Reservado</p>
                  </div>
                ))

              ) : (
                <p>Nenhuma mesa</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
