// Function to update the order list on the HTML page
function updateOrderList(items) {
    const orderListContainer = document.getElementById('orderList');
    if (items.length > 0) {
        const itemList = items.map(item => `${item.count}x ${item.name}`).join('<br>');
        orderListContainer.innerHTML = itemList;
    } else {
        orderListContainer.innerHTML = 'No items selected.';
    }
}

// Function to send data to the server and handle the response
function sendDataToServer(selectedItems) {
    // Make a POST request to send data to the server
    fetch('https://veetoo27.github.io/Resturant/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedItems)
    })
    .then(response => response.json())
    .then(data => {
        // Process the response from the server if needed
        console.log('Response from server:', data);
    })
    .catch(error => {
        console.error('Error sending data to server:', error);
    });
}

// Function to handle checkout button click event
function handleCheckout() {
    let selectedItems = [];
    document.querySelectorAll('.menu-item').forEach(item => {
        const itemName = item.querySelector('h3').textContent;
        const itemCount = parseInt(item.querySelector('.item-count').textContent);
        if (itemCount > 0) {
            selectedItems.push({ name: itemName, count: itemCount });
        }
    });

    if (selectedItems.length > 0) {
        sendDataToServer(selectedItems);
    } else {
        alert('No items selected.');
    }
}

// Update the order list when the page loads
window.onload = function() {
    updateOrderList([]); // Initialize with empty list
    document.getElementById('checkout-button').addEventListener('click', handleCheckout);
};
