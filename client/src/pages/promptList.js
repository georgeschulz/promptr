import AppLayout from "../components/layout/AppLayout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPromptThunk, deletePromptThunk, duplicatePromptThunk, fetchPromptsThunk, selectPrompts } from "../redux/promptsSlice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import FloatingAddButton from "../components/buttons/FloatingAddButton";
import { deleteFolderThunk, getFolders, selectFolders, selectUpdatedFolderName, selectIsFolderNameEditable, updateFolderNameThunk, toggleIsFolderNameEditable, setUpdatedFolderName } from "../redux/foldersSlice";
import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import Tooltip from '@mui/material/Tooltip';
import { updatePromptFolderThunk } from "../redux/foldersSlice";
import ModalWindow from "../components/layout/modal";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function PromptList() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const prompts = useSelector(selectPrompts);
    const promptList = prompts.filter(prompt => prompt.folder_id === Number(id));
    const folders = useSelector(selectFolders);
    const folder = folders.find(folder => folder.folder_id === Number(id));
    const isFolderEditable = useSelector(selectIsFolderNameEditable)
    const updatedFolderName = useSelector(selectUpdatedFolderName);
    const [moveModalOpen, setMoveModalOpen] = useState(false);
    const [newFolder, setNewFolder] = useState("");
    const [promptId, setPromptId] = useState("");

    useEffect(() => {
        dispatch(fetchPromptsThunk());
        dispatch(getFolders())
    }, [dispatch]);

    const handlePromptClick = (promptId) => {
        navigate(`/prompts/${promptId}`);
    }

    const handleDeleteFolder = () => {
        if(promptList.length == 0) {
            dispatch(deleteFolderThunk({ id }));
            navigate("/folders");
        } else {
            alert("Please delete all prompts in this folder before deleting the folder.")
        }
        
    }

    const handleFolderMove = (promptId) => {
        setPromptId(promptId);
        setMoveModalOpen(true);
    }

    const handleFolderSubmit = () => {
        dispatch(updatePromptFolderThunk({ id: promptId, folderId: newFolder }))
        setMoveModalOpen(false);
        dispatch(fetchPromptsThunk());
    }

    const handleFolderNameUpdateSubmit = () => {
        dispatch(updateFolderNameThunk({ id, folderName: updatedFolderName }))
        dispatch(toggleIsFolderNameEditable())
    }

    return (
        <AppLayout>
            {(prompts && folder) && (<div className="px-16 py-10">
                <div className="flex justify-between" style={{ alignItems: 'flex-start' }}>
                    <h1 className="text-2xl font-bold mb-8 align-top">{folder.name}</h1>
                    {folder.name !== "Drafts" &&
                        <div className="flex gap-x-4">
                            <Button variant="outlined" onClick={() => dispatch(toggleIsFolderNameEditable())}>Edit Folder Name</Button>
                            <Button variant="contained" onClick={() => handleDeleteFolder()}>Delete Folder</Button>
                        </div>
                    }
                </div>
                <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: "90%" }}>
                    {promptList && promptList.map(prompt => {
                        return (
                            <ListItem
                                key={prompt.prompt_id}
                                secondaryAction={
                                    <div>
                                        <Tooltip title="Move Prompt">
                                            <IconButton onClick={() => handleFolderMove(prompt.prompt_id)}>
                                                <DriveFileMoveIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Duplicate Prompt">
                                            <IconButton onClick={() => dispatch(duplicatePromptThunk(prompt.prompt_id))}>
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Prompt">
                                            <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deletePromptThunk(prompt.prompt_id))}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                }
                                disablePadding
                                sx={{ cursor: "pointer", borderBottom: "1px solid #e0e0e0", borderTop: "1px solid #e0e0e0" }}
                            >
                                <ListItemButton onClick={() => handlePromptClick(prompt.prompt_id)}>
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={prompt.prompt_name || "Untitled Prompt"}
                                        secondary={prompt.description}
                                    />
                                </ListItemButton>
                            </ListItem>


                        )
                    }
                    )}
                    {promptList.length === 0 &&
                        <Alert severity="error">There's nothing here :( Please make your first prompt for this folder.</Alert>
                    }
                </List>
                <FloatingAddButton onClick={() => dispatch(createPromptThunk({ folderId: id }))} />
                <ModalWindow 
                    handleOpen={() => setMoveModalOpen(true)} 
                    handleClose={() => setMoveModalOpen(false)} 
                    isOpen={moveModalOpen}
                    header="Move Prompt"
                >
                    <FormControl sx={{width: '100%', marginBottom: '10px' }}>
                        <InputLabel id="demo-simple-select-label">Folder</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newFolder}
                            label="Folder"
                            onChange={(e) => setNewFolder(e.target.value)}
                            sx={{ width: "100%" }}
                        >
                            {folders.map(folder => {
                                return (
                                    <MenuItem value={folder.folder_id} key={folder.folder_id}>{folder.name}</MenuItem>
                                )}
                            )}   
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleFolderSubmit}>Move</Button>
                </ModalWindow>
                <ModalWindow
                    handleOpen={() => dispatch(toggleIsFolderNameEditable())}
                    handleClose={() => dispatch(toggleIsFolderNameEditable())}
                    isOpen={isFolderEditable}
                    header="Edit Folder Name"
                >
                    <TextField
                        id="outlined-basic"
                        label="Folder Name"
                        variant="outlined"
                        value={updatedFolderName}
                        onChange={(e) => dispatch(setUpdatedFolderName(e.target.value))}
                        sx={{ width: "100%", marginBottom: "10px" }}
                    />
                    <Button variant="contained" onClick={handleFolderNameUpdateSubmit}>Save</Button>
                </ModalWindow>
            </div>)}
        </AppLayout>
    )
}

export default PromptList;