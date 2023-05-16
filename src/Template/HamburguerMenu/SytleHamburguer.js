
import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        color: '#325d87',
        flexDirection: 'column',
        fontSize: '1.25rem',
        fontWeight: theme.typography.fontWeightMedium,
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}));