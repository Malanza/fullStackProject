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

app.get('/get/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const {rows} = await pool.query('SELECT * FROM fitnesstracker WHERE id = $1', [id])
        res.send(rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.post('/post', async (req,res)=>{
    const{date, workout, duration} = req.body;
    try {
        const {rows} = await pool.query('INSERT INTO fitnesstracker(date, workout, duration) VALUES($1, $2, $3)',[date, workout, duration])
        res.send(rows);
    } catch (error) {
        console.log(error.message);
    }
});

app.patch('/patch/:id', async (req,res)=>{
    try{
    const {id} = req.params;
    const {date, workout, duration} = req.body;
    
      if(!date || !workout || !duration){
            if(date){
            await pool.query('Update fitnesstracker SET date = $1 WHERE id = $2', [date,id]);
            }
            if(workout){
            await pool.query('Update fitnesstracker SET workout = $1 WHERE id = $2', [workout,id]);
            }
            if(duration){
            await pool.query('Update fitnesstracker SET duration = $1 WHERE id = $2', [duration,id]);
            }
            const {rows} = await pool.query('SELECT * FROM fitnesstracker WHERE id = $1',[id]);
            res.send(rows);
            } 
        else if(date && workout && duration){
            await pool.query('UPDATE fitnesstracker SET date = $1, workout = $2, duration = $3 WHERE id = $4', [date, workout, duration, id]);    
            const {rows} = await pool.query('SELECT * FROM fitnesstracker WHERE id = $1',[id]);
            res.send(rows);
        } 
    }catch(error){
        console.log(error.message);
    }
});

app.delete('/delete/:id', async (req,res) =>{
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM fitnesstracker WHERE id = $1', [id])
        //res.send(rows);
    } catch (error) {
        console.log(error);
    }
});



app.listen(3000,()=>{
    console.log('listening to port',3000);
});