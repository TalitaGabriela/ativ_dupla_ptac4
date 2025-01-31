import Reserva from "./reservas";

export default interface PerfilMesa {
    id?: number;
    codigo: string;
    n_lugares: number;
    reservas? : Reserva[]
}


