import Mesa from "./mesa";

export default interface Reserva {
  find(arg0: (reserva: any) => boolean): unknown;
  id?: number;
  usuario_id: number;
  mesa_id: number;
  data: string;
  n_pessoas: number;
  status: boolean;
  mesa?: Mesa

}

