import { useState, useEffect } from "react"
import { useNavigate, useParams  } from "react-router"
import { updateEntry,getEntryById } from "../services/entriesService"

function EditEntries() {
     const [formData, setFormData] = useState({
            title:'',
            entryBody: '',
            isPublic: false
        })
    const {EntryId} = useParams()

     async function loadEntry(){
        const response = await getEntryById(EntryId)
        setFormData(response)
    }

      useEffect(()=>{
        loadEntry()
    },[])

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

        const updatedEntry = await updateEntry(EntryId, formData) 
        navigate('/entries')
    }

  return (
    <div>
        <h1>Edit Product</h1>
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
        checked={formData.isPublic}
        onChange={handleChange}/>

        <button>Edit</button>
      </form>
    </div>
  )
}

export default EditEntries
