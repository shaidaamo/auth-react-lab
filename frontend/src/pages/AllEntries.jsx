import React from 'react'
import { useState,useEffect } from 'react'
import { loadEntries, deleteEntry } from '../services/entriesService'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router'
import { useNavigate  } from "react-router"


function AllEntries() {
    const {user} = useAuth()
 const [ Entries ,setEntries] = useState([])
async function loadEntry() {
  const response = await loadEntries()
setEntries(response)
}

useEffect(()=>{loadEntry()},[])
const navigate = useNavigate()
 async function handleDelete(EntryId){
        await deleteEntry(EntryId)
        await loadEntry()
    }

    
  return (
    <div>
      <h1>All entries</h1>
      {Entries.map((one)=><div key={one._id}>
        <p>{one.title}</p>
        {user?._id === one.owner ? (
            <>
            <button onClick={()=> handleDelete(one._id)}>Delete</button>
            <Link to={`/${one._id}/edit`}>Edit</Link>
            </>
        ) : null}
            
      </div>)}
    </div>
  )
}

export default AllEntries
