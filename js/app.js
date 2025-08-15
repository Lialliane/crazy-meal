function Order(mealName, mealPrice, mealImage) {
    this.mealName = mealName;
    this.mealPrice = mealPrice;
    this.mealImage = mealImage;
}

function displayOrders() {
    const orders = getOrders();
    const tbody = document.querySelector('#ordersTable tbody');
    tbody.innerHTML = '';

    orders.forEach(order => {
        const tr = document.createElement('tr');

        const imgTd = document.createElement('td');
        const img = document.createElement('img');
        img.src = order.mealImage;
        imgTd.appendChild(img);

        const nameTd = document.createElement('td');
        nameTd.textContent = order.mealName;

        const priceTd = document.createElement('td');
        priceTd.textContent = `$${order.mealPrice}`;

        tr.appendChild(imgTd);
        tr.appendChild(nameTd);
        tr.appendChild(priceTd);

        tbody.appendChild(tr);
    });
}

document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const mealName = document.getElementById('mealName').value;
    const mealPrice = document.getElementById('mealPrice').value;
    const mealImage = document.getElementById('mealImage').value;

    const newOrder = new Order(mealName, mealPrice, mealImage);

    const orders = getOrders();
    orders.push(newOrder);
    saveOrders(orders);

    displayOrders();
    this.reset();
});

document.getElementById('clearOrders').addEventListener('click', function() {
    localStorage.removeItem('orders');
    displayOrders();
});

function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

document.getElementById('year').textContent = new Date().getFullYear();

displayOrders();
