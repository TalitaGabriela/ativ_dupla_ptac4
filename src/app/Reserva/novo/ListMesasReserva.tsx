import Mesa from "../../interfaces/mesa"

type ListMesasReservaProp = {
    mesas: Mesa[]
}
export function ListMesasReserva({ mesas }: ListMesasReservaProp) {
    return (
        <div>
            {
            mesas.map(mesa => {
                return (
                    <button key={mesa.id}>{mesa.codigo}</button>
                )
            })}
        </div>
    )
}