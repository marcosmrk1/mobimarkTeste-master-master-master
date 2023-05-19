
import EmailIcon from '@mui/icons-material/Email';
import GetAppIcon from '@mui/icons-material/GetApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
    Box,
    Button,
    Card
} from '@mui/material';
import fotoDoMarcos from '../Assets/Img/marcosPaulo.png';
const BoxIcons = () => {
    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box
                component="img"
                sx={{
                    height: 290,
                    width: 300,
                    marginTop: '28px',
                }}
                alt='marcos.png'
                src={fotoDoMarcos}
            ></Box>

            <Card sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '28px' }}>
                <a href='https://github.com/marcosmrk1' target='_blank'>
                    <GitHubIcon sx={{ margin: '12px', color: "#325d87" }} />
                </a>
                <a href='https://www.linkedin.com/in/marcosp-rsd-/' target="_blank" >
                    <LinkedInIcon sx={{ margin: '12px', color: "#325d87" }} />
                </a>
                <a href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#sent?compose=new' target='_blank'>
                    <EmailIcon sx={{ margin: '12px', color: "#325d87" }} />
                </a>
            </Card>
            <Box>
                <a href='curriculo.pdf' download target='_blank'> <Button color='primary'
                    variant='contained' sx={{ marginTop: '35px' }}> <GetAppIcon />Dowload Do curriculo
                </Button></a>
            </Box>
        </Box>
    )
}

export default BoxIcons