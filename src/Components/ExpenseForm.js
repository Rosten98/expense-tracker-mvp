import React, { useState } from 'react'

function ExpenseForm() {
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  
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
    console.log(e.target)
    console.log(description)
    console.log(price)
    console.log(category)
    if(category === "Otro")
      console.log(newCategory)
  }

  return (
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
  )
}

export default ExpenseForm