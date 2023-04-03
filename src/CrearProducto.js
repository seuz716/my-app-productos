import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class CrearProducto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      },
      mensaje: '',
      datos: {},
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleInventarioChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const inventario = { ...this.state.inventario };
    inventario[name] = value;
    this.setState({
      inventario,
    });
  }

  handleAgregarTienda = () => {
    this.setState({
      inventario: {
        ...this.state.inventario,
        tiendas: [...this.state.inventario.tiendas, { tienda: '', cantidad: '', fecha: '' }]
      }
    });
  }

  handleTiendaChange = (event, index) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const tiendas = [...this.state.inventario.tiendas];
    tiendas[index][name] = value;
    const inventario = { ...this.state.inventario };
    inventario.tiendas = tiendas;
    this.setState({
      inventario,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const datos = {
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      descripcion: this.state.descripcion,
      imagen: this.state.imagen,
      precio: this.state.precio,
      stock: this.state.stock,
      inventario: this.state.inventario,
    };

    fetch('http://localhost:3450/api/productos/crearProducto/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            mensaje: data.mensaje,
            datos: data.datos,
          });
        })
        .catch(error => {
          console.log(error);
        });
      
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="codigo">Codigo:</Label>
          <Input type="text" name="codigo" id="codigo" value={this.state.codigo} onChange={this.handleChange} placeholder="Ingrese el Código del producto" />
        </FormGroup>
        <FormGroup>
          <Label for="nombre">Nombre:</Label>
          <Input type="text" name="nombre" id="nombre" value={this.state.nombre} onChange={this.handleChange} placeholder="Ingrese el nombre del producto" />
        </FormGroup>
        <FormGroup>
          <Label for="descripcion">Descripción:</Label>
          <Input type="text" name="descripcion" id="descripcion" value={this.state.descripcion} onChange={this.handleChange} placeholder="Ingrese la descripción del producto" />
        </FormGroup>
        <FormGroup>
          <Label for="imagen">URL de la imagen:</Label>
          <Input type="text" name="imagen" id="imagen" value={this.state.imagen} onChange={this.handleChange} placeholder="Ingrese la URL de la imagen del producto" />
        </FormGroup>
        <FormGroup>
          <Label for="precio">Precio:</Label>
          <Input type="number" name="precio" id="precio" value={this.state.precio} onChange={this.handleChange} placeholder="Ingrese el precio del producto" />
        </FormGroup>
        <FormGroup>
          <Label for="stock">Stock:</Label>
          <Input type="number" name="stock" id="stock" value={this.state.stock} onChange={this.handleChange} placeholder="Ingrese el stock del producto" />
        </FormGroup>
        <FormGroup>
          <Label for="inventario">Inventario:</Label>
          <Input type="select" name="tipo" id="tipo" value={this.state.inventario.tipo} onChange={this.handleInventarioChange}>
            <option value="">Seleccione un tipo de inventario</option>
            <option value="Entrada">Entrada</option>
            <option value="Salida">Salida</option>
          </Input>
          <Input type="number" name="cantidad" id="cantidad" value={this.state.inventario.cantidad} onChange={this.handleInventarioChange} placeholder="Cantidad" />
          <Input type="date" name="fecha" id="fecha" value={this.state.inventario.fecha} onChange={this.handleInventarioChange} placeholder="Fecha" />
          {this.state.inventario.tiendas.map((tienda, index) => (
            <div key={index}>
              <Input type="text" name="tienda" id={"tienda-" + index} value={tienda.tienda} onChange={(event) => this.handleTiendaChange(event, index)} placeholder="Tienda" />

              <Input type="number" name="cantidad" id={`cantidad-${index}`} value={tienda.cantidad} onChange={(event) => this.handleTiendaChange(event, index)} placeholder="Cantidad" />

              <Input type="date" name="fecha" id={`fecha-${index}`} value={tienda.fecha} onChange={(event) => this.handleTiendaChange(event, index)} placeholder="Fecha" />
            </div>
          ))}
          <Button onClick={this.handleAgregarTienda}>Agregar Tienda</Button>
        </FormGroup>
        <Button type="submit">Crear Producto</Button>
        {this.state.mensaje && (
          <div>
            <p>{this.state.mensaje}</p>
            <p>ID: {this.state.datos.id}</p>
            <p>Nombre: {this.state.datos.nombre}</p>
            <p>Descripción: {this.state.datos.descripcion}</p>
            <p>Precio: {this.state.datos.precio}</p>
            <p>Stock: {this.state.datos.stock}</p>
          </div>
        )}
      </Form>
    );
  }
}

export default CrearProducto;

