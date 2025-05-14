const express = require("express");
const cors = require("cors");

const gobalErrorHandler = require("./Controllers/errorCOntroller");
const plantRouter = require("./Routes/plantRoute");
const plantCareRouter = require("./Routes/plantCareRoute");
const customerRouter = require("./Routes/customerRoute");
const cartRouter = require("./Routes/cartRoute");
const orderRouter = require("./Routes/orderRoute");
const adminRouter = require("./Routes/adminRoute");

const vendorRouter = require("./Routes/vendorRoute");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/user", customerRouter);
app.use("/api/v1/plant", plantRouter);
app.use("/api/v1/plantcare", plantCareRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/admin", adminRouter);

app.use("/api/v1/vendor", vendorRouter);

app.use(gobalErrorHandler);
module.exports = app;
