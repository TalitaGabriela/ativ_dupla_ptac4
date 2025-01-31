type MesasType = {
    id: number,
    codigo: string,
    n_lugares: number,
}



export async function FecthMesas (){
    const response = await fetch('http://localhost:3000/Reserva')
    const data = await response.json()
    const mesas : MesasType[] = data.mesas
    console.log(mesas)
    //const reservas : Reservas[] = data.reserva

    return (
        <div>
        {mesas.map((table) => {
        return (
          <button key={table.id}>
            {table.codigo}
          </button>
        )})}
      </div>
    )
}