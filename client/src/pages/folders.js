import AppLayout from "../components/layout/AppLayout";
import FolderIcon from "../components/fileSystem/folderIcon";
import { useEffect } from "react";
import { getFolders, newFolder, selectFolders, selectIsNewFolderModalOpen, selectNewFolderName, setIsNewFolderModalOpen, setNewFolderName } from "../redux/foldersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import FloatingAddButton from "../components/buttons/FloatingAddButton";
import ModalWindow from "../components/layout/modal";

function Folder() {
    const dispatch = useDispatch();
    const folders = useSelector(selectFolders);
    const newFolderName = useSelector(selectNewFolderName);

    useEffect(() => {
        dispatch(getFolders());
    }, [dispatch]);

    const handleAddFolderClick = () => {
        dispatch(newFolder({name: newFolderName}))
        dispatch(setIsNewFolderModalOpen(false));
        dispatch(setNewFolderName(''));
    }

    const handleHitEnter = (e) => {
        if (e.key === "Enter") {
            dispatch(newFolder({name: newFolderName}))
            dispatch(setIsNewFolderModalOpen(false));
            dispatch(setNewFolderName(''));
        }
    }

    return (
        <div>
            <AppLayout>
                <div className="px-16 py-10">
                    <div className="flex gap-x-8 gap-y-4 flex-wrap">
                        {folders.map((folder) => (
                            <FolderIcon key={folder.folder_id} folderId={folder.folder_id} name={folder.name} />
                        ))}
                    </div>
                </div>
                <FloatingAddButton 
                    onClick={() => dispatch(setIsNewFolderModalOpen(true))}
                />
                <ModalWindow
                    handleOpen={() => dispatch(setIsNewFolderModalOpen(true))}
                    handleClose={() => dispatch(setIsNewFolderModalOpen(false))} 
                    isOpen={useSelector(selectIsNewFolderModalOpen)}
                    header="Create a new folder"
                >
                    <TextField 
                        id="new-folder-name" 
                        variant="outlined" 
                        value={newFolderName} 
                        onChange={(e) => dispatch(setNewFolderName(e.target.value))}
                        label="Folder name"
                        style={{ width: "100%", marginBottom: "1rem" }}
                        onKeyDown={handleHitEnter}
                    />
                    <Button variant="contained" onClick={handleAddFolderClick}>Add</Button>
                </ModalWindow>
                
            </AppLayout>
        </div>
    )
}

export default Folder;