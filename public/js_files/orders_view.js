const tts = async () => {
  const fetch_data = await fetch("/get_all_orders");
  const response_data = await fetch_data.json();

  const orders = response_data.data;

  console.log(orders);

  const tableBody = document.getElementById("ordersTableBody");

  // 1. Clear existing rows
  tableBody.innerHTML = "";

  // 2. Loop through orders
  orders.forEach(order => {
    const row = document.createElement("tr");

    const email = document.createElement("td");
    email.textContent = order.email;

    const phone = document.createElement("td");
    phone.textContent = order.telephone;

    const location = document.createElement("td");
    location.textContent = order.location;

    const flavour = document.createElement("td");
    flavour.textContent = order.flavour;

    const quantity = document.createElement("td");
    quantity.textContent = order.quantity;

    const time = document.createElement("td");
    time.textContent = new Date(order.createdAt).toLocaleString();

    // 3. Append cells to row
    row.append(
      email,
      phone,
      location,
      flavour,
      quantity,
      time
    );

    // 4. Append row to table
    tableBody.appendChild(row);
  });
};

tts();
