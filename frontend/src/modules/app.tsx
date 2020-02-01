import { hot } from 'react-hot-loader/root'
import * as React from 'react'

const { useState } = React

const App = () => {

  const [count, useCount] = useState(0)

  const handleClick = () => {
    useCount(count + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click it!</button>
    </div>
  )
}

export default hot(App)