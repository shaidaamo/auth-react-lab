import api from "./api";

async function getMyEntries() {
    const response = await api.get('/entries/my-entries')
    return response.data
}

async function getEntryById(EntryId){
    const response = await api.get(`/entries/${EntryId}`)
    return response.data
}
 
async function loadEntries() {
  const response = await api.get('/entries')
  return response.data
}

async function createEntries(entrydata) {
  const response = await api.post('/entries',entrydata)
  return response.data
}

async function updateEntry(EntryId,entryBody){
    const response = await api.put(`/entries/${EntryId}`,entryBody)
    return response.data
}

async function deleteEntry(EntryId) {
      const response = await api.delete(`/entries/${EntryId}`)
      return response.data
    }

    


export {
    getMyEntries,
    loadEntries,
    createEntries,
    deleteEntry,
    updateEntry,
    getEntryById
}