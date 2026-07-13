import CVWeb from './CVMatias'
import CVPdf from './CVPdf'
import './index.css'

function App() {
  const isPdf = window.location.search.includes('print')
  return isPdf ? <CVPdf /> : <CVWeb />
}

export default App
