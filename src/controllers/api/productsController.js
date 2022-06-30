
const Contenedor = require("../../contenedor/contenedorfs")
const contenedorfs = new Contenedor('./src/data/products.json')
module.exports = {
    index: async (req, res) => {
        if (req.params.id) {
            product = await contenedorfs.getById(req.params.id)
            return res.json(product)

        } else {
            products = await contenedorfs.getAll()
            return res.json(products)
        }
    },
    crearProducto: async (req, res) => {
        const newProduct = {
            name: req.body.name,
            timestamp: new Date().toJSON().slice(0,10),
            description: req.body.description,
            cod: req.body.cod,
            image: req.body.image,
            price: req.body.price,
            stock: req.body.stock
        }
        await contenedorfs.save(newProduct)
        return res.json(newProduct)
    },
  
    editarProducto: async (req, res) => {
        productToEdit = {
			id: req.params.id,
			...req.body,
		};
        await contenedorfs.setById(productToEdit)
    },
    eliminarProducto: async (req, res) => {
        await contenedorfs.deleteById(req.params.id)
    }
}
