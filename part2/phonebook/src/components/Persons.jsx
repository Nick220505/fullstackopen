const Persons = ({ searchedName, persons, deletePerson }) => {
    return (
        <>
            {searchedName === ''
                ? persons.map(person => (
                    <div key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => deletePerson(person)}>
                            delete
                        </button>
                    </div>
                )) : persons.filter(person => person.name.toLowerCase().includes(searchedName.toLowerCase()))
                            .map(person => (
                    <div key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => deletePerson(person)}>
                            delete
                        </button>
                    </div>
                ))
            }
        </>
    )
}

export default Persons
