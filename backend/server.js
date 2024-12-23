// server.js
const express = require('express');
const mysql = require('mysql'); // O cualquier librería según tu base de datos
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost', // Cambiar por tu host
    user: 'root', // Cambiar por tu usuario
    password: '', // Cambiar por tu contraseña
    database: 'sdsmaxco_sds_2022', // Cambiar por el nombre de tu base de datos
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Endpoint para obtener los productos
app.get('/llx_product', (req, res) => {
    const query = 'SELECT * FROM llx_product'; // Ajusta la consulta según tu base de datos
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener los productos');
        } else {
            res.json(results);
        }
    });
});

app.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001');
});
