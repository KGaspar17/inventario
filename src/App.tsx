import { useState, useEffect } from 'react';

interface Producto {
  sku: string;
  nombre: string;
  descripcion: string;
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
      // Aquí debes reemplazar con la llamada a tu API para obtener los productos
      const productos = [
        { sku: '123', nombre: 'Producto 1', descripcion: 'Descripción del producto 1', largo: '10cm', alto: '5cm', ancho: '8cm', stock: 10, bodega: 'Bodega 1', almacen: 'Almacén 1', pasillo: 'Pasillo 1', anaquel: 'Anaquel 1', nivel: 'Nivel 1', casillero: 'Casillero 1' },
        { sku: '456', nombre: 'Producto 2', descripcion: 'Descripción del producto 2', largo: '15cm', alto: '10cm', ancho: '12cm', stock: 20, bodega: 'Bodega 2', almacen: 'Almacén 2', pasillo: 'Pasillo 2', anaquel: 'Anaquel 2', nivel: 'Nivel 2', casillero: 'Casillero 2' },
      ];
      setProductos(productos);
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
    // Aquí debes reemplazar con la llamada a tu API para guardar los cambios
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
            <th className="px-4 py-2 text-left">SKU</th>
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {productos
            .filter((producto) =>
              producto.nombre.toLowerCase().includes(buscar.toLowerCase())
            )
            .map((producto) => (
              <tr key={producto.sku}>
                <td className="px-4 py-2">{producto.sku}</td>
                <td className="px-4 py-2">{producto.nombre}</td>
                <td className="px-4 py-2">{producto.descripcion}</td>
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
            {productoSeleccionado.nombre}
          </h2>
          <p className="mb-2">SKU: {productoSeleccionado.sku}</p>
          <p className="mb-2">Descripción: {productoSeleccionado.descripcion}</p>
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