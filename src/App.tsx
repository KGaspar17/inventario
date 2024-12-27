import { useState, useEffect } from 'react';

interface Producto {
  ref: string;
  label: string;
  description: string;
  largo: string;
  alto: string;
  ancho: string;
  stock: number;
  bodega: string;
  almacen: string;
  pasillo: string;
  anaquel: string;
  nivel: string;
  casillero: string;
}

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [buscar, setBuscar] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch('http://localhost:3001/llx_product');
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };
    cargarProductos();
  }, []);

  const handleBuscar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuscar(e.target.value);
  };

  const handleSeleccionarProducto = (producto: Producto) => {
    setProductoSeleccionado(producto);
  };

  const handleEditar = () => {
    setModoEdicion(true);
  };

  const handleGuardar = () => {
    setModoEdicion(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      <input
        type="search"
        value={buscar}
        onChange={handleBuscar}
        placeholder="Buscar por nombre"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <table className="w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Referencia</th>
            <th className="px-4 py-2 text-left">Etiqueta</th>
            <th className="px-4 py-2 text-left">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {productos
            .filter((producto) =>
              producto.ref?.toLowerCase().includes(buscar.toLowerCase())
            )
            .map((producto) => (
              <tr key={producto.ref}>
                <td className="px-4 py-2">{producto.ref}</td>
                <td className="px-4 py-2">{producto.label}</td>
                <td className="px-4 py-2">{producto.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleSeleccionarProducto(producto)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {productoSeleccionado && (
        <div className="bg-gray-100 p-4 mb-4">
          <h2 className="text-2xl font-bold mb-2">
            {productoSeleccionado.label}
          </h2>
          <p className="mb-2">Referencia: {productoSeleccionado.ref}</p>
          <p className="mb-2">Descripción: {productoSeleccionado.description}</p>
          <p className="mb-2">Largo: {productoSeleccionado.largo}</p>
          <p className="mb-2">Alto: {productoSeleccionado.alto}</p>
          <p className="mb-2">Ancho: {productoSeleccionado.ancho}</p>
          <p className="mb-2">Stock: {productoSeleccionado.stock}</p>
          <p className="mb-2">Bodega: {productoSeleccionado.bodega}</p>
          <p className="mb-2">Almacén: {productoSeleccionado.almacen}</p>
          <p className="mb-2">Pasillo: {productoSeleccionado.pasillo}</p>
          <p className="mb-2">Anaquel: {productoSeleccionado.anaquel}</p>
          <p className="mb-2">Nivel: {productoSeleccionado.nivel}</p>
          <p className="mb-2">Casillero: {productoSeleccionado.casillero}</p>
          {modoEdicion ? (
            <button
              onClick={handleGuardar}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar cambios
            </button>
          ) : (
            <button
              onClick={handleEditar}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Productos;
