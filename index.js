require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lnhug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const skillCollection = client.db('portfolioDB').collection('skills');
    const projectCollection = client.db('portfolioDB').collection('projects');
    const certificateCollection = client.db('portfolioDB').collection('certificates');
    const blogCollection = client.db('portfolioDB').collection('blogs');

    // Get all skills
    app.get('/skill', async (req, res) => {
      try {
        const result = await skillCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching skills:", error);
        res.status(500).send("Failed to retrieve skills.");
      }
    });

    // Get all projects
    app.get('/project', async (req, res) => {
      try {
        const result = await projectCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).send("Failed to retrieve projects.");
      }
    });

    // Get all certificates
    app.get('/certificate', async (req, res) => {
      try {
        const result = await certificateCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching certificates:", error);
        res.status(500).send("Failed to retrieve certificates.");
      }
    });

    // Get all blogs
    app.get('/blog', async (req, res) => {
      try {
        const result = await blogCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        res.status(500).send("Failed to retrieve blogs.");
      }
    });


        
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensure the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Portfolio is Running');
});

app.listen(port, () => {
    console.log(`Portfolio is Running on Port: ${port}`);
});
