document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const ExpenseName = document.getElementById('expense-name');
    const ExpenseAmount = document.getElementById('expense-amount');
    const list = document.getElementById('expense-list');
    const total = document.getElementById('total');
    const totamount = document.getElementById('total-amount');

    let expenses = [];

    let TotalAmount = calculateAmount();
    render();
    updateTotal();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name= ExpenseName.value.trim();
        const amount =parseFloat(ExpenseAmount.value.trim());

        if(name!=""  && !isNaN(amount)  && amount>0){
            const newExpense= {
                id : Date.now(),
                name,
                amount
            };
            expenses.push(newExpense);
            saveExpenses();
            render();
            updateTotal();

            //clear input
            ExpenseName.value="";
            ExpenseAmount.value="";
        }
    })

    function render(){
        list.innerHTML = "";
        expenses.forEach( expense => {
            const li= document.createElement('li');
            li.innerHTML=`
            <span> ${expense.name} - $${expense.amount} </span>
            <button data-id="${expense.id}" class="button" > Remove </button>
            `;

            list.appendChild(li);
        });


    }

    function calculateAmount(){
        return  expenses.reduce( (sum, expense) => sum+ expense.amount  , 0)
    }

    function saveExpenses(){
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function updateTotal(){
        TotalAmount=calculateAmount();
        totamount.textContent = TotalAmount.toFixed(2);
    }

    list.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON'){
           const dataId= parseInt(e.target.getAttribute('data-id')) ;

           expenses= expenses.filter( (expense) =>  expense.id !== dataId);

           saveExpenses();
           render();
           updateTotal();
        }
    })
});