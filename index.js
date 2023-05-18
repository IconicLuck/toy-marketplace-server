const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gkz5fmx.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toyCarsCollection = client.db('toyCarsDB').collection('toyCars')

    app.get('/toyCars', async (req, res) => {
        const result = await toyCarsCollection.find().toArray()
        res.send(result)
    })

    app.get('/sportsCar', async (req, res) => {
        const result = await toyCarsCollection.find({category: "sports car"}).toArray()
        res.send(result)
    })

    app.get('/trucks', async (req, res) => {
        const result = await toyCarsCollection.find({category: "truck"}).toArray()
        res.send(result)
    })

    app.get('/racingCars', async (req, res) => {
        const result = await toyCarsCollection.find({category: "racing car"}).toArray()
        res.send(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Toy Cars server is running')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})