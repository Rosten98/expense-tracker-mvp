import { useEffect, useState } from 'react';
import './bootstrap.min.css';
import ExpenseForm from "./Components/ExpenseForm";
import ExpensesTable from './Components/ExpensesTable';
import { addExpenseDoc, readExpenseDoc } from './api/FirebaseAPI';

function App() {
  const [expenses, setExpenses] = useState([])
  
  const addExpense = (expense) => {
    addExpenseDoc(expense).then((value) => {
        alert("Expense has been added")
        console.log(value)
        setExpenses([...expenses, expense])
      }
    )
  }

  useEffect(() => {
    readExpenseDoc().then( response => {
      let queryExpenses = []
      response.forEach((doc) => {
        queryExpenses.push({...doc.data(), "docId": doc.id})
      });
      setExpenses(queryExpenses);
    })
  }, [expenses])
  
  return (
    <div className="App container">
      <h1> Expense Tracker </h1>
      <ExpenseForm addExpense={addExpense}/>
      <ExpensesTable expenses={expenses}/>
    </div>
  );
}

export default App;
