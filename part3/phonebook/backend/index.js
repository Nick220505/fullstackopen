require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Person = require('./models/person')
const cors = require('cors')

morgan.token('data', req => (req.method === 'POST') ? JSON.stringify(req.body) : ' ')

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => response.json(people))
})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        response.send(
            `<p>Phonebook has info for ${people.length} people</p>
            <p>${new Date()}</p>`
        )
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            'error': 'name or number is missing'
        })
    }

    Person.findOne({ name: body.name })
        .then(foundPerson => {
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

app.put('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then(updatedPerson => {
            if (!updatedPerson) {
                response.status(404).end()
            }
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => response.status(204).end())
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))