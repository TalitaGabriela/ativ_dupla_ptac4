'use client'
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { parseCookies } from "nookies";
import { ApiURL } from "../config";
import Reserva from "../interfaces/reservas";
import Usuario from "../interfaces/usuario";
import ResponseSignin from "../interfaces/response";
import { useRouter } from "next/navigation";
import styles from "../styles/perfil.module.css"
import Footer from "../components/Footer";

export default function UserProfilePage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [tipo, setTipo] = useState('');
  const [usuario, setUsuario] = useState<Usuario[]>([]);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [msgError, setMsgError] = useState<string | null>(null);
  const { 'restaurant-token': token } = parseCookies();
  const router = useRouter();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`${ApiURL}/perfil/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
        console.log("Resposta da API:", data); 
    
        if (data && data.usuario) {
          setNome(data.usuario.nome);
          setEmail(data.usuario.email);
          setTipo(data.usuario.tipo);
        } else {
          console.error("Erro: data.usuario está indefinido.");
        }
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    const fetchVerReservas = async () => {
      try {
        const response = await fetch(`${ApiURL}/reservas`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (!data.erro) {
          setReservas(data.reservas);
        } else {
          console.error(data.mensagem);
        }
      } catch (error) {
        console.error('Erro ao buscar reservas do usuário:', error);
      }
    };

    const fetchMostrarUsuarios = async () => {
      const response = await fetch(`${ApiURL}/perfil/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setUsuario(data.usuarios)

    };

    fetchMostrarUsuarios();
    fetchPerfil();
    fetchVerReservas();
  }, [token]);

  const atualizarPerfil = async () => {

    try {
      const response = await fetch(`${ApiURL}/perfil/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, email }),
      });

      if (response) {
        const data: ResponseSignin = await response.json();
        const { error, msg, token = '' } = data;
        console.log(data)
        if (error) {
          setMsgError(msg);
        } else {
          console.log('Perfil atualizado com sucesso!');
          setIsEditing(false)
        }
      } else {
        setMsgError("Erro ao atualizar perfil");
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
    }
  };

  const cancelarReserva = async (id: number | undefined) => {
    const reservationToCancel = { reservaId: id };

    try {
      const response = await fetch(`${ApiURL}/reservas/cancelar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(reservationToCancel),
      });

      const data = await response.json();
      if (!data.erro) {
        setReservas(reservas.filter(reserva => reserva.id !== id));
        console.log(`Reserva ${id} cancelada.`);
      } else {
        console.error(data.mensagem);
      }
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error);
    }
  };



  return (
    <div className={styles.body}>
      <Navbar />

      <main className={styles.container}>
        <h1 className={styles.title}>Perfil do Usuário</h1>
        <hr className={styles.divider} />
        
          {/* Coluna para Reservas */}
          <div className={styles.content}>
            {tipo === 'adm' && (

              <div className={styles.usuariosContainer}>
                <h3 className={styles.sectionTitle}>Usuários Cadastrados</h3>
                <div className={styles.listaUsuarios}>
                  {usuario.length > 0 ? (
                    usuario.map((a) => (
                      <div key={a.id} className={styles.usuarioItem}>
                        <h5>{a.nome}</h5>
                        <p>Email: {a.email}</p>
                      </div>
                    ))
                  ) : (
                    <div className={styles.usuarioItem}>Nenhum usuário encontrado.</div>
                  )}
                </div>
              </div>


            )}
            <div className={styles.reservasContainer}>
              <h3 className={styles.sectionTitle}>Minhas Reservas</h3>
              <div className={styles.listaReservas}>
                {reservas.length > 0 ? (
                  reservas.map((reserva) => (
                    <div key={reserva.id} className={styles.reservaItem}>
                      <div>
                        <h5>Mesa {reserva.mesa_id}</h5>
                        <p>Número de Pessoas: {reserva.n_pessoas} pessoas</p>
                        <small>Data: {new Date(reserva.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</small>
                      </div>
                      <button
                        className={styles.btnCancelar}
                        onClick={() => cancelarReserva(reserva.id)}
                      >
                        Cancelar Reserva
                      </button>
                    </div>
                  ))
                ) : (
                  <div className={styles.reservaItem}>{msgError}</div>
                )}
              </div>
            </div>

            {/* Coluna para Perfil do Usuário */}
            <div className={styles.perfilContainer}>
             
                  {isEditing ? (
                    <>
                      <h4>Atualizar Perfil</h4>
                      <input
                      className={styles.input}
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome"
                      />
                      <input
                      className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                      <button onClick={atualizarPerfil} className={styles.btnSalvar}>
                        Salvar
                      </button>
                      <button onClick={() => setIsEditing(false)} className={styles.btnCancelar}>
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className={styles.userName}>{nome}</h2>
                      <p className="card-text">Email: {email}</p>
                      <button onClick={() => setIsEditing(true)} className={styles.btnEditar}>
                        Atualizar Perfil
                      </button>
                    </>
                  )}
                </div>
              </div>
      </main>

     <Footer />
    </div>
  );
}