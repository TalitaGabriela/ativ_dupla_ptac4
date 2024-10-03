"use client";
import PerfilUsuario from "../interfaces/usuario";
import Usuario from "../interfaces/usuario";
import { useState, useEffect } from "react";

const PaginaPerfil = () => {
  const [usuario, setUsuario] = useState<Usuario | undefined>();
  useEffect(() => {
    setUsuario({ nome: "jose" });
  }, []);

  // {
  //     nome: 'José Lima',
  //     idade: 20,
  //     email: 'joselima@gmail.com'
  // }

  return (
    <div>
      <h1>Página de Perfil</h1>
      {/* <PerfilUsuario usuario={usuario} /> */}
    </div>
  );
};

export default PaginaPerfil;
