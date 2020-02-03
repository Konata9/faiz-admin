import { hot } from 'react-hot-loader/root'
import * as React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { getUser } from './global/epic'

const { useState } = React

const App = () => {

  const [count, useCount] = useState(0)

  const { data, refetch } = useQuery(getUser)

  const handleClick = () => {
    useCount(count + 1)
    refetch()
    console.log(data)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Click it!</button>
    </div>
  )
}

export default hot(App)