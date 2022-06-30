const fs = require("fs");

class Contenedorfs {

    constructor(archivo) {
        this.archivo = archivo
    }

    async save(item) {
        let datos;
        try {
            datos = JSON.parse(await fs.promises.readFile(this.archivo))

        } catch (err) {
            console.log(err.name);
            console.log(err.message);
            console.log(err.stack);
        }
        const ultimoItem = datos[datos.length - 1];
        let id;
        if (ultimoItem) {
            id = ultimoItem.id + 1
        }
        else {
            id = 1
        }
        item.id = id

        datos.push(item);

        return fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2))
    }
    async setById(item){
        let datos;
        try {
            datos = JSON.parse(await fs.promises.readFile(this.archivo))

        } catch (err) {
            console.log(err.name);
            console.log(err.message);
            console.log(err.stack);
        }
      
       // let dataToEdit = datos.find(data => data.id == id);

        let newdata = datos.map(data => {
			if (data.id == item.id) {
				return data = {...item};
			}
			return data;
		})
        return fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(newdata, null, 2))

    }
    async getById(id) {
        let datos;
        try {
            datos = JSON.parse(await fs.promises.readFile(this.archivo))
        } catch (err) {
            console.log(err.name);
            console.log(err.message);
            console.log(err.stack);
        }
        return datos.find(e => e.id == id);
    }

    async getAll() {
        let datos;
        try {
            datos = JSON.parse(await fs.promises.readFile(this.archivo))

        } catch (err) {
            console.log(err.name);
            console.log(err.message);
            console.log(err.stack);
        }

        return datos;
    }
    async deleteById(id) {
        let datos;
        try {
            datos = JSON.parse(await fs.promises.readFile(this.archivo))

        } catch (err) {
            console.log(err.name);
            console.log(err.message);
            console.log(err.stack);
        }
        const idItem = datos.findIndex(item => item.id === id)
        datos.splice(idItem, 1)
        return fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2))

    }
    async deleteAll() {
        let datos;
        try {
            datos = JSON.parse(await fs.promises.readFile(this.archivo))

        } catch (err) {
            console.log(err.name);
            console.log(err.message);
            console.log(err.stack);
        }
        return fs.promises.writeFile(`./${this.archivo}`, '')
    }
}

module.exports = Contenedorfs;
