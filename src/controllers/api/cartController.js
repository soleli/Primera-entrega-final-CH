
const Contenedor = require("../../contenedor/contenedorfs")
const contenedorfs = new Contenedor('./src/data/cart.json')
const contenedorProduct = new Contenedor('./src/data/products.json')
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
    listarProductos: async (req, res) => {
        if (req.params.id) {
            product = await contenedorfs.getById(req.params.id)
            return res.json(product.productos)

        }
    },
    crearCarrito: async (req, res) => {
        const newcarrito = {
            timestamp: new Date().toJSON().slice(0, 10),

        }
        await contenedorfs.save(newcarrito)
        return res.json(newcarrito)
    },

    editarCarrito: async (req, res) => {
        let idproduct = req.params.idproduct;
        let idcart = req.params.id;
        const cart = await contenedorfs.getById(idcart)
        const product = await contenedorProduct.getById(idproduct)

        if (!product) {
            return res.json({
                error: 'The product not exits',
                cod: 400
            })
        }
        else {

            if (cart.products) {
                const exists = cart.products.find((item) => item.id == idproduct)
                if (exists) {

                    return res.json({
                        error: 'The product is already in the cart',
                        cod: 400
                    })
                }
                else {
                    updatedProducts = [...cart.products, product]
                    const newcarrito = {
                        id: idcart,
                        timestamp: cart.timestamp,
                        products: updatedProducts,

                    }
                    await contenedorfs.setById(newcarrito)
                    return res.json(newcarrito)
                }
            }else{
                updatedProducts = [product]
                const newcarrito = {
                    id: idcart,
                    timestamp: cart.timestamp,
                    products: updatedProducts,

                }
                await contenedorfs.setById(newcarrito)
                return res.json(newcarrito)
            }
        }
    },


    eliminarCarrito: async (req, res) => {
        await contenedorfs.deleteById(req.params.id)
    },

    eliminarProducto: async (req, res) => {
        let idproduct = req.params.idproduct;
        let idcart = req.params.id;
        const cart = await contenedorfs.getById(idcart)
        if (cart.products) {
            const exists = cart.products.find((item) => item.id == idproduct)
            if (exists) {
                const updatedProducts = cart.products.filter((item) => item.id != idproduct)
               console.log(updatedProducts)
                const newcarrito = {
                    id: idcart,
                    timestamp: cart.timestamp,
                    products: updatedProducts,

                }
                await contenedorfs.setById(newcarrito)
                return res.json(newcarrito)
            }
            else {
                return res.json({
                    error: 'The product is not exits',
                    cod: 400
                })
            }

        }
    }
}
