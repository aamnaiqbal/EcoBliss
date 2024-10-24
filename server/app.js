const express= require('express');
const cors= require('cors')
const gobalErrorHandler= require('./Controllers/errorCOntroller')
const plantRouter= require('./Routes/plantRoute');
const plantCareRouter= require('./Routes/plantCareRoute')

const app= express();
app.use(cors({origin: 'http://localhost:5173'}))

app.use(express.json());
app.use('/api/v1/plant', plantRouter)
app.use('/api/v1/plantcare', plantCareRouter)



app.use(gobalErrorHandler);
module.exports= app;