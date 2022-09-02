const express = require('express');
const app = express()
app.use(express.json());

const{Pool} = require('pg')
const pool = new Pool ({ 
    user:'Melvinn',
    password:'halo123',
    host:'localhost',
    port:5432,
    database:'fitness'
});

app.use(express.static('public'));

app.get('/get', async (req,res)=>{
    try {
        const {rows} = await pool.query('SELECT * FROM fitnesstracker')
        res.send(rows);
    } catch (error) {
        console.log(error.message);
    }
});





app.listen(3000,()=>{
    console.log('listening to port',3000);
});