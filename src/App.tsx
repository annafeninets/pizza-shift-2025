import { useState } from 'react'
import './App.css'
import PizzaCatalog from './PizzaCatalog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <PizzaCatalog/>
    </>
  )
}

export default App
