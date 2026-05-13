import "./App.css"
import { useState } from "react"
import { Download } from "./pages/downloads/download"
import { Delete } from "./pages/delete/delete"
import logo from "./Jellyfin.svg.png"

export const App = () => {
  const [currentPage, setCurrentPage] = useState<'download' | 'delete'>('download')

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li className={`navitem ${currentPage === 'download' ? 'active' : ''}`} onClick={() => { setCurrentPage('download') }}>Download</li>
          <li className={`navitem ${currentPage === 'delete' ? 'active' : ''}`} onClick={() => { setCurrentPage('delete') }}>Delete</li>
        </ul>
      </nav>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {currentPage === 'download' && <Download />}
        {currentPage === 'delete' && <Delete />}
      </header>
    </div>
  )
}