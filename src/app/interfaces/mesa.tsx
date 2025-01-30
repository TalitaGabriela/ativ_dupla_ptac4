import Reserva from "./reservas";

export default interface Mesa {
    id?: number;
    codigo: string;
    n_lugares: number;
    reservas? : Reserva[]
}


