import { ChangeEvent } from "react";
import { FecthMesas } from "../components/FetchMesas";
import style from "../styles/reserva.module.css"; // Importando o módulo CSS

type MesasType = {
  id: number,
  codigo: string,
  n_lugares: number
}

export default function Reservas() {

  function getDateNow() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {
    // Função para tratar a mudança de data (se necessário)
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
            min={getDateNow()}
            className={style.input}
            onChange={handleChangeDate}
          />
        </label>

        {/* Componente FetchMesas */}
        <FecthMesas />
      </div>

    </div>
  );
}
