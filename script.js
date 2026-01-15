document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const ExpenseName = document.getElementById('expense-name');
    const ExpenseAmount = document.getElementById('expense-amount');
    const list = document.getElementById('expense-list');
    const total = document.getElementById('total');
    const totamount = document.getElementById('total-amount');

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let TotalAmount = calculateAmount();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name= ExpenseName.value.trim();
        const amount =parseFloat(ExpenseAmount.value.trim());

        if(name!=""  && !isNaN(amount)  && amount>0){
            const newExpense= {
                id : Date.now();
                name,
                amount
            };
            expenses.push(newExpense);
            saveExpenses();
            updateTotal();

            //clear input
            ExpenseName.value="";
            ExpenseAmount.value="";
        }
    })

    function calculateAmount(){
        return  expenses.reduce( (sum, expense) => sum+ expense.amount  , 0)
    }

    function saveExpenses(){
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal(){
        TotalAmount=calculateAmount();
        
    }
});