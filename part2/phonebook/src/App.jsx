import { useState, useEffect } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchedName, setSearchedName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSearchedName = event => setSearchedName(event.target.value)
  const handleNewNameChange = event => setNewName(event.target.value)
  const handleNewNumberChange = event => setNewNumber(event.target.value)

  const addPerson = event => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson && newNumber === '') {
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (existingPerson) {
      if (confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        updateNumber(existingPerson.id, newNumber)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${newPerson.name}`, 'success')
      })
  }

  const updateNumber = (id, updatedNumber) => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number: updatedNumber }

    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p))
        showNotification(`Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`, 'success')
      })
      .catch(error => {
        showNotification(`Information of ${person.name} has already been removed from the server`, 'error')
      })
  }

  const deletePerson = person => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .drop(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    }
  }

  const showNotification = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType('')
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {message && <Notification message={message} type={messageType} />}
      <Filter
        searchedName={searchedName}
        handleSearchedName={handleSearchedName}
      />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        searchedName={searchedName}
        persons={persons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
