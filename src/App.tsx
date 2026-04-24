import "./App.css"
import { Download } from "./pages/downloads/download"
import logo from "./Jellyfin.svg.png"

export const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Download />
    </header>
  </div>
)
