const express = require('express');
const router = express.Router();
const path = require('path');
const productsControllers = require('../../controllers/api/productsController.js');

router.get('/:id?',productsControllers.index);
router.post('/',productsControllers.crearProducto);
router.put('/:id',productsControllers.editarProducto);
router.delete('/:id',productsControllers.eliminarProducto);


module.exports = router;