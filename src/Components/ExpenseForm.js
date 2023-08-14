import React, { useEffect, useState } from 'react'
import { addExpenseDoc, readExpenseDoc } from '../api/FirebaseAPI'

function ExpenseForm() {
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  // const [expenses, setExpenses] = useState([])
  
  const categories = [
    '-- Elige una categoria --',
    'Comida',
    'Futbol',
    'Salidas',
    'Cursos',
    'Negocios',
    'Cuidado personal',
    'Auto',
    'Medico',
    'Gadgets',
    'Videojuegos',
    'Libros',
    'Viajes',
    'Regalos',
  ]

  const onSubmit = (e) => {
    e.preventDefault();
    let newExpense = {
      description: description,
      price: price,
      category: category === "Otro" ? newCategory : category
    }
    console.log(newExpense)
    // setExpenses([...expenses, newExpense])
    addExpenseDoc(newExpense).then(
      console.log("Expense has been added")
    )
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description" className="form-label mt-3">Descripcion:</label>
            <input 
              type="text" 
              className="form-control" 
              id="description" 
              placeholder="Playera deportiva Puma talla S..." 
              value={description} 
              onChange={e => setDescription(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="form-label mt-3">Precio:</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input 
                type="text" 
                className="form-control" 
                id="price" 
                placeholder="530"
                value={price}
                onChange={e => setPrice(e.target.value)}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="category" className="form-label mt-3">Categoria:</label>
            <select 
              className="form-control" 
              id="category" 
              value={category}
              onChange={e => setCategory(e.target.value)}>
              {
                categories.sort().map(category => <option key={category} value={category}>{category}</option>)
              }
              <option value={'Otro'}> Otro </option>
            </select>
          </div>
          {
            category === 'Otro' ?
            <div className='form-group'>
              <label htmlFor="newCategory" className="form-label mt-3">Nueva categoria:</label>
              <input 
                type="text" 
                className="form-control" 
                id="newCategory" 
                placeholder="Transporte publico"  
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}/>
            </div> :
            null

          }
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </fieldset>
      </form>
      <ExpensesTable/>
    </>
  )
}

function ExpensesTable() {
  const [expenses, setExpenses] = useState([])
  useEffect(() => {
    readExpenseDoc().then( response => {
      let queryExpenses = []
      response.forEach((doc) => {
        console.log(`Hi from expense\n ${doc.data()}`);
        queryExpenses.push(doc.data())
      });
      setExpenses(queryExpenses);
    })
  }, [])
  console.log(expenses)
  
  return(
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Descripcion</th>
          <th scope="col">Precio</th>
          <th scope="col">Categoria</th>
        </tr>
      </thead>
      <tbody>
        {
          expenses.map(expense => (
            <tr key={expense.description}>
              <td>{expense.description}</td>
              <td>{expense.price}</td>
              <td>{expense.category}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default ExpenseForm