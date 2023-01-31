import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


function SuccessBox({ message, open, setOpen }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                dispatch(setOpen(false))
            }, 3000)
        }
    }, [open])

    return (
        <div className="w-full px-16">
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                dispatch(setOpen(false));
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {message}
                </Alert>
            </Collapse>
        </div>
    )
}

export default SuccessBox;