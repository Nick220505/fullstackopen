require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

morgan.token('data', req => (req.method === 'POST') ? JSON.stringify(req.body) : ' ')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        response.send(
            `<p>Phonebook has info for ${people.length} people</p>
            <p>${new Date()}</p>`
        )
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id).then(deletedPerson => {
        response.status(204).end()
    })
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            'error': 'name or number is missing'
        })
    }

    Person.findOne({ name: body.name }).then(foundPerson => {
        if (!foundPerson) {
            const person = new Person({
                name: body.name,
                number: body.number,
            })
            person.save().then(savedPerson => {
                response.json(person)
            })
        } else {
            response.status(400).json({
                'error': 'name must be unique'
            })
        }
    })
})

app.put('/api/persons/:id', (request, response) => {
    const id = request.params.id

    if (!id) {
        return response.status(400).json({
            'error': 'id missing'
        })
    }

    Person.findByIdAndUpdate(id, request.body).then(updatedPerson => {
        response.json(updatedPerson)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})