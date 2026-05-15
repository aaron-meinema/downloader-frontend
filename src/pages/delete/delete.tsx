import { JSX, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchFolders } from "../../store/folder/folderApi";
import { selectFolders } from "../../store/folder/folderStore";
import "./delete.css"
import { submitDelete } from "../../store/delete/deleteApi";
import { selectDeleteState } from "../../store/delete/deleteStore";
import { State } from "../../store/state";
import logo from "../../files/load.gif"

export const Delete = (): JSX.Element => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchFolders())
    }, [dispatch])

    const folders = useAppSelector(selectFolders);
    const status = useAppSelector(selectDeleteState);

    const handleDelete = async (file_path: string) => {
        const result = await dispatch(submitDelete({ file_path }));
        if(result.meta.requestStatus === "fulfilled") {
            dispatch(fetchFolders());
        }
    }
    let content =
        <div>
            <div>
                <ul className="folder">
                    {folders.map(folder => (
                        <li className="file" key={folder.folder}>
                            {folder.folder} <button className="deleteButton" onClick={() => handleDelete(folder.folder)}>Delete</button>
                            <ul>
                                {folder.files.map(file => (
                                    <li className="file" key={file}>{file} <button className="deleteButton" onClick={() => handleDelete(file)}>Delete</button></li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>


    return (
        <div>
            {content}
            {status === State.loading && <img src={logo} className="loading" alt="Loading...." />}
            {status === State.success && <p>Delete successfull.</p>}
            {status === State.failed && <p>Delete failed</p>}
        </div>
    )
}