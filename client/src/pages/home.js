import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { Chip } from '@mui/material';

function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    }

    return (
        <div className='flex w-full h-screen mt-48 text-center'>
            <Container component="main" maxWidth="s">
                <Typography component="h1" variant="h4" sx={{ marginBottom: '10px' }}>
                    CopyPrompts <Chip color="success" label="Beta" />
                </Typography>
                <Typography component="h1" variant="h5" sx={{ marginBottom: '10px' }}>
                    Streamline your sales and marketing writing process

                </Typography>
                <Container component="main" maxWidth="xs">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleClick}
                    >
                        Login
                    </Button>
                </Container>
            </Container>
        </div>
    )
}

export default Home;