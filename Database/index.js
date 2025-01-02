import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express() 
app.use(express.json()); // express to json
app.use(cors());

//Check Server Connection

app.listen(9090,()=>{
    console.log("Ready to Go! Michael!");
})

//Database Connection

const conn = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"",
    database:"react_db"
});

app.get('/', (req,res)=>{

    const sql = "SELECT * FROM sample";

    conn.query(sql, (err,data) =>{

        if(err){
            return res.json({Error:"ENGK!"});
        }

            return res.json(data);
    
    })
})

app.post('/insert', (req,res) => {

    const sql ="INSERT INTO sample (name, age, contact) VALUES (?,?,?);";
    const {name,age,contact} = req.body;

    conn.query(sql,[name,age,contact], (err,data) => {

        if(err){
            return res.json({Error:"Engk!"})
        }
            return res.json(data)
    })
})

app.put('/update/:id', (req,res) => {

    const sql ="UPDATE sample SET name=?, age=?, contact=? WHERE id=?";
    const {name,age,contact} = req.body;
    const id = req.params.id

    conn.query(sql,[name,age,contact,id], (err,data) => {

        if(err){
            return res.json({Error:"Engk!"})
        }
            return res.json(data)
    })
})


app.delete('/delete/:id', (req,res) => {

    const sql ="DELETE FROM sample WHERE id=?";
    const id = req.params.id;

    conn.query(sql,[id], (err,data) => {

        if(err){
            return res.json({Error:"Engk!"})
        }
            return res.json(data)
    })
})
