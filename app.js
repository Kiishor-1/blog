if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./utils/db');
const PORT = process.env.PORT;
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


connectDB();

app.get('/',(req,res)=>{
    res.status(200).json({
        success:true,
        message:'Welcome to blog posts about trending technologies',
    });
})

app.use('/api/v1/blogs', blogRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

