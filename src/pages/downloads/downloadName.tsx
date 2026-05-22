import { JSX, useEffect, SubmitEvent } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { FolderModel, selectFolders, selectFolderState } from "../../store/folder/folderStore"
import { State } from "../../store/state"
import { resetDownloadState, selectDownloadCache } from "../../store/download/downloadStore"
import  logo  from "../../files/load.gif"
import { NamedDownloadModel, resetNamedDownloadState, selectNamedDownloadError, selectNamedDownloadState } from "../../store/namedDownload/namedDownloadStore";
import { submitNamedDownload } from "../../store/namedDownload/namedDownloadAPI";
import { Page, setPage } from "../../store/page/pageStore";
import { delay } from "../../utils/time";

export const DownloadName = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const folders = useAppSelector(selectFolders)
  const folderState = useAppSelector(selectFolderState)
  const namedDownloadState = useAppSelector(selectNamedDownloadState)
  const downloadCache = useAppSelector(selectDownloadCache)
  const namedDownloadError = useAppSelector(selectNamedDownloadError)

    useEffect(() => {
    if(namedDownloadState === State.success) {
      delay(1000).then(() => {
        dispatch(resetDownloadState());
        dispatch(resetNamedDownloadState());
        dispatch(setPage(Page.downloads))
      });
    }
  }, [namedDownloadState, dispatch])


  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const downloadModel: NamedDownloadModel = {
      url: formData.get("downloadLink") as string,
      path: formData.get("folder") as string,
      name: formData.get("name") as string,
    }

    dispatch(submitNamedDownload(downloadModel))
  }

  let content
  if (folderState === State.loading) {
    content = <p>Loading...</p>;
  }
  else if (folderState === State.failed) {
    content = <p>Failed to load folders.</p>;
  }
  else if (folderState === State.success) {
    content = (
      <form onSubmit={handleSubmit} className="folderContainer">
        <input name="name" type="text" placeholder="Enter name for download" className="folderSelect"  />
        <input value={downloadCache?.url} name="downloadLink" type="text" placeholder="Enter download link" className="folderSelect"  />
        <select name="folder" className="folderSelect" defaultValue={downloadCache?.path}>
          {folders.map((folder: FolderModel) => (
            <option className="folderSelect" key={folder.folder} value={folder.folder} autoFocus>
              <strong className="folderOption">{folder.folder}</strong>
            </option>
          ))}
        </select>
        <button type="submit" className="folderSelect">Download</button>
      </form>
    )
  }

  return (
    <div>
      <h2>Enter name for nameless download</h2>
      {content}
      {namedDownloadState === State.loading && <img src={logo} className="loading" alt="Loading...." />}
      {namedDownloadState === State.success && <p>Download successfull.</p>}
      {namedDownloadState === State.failed && <p>Download failed: {namedDownloadError}</p>}
    </div>
  )
}