import React, { useState, useEffect } from 'react';

interface IProduct {
  _id: string;
  imagen: string;
  nombre: string;
  codigo: string;
  descripcion: string;
  precio: number;
  stock: number;
  inventario: {
    tipo: string;
    cantidad: number;
    fecha: string;
    tiendas: {
      tienda: string;
      cantidad: number;
      fecha: string;
    }[];
  };
}

interface IProductListProps {
  products: IProduct[];
}

function ProductList(props: IProductListProps) {
  const { products: initialProducts } = props;
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3450/api/productos/obtenerProductos');
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, []);

  if (!products || products.length === 0) {
    return <p>No se encontraron productos</p>;
  }

  const filteredProducts = searchQuery
    ? products.filter(product => product.nombre.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Agregamos una animación CSS a las tarjetas de producto
  const cardStyles = {
    transition: 'all 0.3s ease-in-out',
    transform: 'translateY(0px)'
  };

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget;
    card.style.transform = 'translateY(-5px)';
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget;
    card.style.transform = 'translateY(0px)';
  };

  // Agregamos una animación de JavaScript al título de la tarjeta de producto
  const handleTitleClick = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    const title = e.currentTarget;
    title.animate(
      [
        { transform: 'translateX(0px)' },
        { transform: 'translateX(10px)' },
        { transform: 'translateX(0px)' }
      ],
      {
        duration: 500,
        iterations: 1
      }
    );
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredProducts.map(product => (
          <div className="col" key={product._id}>
            <div
              className="card h-100"
              style={cardStyles}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              <img src={product.imagen} className="card-img-top" alt={product.nombre} />
              <div className="card-body">
                <h5 className="card-title" onClick={handleTitleClick}>
                  {product.nombre}
                </h5>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text">${product.precio}</p>
                <p className="card-text">Stock: {product.stock}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;


