import React from 'react'
import { useState,useEffect } from 'react'
import { getMyEntries } from '../services/entriesService'
import { useAuth } from '../context/AuthContext'

function MyEntries() {
    const [entries,setEntries]=useState([])
    async function loadEntries() {
        const response = await getMyEntries()
        setEntries(response)
    }
    useEffect(()=>{loadEntries()},[])
  return (
    <div >
      <h1>my entries</h1>
      {entries.map((one)=><div key={one._id}>
        <p>{one.title}</p>
      </div>)}
    </div>
  )
}

export default MyEntries
