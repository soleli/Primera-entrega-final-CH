const express = require('express');
const router = express.Router();
const path = require('path');
const cartControllers = require('../../controllers/api/cartController.js');

router.get('/:id?',cartControllers.index);
router.get('/:id/products',cartControllers.listarProductos);
router.post('/',cartControllers.crearCarrito);
router.post('/:id/:idproduct',cartControllers.editarCarrito);
router.delete('/:id/:idproduct',cartControllers.eliminarProducto);
router.delete('/:id',cartControllers.eliminarCarrito);


module.exports = router;