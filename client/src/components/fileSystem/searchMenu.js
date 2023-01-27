import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';

function SearchMenu({ search, setSearch, data, setSelectedItem, headerPropertyName, descriptionPropertyName, idPropertyName, deleteItem }) {
    const dispatch = useDispatch()

    return (
        <div className='border border-light border-t-0 max-w-md flex flex-wrap justify-center flex-row' style={{ }}>
            <div className='w-full'>
                <TextField label="Search Term" value={search} onChange={setSearch} style={{ width: "100%", marginBottom: "1rem", alignItems: 'flex-start !important' }} />
            </div>
            <List sx={{ width: '350px', bgcolor: 'background.paper', maxHeight: "90%" }}>
                {data.length > 0 && 
                    data.filter(item => item[headerPropertyName].toLowerCase().includes(search.toLowerCase()))
                         .map((item) => (
                            <ListItem
                                key={item[idPropertyName]}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete" onClick={() => dispatch(deleteItem({businessId: item[idPropertyName]}))}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                disablePadding
                                onClick={() => dispatch(setSelectedItem(item[idPropertyName]))}
                            >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <ImageIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item[headerPropertyName]}
                                        secondary={item[descriptionPropertyName].length > 70 ? item[descriptionPropertyName].slice(0, 62) + "..." : item[descriptionPropertyName]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
            </List>
        </div>
    )
}

export default SearchMenu;