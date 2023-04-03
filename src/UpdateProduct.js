import React, { useState } from 'react';

function UpdateProduct() {
  const [product, setProduct] = useState({
    
    codigo: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    precio: '',
    stock: '',
    inventario: {
      tipo: '',
      cantidad: '',
      fecha: '',
      tiendas: []
    }
  });
  const [nombre, setNombre] = useState(product.nombre);
  const [descripcion, setDescripcion] = useState(product.descripcion);
  const [precio, setPrecio] = useState(product.precio);

  const handleGetProduct = async () => {
    try {
      const response = await fetch('http://localhost:3450/api/productos/obtenerProducto/:id');
      const data = await response.json();
      console.log('Product fetched:', data);
      setProduct(data);
      setNombre(data.nombre);
      setDescripcion(data.descripcion);
      setPrecio(data.precio);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3450/api/productos/actualizarProducto/${product._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre,
            descripcion,
            precio
          })
        }
      );
      const data = await response.json();
      console.log('Product updated:', data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h2>Actualizar producto</h2>
      <button onClick={handleGetProduct}>Obtener producto</button>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="precio">Precio:</label>
        <input
          type="text"
          id="precio"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />
      </div>
      <button onClick={handleUpdateProduct}>Actualizar producto</button>
    </div>
  );
}

export default UpdateProduct;
