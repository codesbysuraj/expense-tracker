document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseTableBody = document.querySelector('#expense-table tbody');
    const expenseSummary = document.getElementById('expense-summary');

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    const renderExpenses = () => {
        expenseTableBody.innerHTML = '';
        expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>${expense.date}</td>
                <td>${expense.category}</td>
            `;
            expenseTableBody.appendChild(row);
        });
    };

    const renderSummary = () => {
        const summary = expenses.reduce((acc, expense) => {
            acc.total += expense.amount;
            acc.categories[expense.category] = (acc.categories[expense.category] || 0) + expense.amount;
            return acc;
        }, { total: 0, categories: {} });

        expenseSummary.innerHTML = `
            <p>Total Expenses: $${summary.total.toFixed(2)}</p>
            ${Object.entries(summary.categories).map(([category, amount]) => `<p>${category}: $${amount.toFixed(2)}</p>`).join('')}
        `;
    };

    const addExpense = (expense) => {
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
        renderSummary();
    };

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        const date = document.getElementById('expense-date').value;
        const category = document.getElementById('expense-category').value;

        if (name && !isNaN(amount) && date && category) {
            addExpense({ name, amount, date, category });
            expenseForm.reset();
        }
    });

    renderExpenses();
    renderSummary();
});
