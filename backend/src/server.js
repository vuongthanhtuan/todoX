import express from 'express';
import cors from "cors";
import taskRoute from './routes/tasksRouters.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import path from "path";

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

// middlewares

app.use(cors({origin: "http://localhost:5173"}));

/*if(process.env.NODE_ENV !== "production") {
    app.use(cors({origin: "http://localhost:5173"}));
}*/
app.use(express.json());

app.use("/api/tasks", taskRoute);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
    })
};

connectDB().then(() => {
    app.listen(PORT, () =>{
        console.log(`Server bat dau tren cong ${PORT}`);
    });
});


