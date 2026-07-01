
    /*** FINANCE TRACKER ***/
    const financeForm = document.getElementById('financeForm');
    const financeTableBody = document.getElementById('financeTableBody');
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpenseEl = document.getElementById('totalExpense');
    const balanceEl = document.getElementById('balance');

    let financeData = JSON.parse(localStorage.getItem('financeData')) || [];

    function renderFinanceData() {
        financeTableBody.innerHTML = '';
        let totalIncome = 0;
        let totalExpense = 0;

        financeData.forEach((entry, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.notes}</td>
                <td class="${entry.type === 'income' ? 'accent-text' : 'text-white'}">${entry.type}</td>
                <td class="text-white font-semibold">$${parseFloat(entry.amount).toFixed(2)}</td>
                <td>
                    <button class="pill-btn bg-red-500/20 text-red-400 delete-btn" data-index="${index}">Delete</button>
                </td>
            `;
            financeTableBody.appendChild(row);

            if (entry.type === 'income') {
                totalIncome += parseFloat(entry.amount);
            } else {
                totalExpense += parseFloat(entry.amount);
            }
        });

        totalIncomeEl.textContent = totalIncome.toFixed(2);
        totalExpenseEl.textContent = totalExpense.toFixed(2);
        balanceEl.textContent = (totalIncome - totalExpense).toFixed(2);

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                financeData.splice(index, 1);
                localStorage.setItem('financeData', JSON.stringify(financeData));
                renderFinanceData();
            });
        });
    }

    if (financeForm) {
        financeForm.addEventListener('submit', function (e) {
            e.preventDefault();
       
            const type = document.getElementById('typeFT').value;
            const amount = document.getElementById('amountFT').value;
            const date = document.getElementById('dateFT').value;
            const category = document.getElementById('categoryTF').value;
            const notes = document.getElementById('notesFT').value;
            
            if (!type || !amount || !date) {
                alert('Please fill out required fields');
                return;
            } else{
                    Swal.fire({
                    title: 'Successfully Submitted !',
                    text: 'Thank you for tracking !',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
            }

            const newEntry = { type, amount, date, category, notes };
            financeData.push(newEntry);
            localStorage.setItem('financeData', JSON.stringify(financeData));
            renderFinanceData();
            financeForm.reset();
        });

        renderFinanceData();
    }


//**
// 
// 
//  */

/** Tracker Options **/
const trackerOptions = document.getElementById('BusinessTrackerChoices');

const financeOpt = document.getElementById('finance');
const finanForm = document.getElementById('financeTracker');

const purchaseOpt = document.getElementById('purchase');
const PTform = document.getElementById('purchaseTracker');

const paymentOpt = document.getElementById('payments')
const paymentForm = document.getElementById('PaymentTracker');

const inventoryOpt = document.getElementById('inventory')
const InventoryTrackerForm = document.getElementById('InventoryTracker');

const salesOpt = document.getElementById('sales')
const SalesTrackerForm = document.getElementById('SalesTracker');

const taskManagersOpt = document.getElementById('taskManager')
const TaskManagerForm = document.getElementById('To-Do_TaskManager');

const clientVendorLogOpt = document.getElementById('clientVendorLog')
const ClientVendorLogForm = document.getElementById('ClientVendorLog');

const serviceLogOpt = document.getElementById('serviceLog')
const ServiceLogForm = document.getElementById('ServiceLog');


    const formsMap = {
        finance: document.getElementById("financeTracker"),
        purchase: document.getElementById("purchaseTracker"),
        payments: document.getElementById("PaymentTracker"),
        inventory: document.getElementById("InventoryTracker"),
        sales: document.getElementById("SalesTracker"),
        taskManager: document.getElementById("To-Do_TaskManager"),
        clientVendorLog: document.getElementById("ClientVendorLog"),
        serviceLog: document.getElementById("ServiceLog")
    };

    // Hide all forms
    function hideAllForms() {
        Object.values(formsMap).forEach(form => form.style.display = "none");
    }

    // Show form when clicked
    Object.keys(formsMap).forEach(id => {
        const option = document.getElementById(id);
        if (option) {
            option.addEventListener("click", () => {
                hideAllForms();
                trackerOptions.style.display = "none";
                formsMap[id].style.display = "block";
            });
        }
    });

    // Optionally create a "Back" button in each form
    Object.values(formsMap).forEach(form => {
        const backBtn = document.createElement("button");
        backBtn.innerText = "← Back";
        backBtn.className = "btn-outline text-sm px-4 py-2 mb-5";
        backBtn.addEventListener("click", () => {
            form.style.display = "none";
            trackerOptions.style.display = "block";
        });
        form.prepend(backBtn);
    });

    // Initial state
    hideAllForms();

    // 
    // 
    /**
     * Payment Tracker
     */
   const form = document.getElementById('paymentForm');
    const cardContainer = document.getElementById('paymentCards');

    function loadPayments() {
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        cardContainer.innerHTML = '';

        payments.forEach((payment, index) => {
            const card = document.createElement('div');
            card.className = "data-card";

            card.innerHTML = `
                <p><strong>Date</strong> ${payment.date}</p>
                <p><strong>Type</strong> <span class="accent-text">${payment.type}</span></p>
                <p><strong>Vendor/Client</strong> ${payment.vendorClient}</p>
                <p><strong>Items/Service</strong> ${payment.itemsService}</p>
                <p><strong>Amount</strong> $${parseFloat(payment.amount).toFixed(2)}</p>
                <p><strong>Method</strong> ${payment.method}</p>
                <p><strong>Status</strong> ${payment.status}</p>
                <p><strong>Notes</strong> ${payment.notes}</p>
                <button onclick="deletePayment(${index})" class="pill-btn bg-red-500/20 text-red-400 mt-3">Delete</button>
            `;

            cardContainer.appendChild(card);
        });
    }

    function deletePayment(index) {
        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.splice(index, 1);
        localStorage.setItem('payments', JSON.stringify(payments));
        loadPayments();
    }

    form.addEventListener('submit', (e) => {

        e.preventDefault();

    

        const payment = {
            date: document.getElementById('date').value,
            type: document.getElementById('paymentType').value,
            vendorClient: document.getElementById('vendorClient').value,
            itemsService: document.getElementById('itemsService').value,
            amount: document.getElementById('amount').value,
            method: document.getElementById('paymentMethodPay').value,
            status: document.getElementById('statusPay').value,
            notes: document.getElementById('notesPay').value,
        };

       
            if (!payment.date || !payment.type || !payment.vendorClient|| !payment.itemsService || !payment.amount || !payment.method || !payment.status) {
                    alert('ERRR!')
                    return;
        } else {
                  Swal.fire({
                    title: 'Successfully Submitted !',
                    text: 'Thank you for tracking !',
                    icon: 'success',
                    confirmButtonText: 'Close'
                })
        }

        const payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(payments));

        form.reset();
        loadPayments();
    });

    document.addEventListener('DOMContentLoaded', loadPayments);
    // 
    // 
    /**
     * Task Manager
     */
   const todoForm = document.getElementById('todoForm');
    const taskCards = document.getElementById('taskCards');
    const totalTasks = document.getElementById('totalTasks');

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskCards.innerHTML = '';

        tasks.forEach((task, index) => {
            const card = document.createElement('div');
            card.className = "data-card";

            card.innerHTML = `
                <p><strong>Task</strong> ${task.taskName}</p>
                <p><strong>Category</strong> ${task.category}</p>
                <p><strong>Due</strong> ${task.dueDate} at ${task.dueTime}</p>
                <p><strong>Priority</strong> ${task.priority}</p>
                <p><strong>Status</strong> <span id="status-${index}" class="badge badge-accent">${task.status}</span></p>
                <p><strong>Completed</strong> ${task.completionDate || '—'}</p>
                <p><strong>Notes</strong> ${task.notes}</p>
                <div class="flex flex-wrap gap-2 mt-3">
                    <button onclick="updateStatus(${index}, 'Completed')" class="pill-btn bg-[var(--accent-soft)] accent-text">Complete</button>
                    <button onclick="updateStatus(${index}, 'In-Progress')" class="pill-btn bg-white/10 text-white">In Progress</button>
                    <button onclick="updateStatus(${index}, 'Pending')" class="pill-btn bg-white/10 text-white">Pending</button>
                    <button onclick="deleteTask(${index})" class="pill-btn bg-red-500/20 text-red-400">Delete</button>
                </div>
            `;

            taskCards.appendChild(card);
        });

        totalTasks.textContent = `Total Tasks: ${tasks.length}`;
    }

    function deleteTask(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }

    function updateStatus(index, newStatus) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].status = newStatus;
        if (newStatus === 'Completed' && !tasks[index].completionDate) {
            tasks[index].completionDate = new Date().toISOString().split('T')[0];
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();

    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = {
            taskName: document.getElementById('taskName').value,
            category: document.getElementById('categoryTD').value,
            dueDate: document.getElementById('dueDate').value,
            dueTime: document.getElementById('dueTime').value,
            priority: document.getElementById('priority').value,
            status: document.getElementById('statusTD').value,
            completionDate: document.getElementById('completionDate').value,
            notes: document.getElementById('notesTD').value,
        };

         if (!task.taskName || !task.category|| !task.dueDate || !task.dueTime|| !task.priority|| !task.status) {
            alert('PLease fill in the blanks');
            return;
        } else {
                Swal.fire({
                title: 'Successfully Submitted !',
                text: 'Thank you for tracking !',
                icon: 'success',
                confirmButtonText: 'Close'
                })
        }

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        form.reset();
        loadTasks();
    });

    document.addEventListener('DOMContentLoaded', loadTasks);

    // 
    // 
    // 
    /** Inventory */
     const inventoryForm = document.getElementById('inventoryForm');
    const inventoryCards = document.getElementById('inventoryCards');

    function loadInventory() {
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventoryCards.innerHTML = '';

        inventory.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = "data-card";

            card.innerHTML = `
                <p><strong>Item</strong> ${item.itemName}</p>
                <p><strong>Category</strong> ${item.category}</p>
                <p><strong>Qty In Stock</strong> ${item.quantity} ${item.unit}</p>
                <p><strong>Cost Per Unit</strong> ${item.cost}</p>
                <p><strong>Supplier</strong> ${item.vendor}</p>
                <p><strong>Purchase Date</strong> ${item.purchaseDate}</p>
                <p><strong>Restock Level</strong> ${item.restockLevel}</p>
                <p><strong>Last Updated</strong> ${item.lastUpdated}</p>
                <p><strong>Notes</strong> ${item.notes}</p>
                <button onclick="deleteInventory(${index})" class="pill-btn bg-red-500/20 text-red-400 mt-3">Delete</button>
            `;

            inventoryCards.appendChild(card);
        });
    }

    function deleteInventory(index) {
        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.splice(index, 1);
        localStorage.setItem('inventory', JSON.stringify(inventory));
        loadInventory();
    }

    inventoryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const item = {
            itemName: document.getElementById('itemName').value,
            category: document.getElementById('categoryINV').value,
            quantity: document.getElementById('quantity').value,
            unit: document.getElementById('unit').value,
            cost: document.getElementById('cost').value,
            vendor: document.getElementById('vendor').value,
            purchaseDate: document.getElementById('purchaseDate').value,
            restockLevel: document.getElementById('restockLevel').value,
            lastUpdated: document.getElementById('lastUpdated').value,
            notes: document.getElementById('notesINV').value,
        };
        
        if (!item.itemName || !item.category|| !item.quantity|| !item.unit|| !item.cost|| !item.purchaseDate) {
            alert('PLease fill in the blanks');
            return;
        } else {
                Swal.fire({
                title: 'Successfully Submitted !',
                text: 'Thank you for tracking !',
                icon: 'success',
                confirmButtonText: 'Close'
                })
        }

        const inventory = JSON.parse(localStorage.getItem('inventory')) || [];
        inventory.push(item);
        localStorage.setItem('inventory', JSON.stringify(inventory));

        inventoryForm.reset();
        loadInventory();
    });

    document.addEventListener('DOMContentLoaded', loadInventory);
    // 
    // 
    // 
    /*** Sales */

const salesForm = document.getElementById('salesForm');
const salesCards = document.getElementById('salesCards');
const salesTotalDisplay = document.getElementById('salesTotalDisplay');

// Optional total field (auto-update)
const quantityInput = document.getElementById('quantitySold');
const priceInput = document.getElementById('pricePerUnit');

function formatCurrency(amount) {
    return `$${parseFloat(amount).toFixed(2)}`;
}

function calculateAndDisplayTotalSales(sales) {
    const total = sales.reduce((sum, sale) => sum + parseFloat(sale.totalSales), 0);
    salesTotalDisplay.textContent = `Total Sales: ${formatCurrency(total)}`;
}

function deleteSale(index) {
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    sales.splice(index, 1);
    localStorage.setItem('sales', JSON.stringify(sales));
    loadSales();
}

function loadSales() {
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    salesCards.innerHTML = '';

    sales.forEach((sale, index) => {
        const card = document.createElement('div');
        card.className = "data-card";

        card.innerHTML = `
            <p><strong>Date</strong> ${sale.date}</p>
            <p><strong>Item</strong> ${sale.item}</p>
            <p><strong>Quantity</strong> ${sale.quantity}</p>
            <p><strong>Price Per Unit</strong> ${formatCurrency(sale.unitPrice)}</p>
            <p><strong>Total Sale</strong> <span class="accent-text font-semibold">${formatCurrency(sale.totalSales)}</span></p>
            <p><strong>Customer</strong> ${sale.customer}</p>
            <p><strong>Address</strong> ${sale.address}</p>
            <p><strong>Phone</strong> ${sale.phone}</p>
            <p><strong>Payment</strong> ${sale.paymentMethod}</p>
            <p><strong>Receipt Issued</strong> ${sale.receipt}</p>
            <p><strong>Notes</strong> ${sale.notes}</p>
            <button onclick="deleteSale(${index})" class="pill-btn bg-red-500/20 text-red-400 mt-3">Delete</button>
        `;

        salesCards.appendChild(card);
    });

    calculateAndDisplayTotalSales(sales);
}

salesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const quantity = parseInt(document.getElementById('quantitySold').value);
    const unitPrice = parseFloat(document.getElementById('pricePerUnit').value.replace(/[^0-9.]/g, '')) || 0;
    const totalSales = quantity * unitPrice;

    const sale = {
        date: document.getElementById('saleDate').value,
        item: document.getElementById('itemsSold').value,
        quantity,
        unitPrice,
        totalSales,
        customer: document.getElementById('customerName').value,
        address: document.getElementById('customerAddress').value,
        phone: document.getElementById('customerPhone').value,
        paymentMethod: document.getElementById('paymentMethodSale').value,
        receipt: document.getElementById('receiptIssued').value,
        notes: document.getElementById('notesSale').value,
    };

          if (!sale.date || !sale.item|| !sale.quantity|| !sale.unitPrice|| !sale.customer|| !sale.address|| !sale.phone|| !sale.paymentMethod) {
            alert('PLease fill in the blanks');
            return;
        } else {
                Swal.fire({
                title: 'Successfully Submitted !',
                text: 'Thank you for tracking !',
                icon: 'success',
                confirmButtonText: 'Close'
                 })
         }

    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    sales.push(sale);
    localStorage.setItem('sales', JSON.stringify(sales));

    salesForm.reset();
    loadSales();
});

function autoUpdateTotalInput() {
    const qty = parseFloat(quantityInput.value);
    const price = parseFloat(priceInput.value.replace(/[^0-9.]/g, ''));
    const totalInput = document.getElementById('totalSalesInput');
    if (!isNaN(qty) && !isNaN(price) && totalInput) {
        totalInput.value = `$${(qty * price).toFixed(2)}`;
    }
}

quantityInput.addEventListener('input', autoUpdateTotalInput);
priceInput.addEventListener('input', autoUpdateTotalInput);

document.addEventListener('DOMContentLoaded', loadSales);

//
//
//
/*** Purchase Tracker ***/

const purchaseForm = document.getElementById('purchaseForm');
const purchaseCards = document.getElementById('purchaseCards');
const purchaseTotalDisplay = document.getElementById('purchaseTotalDisplay');

function calculateAndDisplayTotalPurchases(purchases) {
    const total = purchases.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
    purchaseTotalDisplay.textContent = `Total Purchases: ${formatCurrency(total)}`;
}

function loadPurchases() {
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    purchaseCards.innerHTML = '';

    purchases.forEach((purchase, index) => {
        const card = document.createElement('div');
        card.className = "data-card";

        card.innerHTML = `
            <p><strong>Date</strong> ${purchase.date}</p>
            <p><strong>Vendor</strong> ${purchase.vendor}</p>
            <p><strong>Items</strong> ${purchase.items}</p>
            <p><strong>Category</strong> ${purchase.category}</p>
            <p><strong>Payment Method</strong> ${purchase.paymentMethod}</p>
            <p><strong>Amount</strong> <span class="accent-text font-semibold">${formatCurrency(purchase.amount)}</span></p>
            <p><strong>Purpose</strong> ${purchase.purpose}</p>
            <p><strong>Receipt</strong> ${purchase.receiptName || '—'}</p>
            <button onclick="deletePurchase(${index})" class="pill-btn bg-red-500/20 text-red-400 mt-3">Delete</button>
        `;

        purchaseCards.appendChild(card);
    });

    calculateAndDisplayTotalPurchases(purchases);
}

function deletePurchase(index) {
    const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    purchases.splice(index, 1);
    localStorage.setItem('purchases', JSON.stringify(purchases));
    loadPurchases();
}

if (purchaseForm) {
    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const receiptFile = document.getElementById('reciptPT').files[0];

        const purchase = {
            date: document.getElementById('DatePT').value,
            vendor: document.getElementById('vendorPT').value,
            items: document.getElementById('ItemsPT').value,
            category: document.getElementById('CategoryPT').value,
            paymentMethod: document.getElementById('PayMethodPT').value,
            amount: document.getElementById('amountPT').value.replace(/[^0-9.]/g, ''),
            purpose: document.getElementById('BusPurposePT').value,
            receiptName: receiptFile ? receiptFile.name : '',
        };

        if (!purchase.date || !purchase.vendor || !purchase.items || !purchase.category || !purchase.paymentMethod || !purchase.amount) {
            alert('Please fill in the blanks');
            return;
        } else {
            Swal.fire({
                title: 'Successfully Submitted !',
                text: 'Thank you for tracking !',
                icon: 'success',
                confirmButtonText: 'Close'
            })
        }

        const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
        purchases.push(purchase);
        localStorage.setItem('purchases', JSON.stringify(purchases));

        purchaseForm.reset();
        loadPurchases();
    });

    document.addEventListener('DOMContentLoaded', loadPurchases);
}

//
//
//
/*** Client / Vendor Log ***/

const clientVendorForm = document.getElementById('clientVendorForm');
const clientVendorCards = document.getElementById('clientVendorCards');

function loadClients() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    clientVendorCards.innerHTML = '';

    clients.forEach((client, index) => {
        const card = document.createElement('div');
        card.className = "data-card";

        card.innerHTML = `
            <p class="badge badge-accent inline-block mb-2">${client.type}</p>
            <p><strong>Name</strong> ${client.name}</p>
            <p><strong>Business</strong> ${client.businessName || '—'}</p>
            <p><strong>Phone</strong> ${client.phone || '—'}</p>
            <p><strong>Email</strong> ${client.email || '—'}</p>
            <p><strong>Address</strong> ${client.address || '—'}</p>
            <p><strong>Payment Terms</strong> ${client.paymentTerms || '—'}</p>
            <p><strong>Tags</strong> ${client.tags || '—'}</p>
            <p><strong>Notes</strong> ${client.transactionNote || '—'}</p>
            <p><strong>Last Contacted</strong> ${client.lastContacted || '—'}</p>
            <button onclick="deleteClient(${index})" class="pill-btn bg-red-500/20 text-red-400 mt-3">Delete</button>
        `;

        clientVendorCards.appendChild(card);
    });
}

function deleteClient(index) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.splice(index, 1);
    localStorage.setItem('clients', JSON.stringify(clients));
    loadClients();
}

if (clientVendorForm) {
    clientVendorForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const client = {
            name: document.getElementById('clientName').value,
            type: document.getElementById('clientType').value,
            businessName: document.getElementById('clientBusinessName').value,
            phone: document.getElementById('clientPhone').value,
            email: document.getElementById('clientEmail').value,
            address: document.getElementById('clientAddress').value,
            paymentTerms: document.getElementById('clientPaymentTerms').value,
            tags: document.getElementById('clientTags').value,
            transactionNote: document.getElementById('clientTransactionNote').value,
            lastContacted: document.getElementById('clientLastContacted').value,
        };

        if (!client.name || !client.type) {
            alert('Please fill in the blanks');
            return;
        } else {
            Swal.fire({
                title: 'Successfully Submitted !',
                text: 'Thank you for tracking !',
                icon: 'success',
                confirmButtonText: 'Close'
            })
        }

        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        clients.push(client);
        localStorage.setItem('clients', JSON.stringify(clients));

        clientVendorForm.reset();
        loadClients();
    });

    document.addEventListener('DOMContentLoaded', loadClients);
}

//
//
//
/*** Service Log ***/

const serviceForm = document.getElementById('serviceForm');
const serviceCards = document.getElementById('serviceCards');

function loadServices() {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    serviceCards.innerHTML = '';

    services.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = "data-card";

        card.innerHTML = `
            <p class="badge badge-accent inline-block mb-2">${service.type}</p>
            <p><strong>Date</strong> ${service.date}</p>
            <p><strong>Client</strong> ${service.clientName}</p>
            <p><strong>Description</strong> ${service.description}</p>
            <p><strong>Cost/Fee</strong> ${formatCurrency(service.cost || 0)}</p>
            <p><strong>Payment Status</strong> ${service.paymentStatus}</p>
            <p><strong>Materials Used</strong> ${service.materials || '—'}</p>
            <p><strong>Assigned Staff</strong> ${service.staff || '—'}</p>
            <p><strong>Outcome</strong> ${service.outcome || '—'}</p>
            <p><strong>Receipt</strong> ${service.receiptName || '—'}</p>
            <p><strong>Notes</strong> ${service.notes || '—'}</p>
            <button onclick="deleteService(${index})" class="pill-btn bg-red-500/20 text-red-400 mt-3">Delete</button>
        `;

        serviceCards.appendChild(card);
    });
}

function deleteService(index) {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    services.splice(index, 1);
    localStorage.setItem('services', JSON.stringify(services));
    loadServices();
}

if (serviceForm) {
    serviceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const receiptFile = document.getElementById('serviceReceipt').files[0];

        const service = {
            date: document.getElementById('serviceDate').value,
            clientName: document.getElementById('serviceClientName').value,
            type: document.getElementById('serviceType').value,
            description: document.getElementById('serviceDescription').value,
            cost: document.getElementById('serviceCost').value.replace(/[^0-9.]/g, ''),
            paymentStatus: document.getElementById('servicePaymentStatus').value,
            materials: document.getElementById('serviceMaterials').value,
            staff: document.getElementById('serviceStaff').value,
            outcome: document.getElementById('serviceOutcome').value,
            receiptName: receiptFile ? receiptFile.name : '',
            notes: document.getElementById('serviceNotes').value,
        };

        if (!service.date || !service.clientName || !service.type || !service.description || !service.cost) {
            alert('Please fill in the blanks');
            return;
        } else {
            Swal.fire({
                title: 'Successfully Submitted !',
                text: 'Thank you for tracking !',
                icon: 'success',
                confirmButtonText: 'Close'
            })
        }

        const services = JSON.parse(localStorage.getItem('services')) || [];
        services.push(service);
        localStorage.setItem('services', JSON.stringify(services));

        serviceForm.reset();
        loadServices();
    });

    document.addEventListener('DOMContentLoaded', loadServices);
}
