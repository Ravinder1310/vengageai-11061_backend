import express from 'express';
import dotenv from "dotenv";
import Connection  from './config/db.js';
import ContactRoutes from "./routes/ContactsRoutes.js"
import cors from "cors";

//configure env
dotenv.config();

//database config
Connection();

// rest obj

const app = express();
app.use(cors())
app.use(express.json())

// routes
app.use('/api/v1/contacts',ContactRoutes);


app.get("/", (req,res)=>{
    res.send({
        message:"All contacts"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running in port ${process.env.PORT}`);
})