const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const env = require("dotenv").config();

const app = express();
const port = process.env.port || 3000; // Lets hard code

app.use(express.json()); // To json data
app.use(express.static(path.join(__dirname, "../public"))); //Serve from static folder

const connect_to_db = async () =>{
    // Connect the database via mongoose
    try{
        await mongoose.connect(process.env.mongodb_url);
        console.log("Database connected successfully");

    }
    catch(error){
        console.log("Database connection error: " + error);

    }

}

// Create the schema
const order_schema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    },
    flavour:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

// Create the model
const order = new mongoose.model("orders", order_schema, "orders")


// Get the page on root visit
app.get("/", (req, res) =>{
    return res.sendFile(path.join(__dirname, "../public/html_files/advert_view.html"));

});

// Soda dashboard route
app.get("/soda_dashboard", (req, res) =>{
    return res.sendFile(path.join(__dirname, "../public/html_files/soda_dashboard.html"));

});

// Post route for orders to be added
app.post("/orders_to_add", async (req, res) =>{
    const data_received = req.body;

    console.log("Data received at backend: ", data_received);

    const data_to_store = new order({
        email: data_received.email_data,
        location: data_received.location_data,
        telephone: data_received.telephone_data,
        flavour: data_received.flavour_data,
        quantity: data_received.quantity_data
    });

    await data_to_store.save();


    return res.json({
        success: true,
        message: "Order received",
        data: req.body
    });
});

// Post route for orders to be removed
app.post("/orders_to_remove", (req, res) =>{
    return res.json({
        success: true,
        message: "Order removal received",
        data: req.body
    });
})

app.get("/orders_view", async (req, res) =>{
    return res.sendFile(path.join(__dirname, "../public/html_files/orders_view.html"));

});

app.get("/get_all_orders", async (req, res) =>{
    try{
        const all_orders = await order.find({}).sort({ createdAt: -1 });

        return res.json({
            success: true,
            message: "All orders fetched successfully",
            data: all_orders
        });     
    }

    catch(error){
        return res.json({
            success: false,
            message: "Error fetching orders: " + error,
            data: null
        });

    }
});

// Start server connect and listen
const start_server = async () =>{
    await connect_to_db();

    app.listen(process.env.port, () =>{
        console.log("Server started on port " + process.env.port);
    });
}

start_server();