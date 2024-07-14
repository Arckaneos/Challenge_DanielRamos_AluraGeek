document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('producto-form');
    const productsContainer = document.getElementById('productos');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const imagen = document.getElementById('imagen').value;

        const producto = { nombre, precio, imagen };
        agregarProducto(producto);
        guardarProducto(producto);
        form.reset();
    });

    function agregarProducto(producto) {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p>$ ${producto.precio}</p>
            <button class="delete-btn">Eliminar</button>
        `;

        productCard.querySelector('.delete-btn').addEventListener('click', () => {
            productCard.remove();
            deleteProducto(producto.nombre);
        });

        productsContainer.appendChild(productCard);
    }

    function guardarProducto(producto) {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function deleteProducto(productoNombre) {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos = productos.filter(producto => producto.nombre !== productoNombre);
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    function cargarProductos() {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos.forEach(producto => agregarProducto(producto));
    }

    cargarProductos();
});
