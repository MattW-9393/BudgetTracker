## 🛠️ Budget Tracker: High-Level Steps (Vanilla JS)

### **1. Plan the App**

* Define key features: add income/expenses, view transactions, see total balance.
* Decide the data format (e.g., array of objects for transactions).

---

### **2. Build the UI (HTML/CSS)**

* Create the structure:

  * A form for entering transactions (description, amount, category).
  * A section to display the list of transactions.
  * A summary area (total income, expenses, balance).
* Style it enough to make it clean and readable (keep it minimal to focus on logic).

---

### **3. Handle Form Input (JS)**

* Capture the input on submit.
* Validate the data (e.g., amount must be a number).
* Store each transaction in an in-memory array.

---

### **4. Display the Transactions**

* Use JavaScript to render the transactions list from your array.
* Add a delete button for each entry and hook it up to remove that transaction.

---

### **5. Calculate and Display Totals**

* Use array methods like `reduce()` to compute:

  * Total income
  * Total expenses
  * Net balance
* Update the DOM with these values each time data changes.

---

### **6. Persist Data with localStorage**

* Save the transactions array to `localStorage` whenever it changes.
* Load and display stored data when the app starts.

---

### **7. Add Optional Features**

* Filter by month or category
* Sort transactions
* Show spending pie chart (e.g., using Chart.js)
* Add a dark mode toggle

---

### **8. Clean Up and Deploy**

* Refactor repetitive code into functions/modules.
* Add error handling and input feedback.
* Host it with Netlify or GitHub Pages for practice.

---
