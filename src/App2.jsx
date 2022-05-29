import './App.css'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  return (
    <div className="App">
      hello world
      <h1> hello world</h1>
      <h1> hello world</h1>
      <h1> hello world</h1>
      <h1> hello world</h1>
      <h1> hello world</h1>
      <button onClick={() => navigate('/')}>click to app1</button>
    </div>
  )
}

export default App
