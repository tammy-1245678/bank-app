const balanceEl = document.getElementById("balance");
const transactionHistoryEl = document.getElementById("transaction-history");
const transactionForm = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");

let transactions = [];

function updateBalance() {
  const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);
  balanceEl.textContent = totalBalance;
}

function updateTransactionHistory() {
  transactionHistoryEl.innerHTML = "";
  transactions.forEach((transaction, index) => {
    const li = document.createElement("li");
    li.classList.add(transaction.amount > 0 ? "positive" : "negative");
    li.innerHTML = `
      ${transaction.description} 
      <span>${transaction.amount > 0 ? "+" : ""}$${transaction.amount.toFixed(2)}</span>
      <button class="delete-btn" data-index="${index}">X</button>
    `;
    transactionHistoryEl.appendChild(li);
  });
}

function addTransaction(e) {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.trim());

  if (description && !isNaN(amount)) {
    transactions.push({ description, amount });
    updateBalance();
    updateTransactionHistory();

    descriptionInput.value = "";
    amountInput.value = "";
  } else {
    alert("Please enter valid details.");
  }
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateBalance();
  updateTransactionHistory();
}

transactionForm.addEventListener("submit", addTransaction);
transactionHistoryEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    deleteTransaction(index);
  }
});

updateBalance();
updateTransactionHistory();
