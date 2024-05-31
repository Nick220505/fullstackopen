const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('must provide either three or five arguments')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://Nick220505:${password}@cluster0.fseupdu.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(people => {
    if (people.length > 0) {
      console.log('phonebook:')
      people.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
    } else {
      console.log('No people found')
    }
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(savedPerson => {
    console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook`)
    mongoose.connection.close()
  })
}
