const productos = [
  {
    id: 1,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_916014-MLA92148003759_092025-F.webp",
    titulo: 'Apple iPhone 17 Pro Max (256 GB) - Naranja cósmico',
    descripcion: `Memoria RAM: 12 GB. ESIM integrada...`
  },
  {
    id: 2,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_811528-MLA99992406525_112025-F.webp",
    titulo: 'Xiaomi Redmi 14c 4g 256gb 8gb Ram Dual Sim',
    descripcion: `Dispositivo desbloqueado...`
  },
  {
    id: 3,
    imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_978143-MLA100007941147_122025-F.webp',
    titulo: 'Smartphone Realme C75 Dual SIM',
    descripcion: `Memoria RAM: 8 GB...`
  }
];

const filaProductos = document.getElementById("idRowProductos");

// --- 1. CREAMOS UNA FUNCIÓN PARA PINTAR ---
// Metemos la lógica de pintar aquí adentro para llamarla SOLO cuando tengamos datos
const pintarProductos = () => {
    // CORRECCIÓN: La clave es "productos" (una sola 's')
    const productosLs = JSON.parse(localStorage.getItem("productos")) || [];

    // Si no hay productos, no hacemos nada
    if(productosLs.length === 0) return;

    // CORRECCIÓN: Usamos la variable productosLs bien escrita
    const res = productosLs.map((producto) => `
        <div class="col-12 col-md-6 col-lg-4 my-3">
            <div class="card h-100"> 
                <img src="${producto.imagen || producto.image}" class="card-img-top p-3" style="height:300px; object-fit:contain" alt="..." />
                
                <div class="card-body d-flex flex-column"> 
                    <h5 class="card-title">${producto.titulo || producto.title}</h5>
                    
                    <p class="card-text text-truncate">${producto.descripcion || producto.description}</p>
                    
                    <div class="mt-auto text-center">
                        <a href="./paginas/productos/detalles-productos.html?id=${producto.id}" class="btn btn-primary"> VER MAS </a>
                    </div>
                </div>
            </div>
        </div>
    `);

    filaProductos.innerHTML = res.join("");
};

// --- 2. FUNCIÓN DE CARGA Y API ---
const obtenerProductosApi = async () => {
  try {
    const productoApi = await fetch("https://fakestoreapi.com/products");
    const data = await productoApi.json();

    const eleccion = prompt("Empezar la aplicacion con: 1-Array personal 2- Array desde una API");

    if (Number(eleccion) === 1) {
      localStorage.setItem("productos", JSON.stringify(productos));
    } else if (Number(eleccion) === 2) {
      localStorage.setItem("productos", JSON.stringify(data));
    } else {
      alert("Opción incorrecta, cargando manuales por defecto");
      localStorage.setItem("productos", JSON.stringify(productos));
    }

    // --- 3. IMPORTANTE: LLAMAR A PINTAR AQUÍ ---
    // Recién ahora que tenemos datos y el usuario eligió, pintamos la pantalla
    pintarProductos();

  } catch (error) {
    console.log(error);
  }
};

// Limpiamos localStorage antiguo para obligar a que pregunte de nuevo (solo para pruebas)
localStorage.removeItem("productos");

// Ejecutamos
obtenerProductosApi();