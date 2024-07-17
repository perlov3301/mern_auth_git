import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
//config
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler
  } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js'

// initialize mongoose connection
connectDB();

const app = express();
// to parse raw json data
app.use(express.json());
// to allow send form data
app.use(express.urlencoded({ extended: true }));
// cookie for securing routes with Data
app.use(cookieParser());
// preface for routes
app.use('/api/users', userRoutes);
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(
      path.join(__dirname, 'frontend/dist'))
    );
  //any Route that is not '/api/users'
  app.get('*', (req, res)=>res.sendFile(
      path.resolve(__dirname, 'frontend', 'dist','index.html')
    ));
}else {
  // route
app.get('/', (req,res)=> res.send(
    '<b>Server is ready</b>'
  ));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => 
    console.log(`Server started on port ${port}`));
//-**POST /api/users** -register a user
//-**POST /api/users/auth** -authenticate a user and get token
//-**POST /api/users/logout**-logout user and clear cookie
//-**GET /api/users/profile**-get user profile
//-**PUT /api/users/profile** - update profile