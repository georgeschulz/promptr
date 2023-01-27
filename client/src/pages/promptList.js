import AppLayout from "../components/layout/AppLayout";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPromptThunk, deletePromptThunk, fetchPromptsThunk, selectPrompts } from "../redux/promptsSlice";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar } from "@mui/material";
import Alert from '@mui/material/Alert';
import FloatingAddButton from "../components/buttons/FloatingAddButton";

function PromptList() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const prompts = useSelector(selectPrompts);
    const promptList = prompts.filter(prompt => prompt.folder_id === Number(id));

    useEffect(() => {
        dispatch(fetchPromptsThunk());
    }, [dispatch]);

    const handlePromptClick = (promptId) => {
        navigate(`/prompts/${promptId}`);
    }

    return (
        <AppLayout>
            <div className="px-16 py-10">
                <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: "90%" }}>
                    {promptList && promptList.map(prompt => {
                        return (
                            <ListItem
                                key={prompt.prompt_id}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deletePromptThunk(prompt.prompt_id))}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                disablePadding
                                sx={{ cursor: "pointer", borderBottom: "1px solid #e0e0e0", borderTop: "1px solid #e0e0e0" }}
                            >
                                <ListItemButton onClick={() => handlePromptClick(prompt.prompt_id)}>
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={prompt.prompt || "Untitled Prompt"}
                                        secondary={prompt.description}
                                    />
                                </ListItemButton>
                            </ListItem>

                                    
                        )
                    }
                    )}
                    { promptList.length === 0 &&
                        <Alert severity="error">There's nothing here :( Please make your first prompt for this folder.</Alert>
                    }
                </List>
                <FloatingAddButton onClick={() => dispatch(createPromptThunk({folderId: id}))} />
            </div>
        </AppLayout>
    )
}

export default PromptList;