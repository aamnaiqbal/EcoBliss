const express= require('express');
const cors= require('cors')
require("dotenv").config();




const gobalErrorHandler= require('./Controllers/errorCOntroller')
const plantRouter= require('./Routes/plantRoute');
const plantCareRouter= require('./Routes/plantCareRoute')
const customerRouter= require('./Routes/customerRoute');
const cartRouter= require('./Routes/cartRoute');
const orderRouter= require('./Routes/orderRoute')

const app= express();
app.use(cors({origin: 'http://localhost:5173'}))

app.use(express.json());
app.use('/api/v1/user', customerRouter)
app.use('/api/v1/plant', plantRouter)
app.use('/api/v1/plantcare', plantCareRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/order', orderRouter)



app.use(gobalErrorHandler);
module.exports= app;