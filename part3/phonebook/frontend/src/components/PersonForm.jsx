const PersonForm = ({ addPerson, newName, newNumber, handleNewNameChange, handleNewNumberChange }) => (
    <form onSubmit={addPerson}>
        <div>
            name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
            number: <input value={newNumber} onChange={handleNewNumberChange}  />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm
