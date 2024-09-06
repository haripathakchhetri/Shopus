import express from "express"
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { createValidator } from "express-joi-validation";
import mongoose from "mongoose"
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import orderRoutes from './routes/oderRoutes.js'

const port = 5000;

const app = express();

mongoose.connect('mongodb+srv://hari:hari123@cluster0.uexfwlg.mongodb.net/Shopus').then(() => {
  console.log('Database connected')

}).catch((err) => {
  console.log(err)
})

app.use(express.json());
app.use(cors({ origin: ['http://localhost:5000'] }));
app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'))

app.use(fileUpload({
  limits: { fileSize: 1 * 1024 * 1024 },
  abortOnLimit: true
}))



app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to Shopus" })

})

// app.use('/api/products', (req, res, next) => {
//   console.log('lio')
//   next();
// })

// app.get('/api/products', (req, res) => {
//   return res.status(200).json({
//     data: 'Hello it successfully runs'
//   })
// })

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);

app.use('/api/orders', orderRoutes);


app.use((req, res) => {
  return res.status(404).json({ message: "api not found" });
})

app.listen(port, (e) => {
  console.log(`Server running on port ${port}`)
})

