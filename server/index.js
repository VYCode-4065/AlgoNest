import express from 'express'
import cors from 'cors'
import { configDotenv } from 'dotenv'
import dbConnect from './src/config/db.config.js'
import cookieParser from 'cookie-parser'
import userRouter from './src/routes/user.route.js'
import courseRouter from './src/routes/course.route.js'
import orderRouter from './src/routes/order.route.js'
import lectureRouter from './src/routes/lecture.route.js'

configDotenv({ override: true })

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

const corsOptions = {
    origin: ["http://localhost:5173", "https://algo-nest-hsc3.vercel.app"],
    credentials: true,
};

app.use(cors(corsOptions))

app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/lecture', lectureRouter)
app.use('/api/v1/order', orderRouter)

app.use('/', (req, res) => {
    res.send("<h1>This is backend part !</h1>")
})

const PORT = process.env.PORT || 8080;

dbConnect().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server running at ${PORT} successfully !`);
    });
}
)