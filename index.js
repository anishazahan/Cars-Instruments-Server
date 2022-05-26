const express = require('express')
const cors = require('cors');

const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ecl7n.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

    try{
        await client.connect();
        // console.log(connected);
       const serviceCollection = client.db('carManufacturer').collection('service');
       app.get('/services',async(req,res)=>{
         const query = {};
         const cursor = serviceCollection.find(query);
         const services = await cursor.toArray();
         res.send(services);
       })

    }finally{
      
    }

}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World! ui')
})

app.listen(port, () => {
  console.log(`server ${port}`)
})