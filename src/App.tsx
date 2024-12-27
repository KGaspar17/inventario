import { useState, useEffect } from 'react';

interface Ubicacion {
  ubicacion_label: string;
  pasillo: string;
  anaquel: string;
  nivel: string;
  casillero: string;
  stock_inventario?: number;
}

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
  Exhibicion: string;
  fede: string;
  pasillo: string;
  anaquel: string;
  nivel: string;
  casillero: string;
  rowid: number;  
  ubicaciones?: Ubicacion[];
}

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [buscar, setBuscar] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState<Producto | null>(null);

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

  const handleSeleccionarProducto = async (producto: Producto) => {
    try {
      const respuestaUbicaciones = await fetch(`http://localhost:3001/product_ubicaciones?product_rowid=${producto.rowid}`);
      const ubicaciones = await respuestaUbicaciones.json();
  
      setProductoSeleccionado({ 
        ...producto,
        ubicaciones: ubicaciones.filter((ubicacion: Ubicacion) => ubicacion.product_rowid === producto.rowid)
      });
    } catch (error) {
      console.error('Error al cargar las ubicaciones del producto:', error);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Productos</h1>
      <input
        type="search"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        placeholder="Buscar por nombre o ubicación"
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
      />
      <table className="w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Referencia</th>
            <th className="px-4 py-2 text-left">Etiqueta</th>
            <th className="px-4 py-2 text-left">Descripción</th>
            <th className="px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos
            .filter((producto) =>
              producto.ref?.toLowerCase().includes(buscar.toLowerCase()) ||
              producto.ubicaciones?.some(ubicacion => ubicacion.ubicacion_label.toLowerCase().includes(buscar.toLowerCase()))
            )
            .map((producto) => (
              <tr key={producto.rowid}>
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
  
          {/* Mostrar detalles específicos de ubicaciones para el producto seleccionado */}
          {productoSeleccionado.ubicaciones?.map((ubicacion: Ubicacion) => (
            <div key={ubicacion.ubicacion_label} className="mb-2">
              <p>Ubicación : {ubicacion.ubicacion_label}</p>
              <p>Stock: {ubicacion.stock_inventario || 0}</p>
              <p>Pasillo: {ubicacion.pasillo}</p>
              <p>Anaquel: {ubicacion.anaquel}</p>
              <p>Nivel: {ubicacion.nivel}</p>
              <p>Casillero: {ubicacion.casillero}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Productos;
