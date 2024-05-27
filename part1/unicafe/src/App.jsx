import { useState } from 'react'

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={`${positive} %`} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleFeedback = (feedback) => () => {
    let updatedGood = good
    let updatedNeutral = neutral
    let updatedBad = bad
    switch (feedback) {
      case 'good':
        updatedGood++
        setGood(updatedGood)
        break
      case 'neutral':
        updatedNeutral++
        setNeutral(updatedNeutral)
        break
      case 'bad':
        updatedBad++
        setBad(updatedBad)
        break
    }
    const updatedAll = updatedGood + updatedNeutral + updatedBad
    setAll(updatedAll)
    setAverage((updatedGood * 1 + updatedNeutral * 0 + updatedBad * -1) / updatedAll)
    setPositive((updatedGood * 100) / updatedAll)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={handleFeedback('good')} />
      <Button text='neutral' onClick={handleFeedback('neutral')} />
      <Button text='bad' onClick={handleFeedback('bad')} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App
