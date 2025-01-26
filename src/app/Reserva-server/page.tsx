import { ChangeEvent } from "react";

type MesasType = {
  id: number,
  codigo: string,
  n_lugares: number
}

export default function Reservas() {


  function getDateNow() {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }




  function handleChangeDate(e: ChangeEvent<HTMLInputElement>) {

  }


  return (
    <div>

      <div>
        <div>
          {/*<img
            src="https://github.com/MrMinerin.png"
            alt="Usuário"
          />*/}
          <h2>Jéferson Carlos de Souza</h2>
          <p>Cliente</p>
        </div>
      </div>


      <div>
        <div>
          <h2>Mesas Disponíveis</h2>
          <label>
            <input
              type="date"
              min={getDateNow()}
            />
          </label>
        </div>

      </div>

    </div>
  );
}