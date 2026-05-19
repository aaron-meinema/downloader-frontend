import "./App.css"
import { Download } from "./pages/downloads/download"
import { Delete } from "./pages/delete/delete"
import logo from "./Jellyfin.svg.png"
import { Page, selectCurrentPage, setPage } from "./store/page/pageStore";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { DownloadName } from "./pages/downloads/downloadName";

export const App = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectCurrentPage);

  return (
    <div className="App">
      <nav className="navbar">
        <ul>
          <li className={`navitem ${page === Page.downloads ? 'active' : ''}`} onClick={() => { dispatch(setPage(Page.downloads)) }}>Download</li>
          <li className={`navitem ${page === Page.delete ? 'active' : ''}`} onClick={() => { dispatch(setPage(Page.delete)) }}>Delete</li>
        </ul>
      </nav>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {page === Page.downloads && <Download />}
        {page === Page.downloadName && <DownloadName />}
        {page === Page.delete && <Delete />}
      </header>
    </div>
  )
}