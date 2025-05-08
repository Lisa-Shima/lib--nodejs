require('dotenv').config()
require('reflect-metadata')

const express = require('express')
const AppDataSource = require('./config/data-source')
const app = express()
const bookRoutes = require('./routes/bookRoutes')


app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.use('/api/books', bookRoutes)

async function bootstrap(){
    try{
        await AppDataSource.initialize();
        console.log("Database connected successfully...");

        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch(err){
        console.error("Error during Data Source initialization", err)

    }
}

bootstrap()