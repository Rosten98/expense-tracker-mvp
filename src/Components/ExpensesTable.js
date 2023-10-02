import React from 'react'

const ExpensesTable = ({expenses}) => {
  // console.log(expenses, new Date())
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
            <tr key={expense.docId}>
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

export default ExpensesTable