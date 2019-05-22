function addShop() {
    const editBtn = document.createElement("button");
    editBtn.innerText = 'Edit';
    editBtn.classList.add("btn", "btn-outline-primary", "rounded-pill", "float-right", "mr-1");
    editBtn.type = "button";
    editBtn.dataset.toggle = "modal";
    editBtn.dataset.target = "#editModal";
    editBtn.addEventListener("click", editShop);
    
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = 'Delete';
    deleteBtn.classList.add("btn", "btn-outline-danger", "rounded-pill", "float-right");
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", deleteShop);

    const div = document.createElement("div");
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);
    
    const liEl = document.createElement("li");
    liEl.classList.add("list-group-item", "list-group-item-action", "d-flex", "justify-content-between", "align-items-center");
    liEl.innerText = document.getElementById("new-shop-name").value;
    liEl.addEventListener("click", showProducts);
    const li = document.getElementById("shopList").appendChild(liEl);
    li.appendChild(div);

    document.getElementById("new-shop-name").value = '';

    const tbody = document.createElement("tbody");
    tbody.setAttribute("id", li.firstChild.textContent.replace(/\s+/g, ''));
    tbody.setAttribute("style", "display: none");
    document.getElementById("products-table").insertBefore(tbody, document.getElementById("total-price-row"));
}

let editEl;
function editShop() {
    const currentName = event.target.parentElement.previousSibling.textContent.trim();
    document.getElementById("shop-name").value = currentName;
    editEl = event.target.parentElement.previousSibling;
}

function saveName() {
    editEl.textContent = document.getElementById("shop-name").value;
}

function deleteShop() {
    event.stopPropagation();
    const li = event.target.parentElement.parentElement;
    const tbody = document.getElementById(li.firstChild.textContent.replace(/\s+/g, ''));

    tbody.parentElement.removeChild(tbody);
    li.parentElement.removeChild(li);
    document.getElementById("products").style.display = 'none';
}

let activeShopId;
function showProducts() {
    document.getElementById("products").style.display = 'block';
    activeShopId = event.target.firstChild.textContent.replace(/\s+/g, '');
    document.getElementById(activeShopId).style.display = 'contents';
    calculateTotalPrice();

    const table = document.getElementById("products-table").children;

    for (let i = 1; i < table.length - 1; i ++) {
        if (table[i].id !== activeShopId) {
            table[i].style.display = 'none';
        }
    }
}

function addProduct() {
    const activeBody = document.getElementById(activeShopId);
    const row = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.innerText = document.getElementById("new-product-name").value;
    document.getElementById("new-product-name").value = '';

    const tdQty = document.createElement("td");
    tdQty.innerText = document.getElementById("new-product-qty").value;
    tdQty.classList.add("border-left", "border-right", "text-center");
    document.getElementById("new-product-qty").value = '';

    const tdPrice = document.createElement("td");
    tdPrice.innerText = '$' + document.getElementById("new-product-price").value;
    tdPrice.classList.add("text-center");
    document.getElementById("new-product-price").value = '';

    row.appendChild(tdName);
    row.appendChild(tdQty);
    row.appendChild(tdPrice);

    activeBody.appendChild(row);
    calculateTotalPrice();
}

function calculateTotalPrice() {
    const rows = document.getElementById(activeShopId).children;
    let totalPrice = 0;

    for (let i = 0; i < rows.length; i ++) {
        totalPrice += rows[i].children[1].innerText * rows[i].children[2].innerText.slice(1);
    }

    document.getElementById("total-price-row").children[0].children[2].innerHTML = 'Total Price' + '<br/>' + '$' + totalPrice;
}
