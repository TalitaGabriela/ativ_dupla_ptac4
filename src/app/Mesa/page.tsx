import PerfilDaMesa from "../interfaces/mesa"

const PaginaMesa = () => {
    const mesa = {
        id: 1,
        codigo: '01',
        n_lugares: 4,
    }
    return (
        <div>
            <h1>Pagina de mesa</h1>
            <PerfilDaMesa mesa={mesa} />
        </div>
    )
}

export default PaginaMesa