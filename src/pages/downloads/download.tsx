import { fetchFolders } from "../../store/folder/folderApi"
import { JSX, FormEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { FolderModel, selectFolders, selectFolderState } from "../../store/folder/folderStore"
import { State } from "../../store/state"
import { DownloadModel, resetDownloadState, selectDownloadError, selectDownloadState, setDownloadCache } from "../../store/download/downloadStore"
import { submitDownload } from "../../store/download/downloadApi"
import  logo  from "../../files/load.gif"
import { Page, setPage } from "../../store/page/pageStore";
import { delay } from "../../utils/time";

export const Download = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const downloadState = useAppSelector(selectDownloadState)
  const downloadError = useAppSelector(selectDownloadError)
  const folders = useAppSelector(selectFolders)
  const folderState = useAppSelector(selectFolderState)

  useEffect(() => {
    if(downloadState === State.failed) {
      dispatch(setPage(Page.downloadName))
    } else if (downloadState === State.success) {
      delay(1000).then(() => {
        dispatch(resetDownloadState());
      });
    }
    dispatch(fetchFolders())
  }, [downloadState, dispatch])


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const downloadModel: DownloadModel = {
      url: formData.get("downloadLink") as string,
      path: formData.get("folder") as string,
    }

    dispatch(setDownloadCache(downloadModel));
    dispatch(submitDownload(downloadModel));
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
        <input name="downloadLink" type="text" placeholder="Enter download link" className="folderSelect" />
        <select name="folder" className="folderSelect">
          {folders.map((folder: FolderModel) => (
            <option className="folderSelect" key={folder.folder} value={folder.folder}>
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
      <h2>Download Server</h2>
      {content}
      {downloadState === State.loading && <img src={logo} className="loading" alt="Loading...." />}
      {downloadState === State.success && <p>Download successfull.</p>}
      {downloadState === State.failed && <p>Download failed: {downloadError}</p>}
    </div>
  )
}