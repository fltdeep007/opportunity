const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');


dotenv.config();

connect();

const app = express();


app.use(cors());
app.use(express.json());


// app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});