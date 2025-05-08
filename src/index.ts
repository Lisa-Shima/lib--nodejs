import 'reflect-metadata'

import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.use('/api', (req: Request, res: Response) => {
    res.send("Hello world")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
})