const order_form = document.getElementById("orderForm");
let order_details = {}; // Empty object


order_form.addEventListener("submit", async (event) =>{
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const location = document.getElementById("location").value;
    const telephone = document.getElementById("phone").value;
    const flavour = document.getElementById("flavour").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    // Store form data in order_details object
    order_details = {
        email_data: email,
        location_data: location,
        telephone_data: telephone,
        flavour_data: flavour,
        quantity_data: quantity 
    };

    console.log(order_details); // Log

    try{
        const response = await fetch("/orders_to_add", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order_details) // Send this data
        
        });

        if(!response.ok){
            console.log("Error in response from server");
            return;

        }

        // The response
        const response_data = await response.json();
        console.log("Response from server: ", response_data.message);
        order_form.reset();

    }
    catch(error){
        console.log("Opps ! An error occurred: " + error);
        return;

    }


})