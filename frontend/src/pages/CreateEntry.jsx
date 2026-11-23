import React from 'react'
import { createEntries, deleteEntry } from '../services/entriesService'
import { useState } from 'react'
import { useNavigate } from 'react-router'


function CreateEntry() {
    const [formData, setFormData] = useState({
        title:'',
        entryBody: '',
        isPublic: false
    })

    const navigate = useNavigate()

   function handleChange(event) {
  const { name, type, value, checked } = event.target;

  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
}

    async function handleSubmit(event) {
        event.preventDefault()
        console.log('form submitted')

        const createdEntry = await createEntries(formData) 
        navigate('/entries')
    }
    
    
    
  return (
    <div>
        <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>title: </label>
        <input
        type='text'
        name='title'
        id='title'
        value={formData.title}
        onChange={handleChange}/>

        <label>Entry Text:</label>
        <input  type='text'
        name='entryBody'
        id='entryBody'
        value={formData.entryBody}
        onChange={handleChange}/>

        <label>is Public:</label>
        <input  type='checkbox'
        name='isPublic'
        id='isPublic'
        value={formData.isPublic}
        onChange={handleChange}/>

        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateEntry
