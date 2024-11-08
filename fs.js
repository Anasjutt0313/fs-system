const express = require('express');
const {error} = require('console');
const fs = require('fs');

const app = express()
app.use(express.json());

app.post('/post',(req,res)=>{
    const data = req.body
    fs.writeFile('example.json',JSON.stringify(data),(err)=>{
        if(err){
            console.error(error)
            res.status(500).send("error writing to file")
        }else{
            res.status(201).send("book added successfull")
        }
    })
})

app.get('/read',(req,res)=>{
    fs.readFile('example.json',(err,data)=>{
       if(err){
           console.error(err)
           res.status(500).send("error reading to file")
       }
       else{
           res.status(201).json(JSON.parse(data))
       }
   });
  
})


app.post('/update', (req, res) => {
    const data = req.body;

    fs.appendFile('example.json', JSON.stringify(data) + '\n', (err) => {
        if (err) {
            console.error(err);  
            return res.status(500).send("Error appending to file");
        }
        res.status(201).send("Book added successfully");
    });
})

app.delete('/delete', (req, res) => {
    
    fs.unlink('example.json', (error) => {
        if (error) {
            console.error("Error in deleting File", error);
            res.status(500).send("Error in Deleting File");
        } else {
            console.log("File Deleted");
            res.status(200).send("File Deleted");
        }
    });
});

app.listen(5000,()=>{
    console.log("server is running now")
})