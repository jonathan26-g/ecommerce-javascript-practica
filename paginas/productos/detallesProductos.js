const idParams = new URLSearchParams(location.search).get("id");
const ProductosLs = JSON.parse(localStorage.getItem('productos')) || [];

const productoClickeado = ProductosLs.find((producto) => producto.id === Number(idParams));

const divDetalleProducto = document.getElementById("idDetalleProducto");

if (productoClickeado) {
    divDetalleProducto.innerHTML = `
        <div class="col-12 col-md-6 text-center"> 
            <img src="${productoClickeado.imagen || productoClickeado.image}" class="img-fluid" width="400" alt="">
        </div>

        <div class="col-12 col-md-6 mt-5 mt-md-0">
            <h3>${productoClickeado.titulo || productoClickeado.title}</h3>
            
            <p>${productoClickeado.descripcion || productoClickeado.description}</p>

            <button class="btn btn-warning">Agregar carrito</button>
        </div>
    `;
} else {
    divDetalleProducto.innerHTML = "<h3>Producto no encontrado</h3>";
}