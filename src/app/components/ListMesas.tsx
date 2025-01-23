export type MesasType = {
    id: number,
    codigo: string,
    n_lugares: number
  }
  
  export async function ListMesas (){
      
  
      const response = await fetch('http://localhost:3000/reservas')
      const data = await response.json()
      const dataMesas : MesasType[] = data.mesas
    
  
      return(
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
          {dataMesas.map((table) => {
          return (
           <button
              key={table.id}
              className="p-4 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700"
          
            >
              {table.codigo}
            </button>
          )})}
        </div>
      )
  }