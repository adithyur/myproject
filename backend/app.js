const express = require("express")
require("./Db")
const cors= require("cors")
const app = express();
app.use(cors());
app.use(express.json());
const userRouter = require("./Routes/user");
app.use("/api/user",userRouter)
const path = require('path');

const productsRouter = require("./Routes/products");
app.use("/api/products",productsRouter)

app.use('/uploads/image', express.static(path.join(__dirname, '../backend/uploads/image')));

const wishlistRouter = require("./Routes/wishlist");
app.use("/api/wishlist",wishlistRouter)

const cartRouter = require("./Routes/cart");
app.use("/api/cart",cartRouter)

const profileRouter = require("./Routes/profile");
app.use("/api/profile",profileRouter)

const orderRouter = require("./Routes/order");
app.use("/api/order",orderRouter)

const transactionRouter = require("./Routes/transaction");
app.use("/api/transaction",transactionRouter)



app.listen(8000, () => {
    console.log("the port is listening on port 8000");
});
