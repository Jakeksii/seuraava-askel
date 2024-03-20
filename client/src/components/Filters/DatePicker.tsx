import { styled } from '@mui/material';
import { fiFI } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { fi } from 'date-fns/locale';

const StyledPicker = styled(StaticDatePicker) (({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '& .MuiDayCalendar-weekDayLabel': {
        color: theme.palette.primary.light,
    },
    '& .MuiPickersDay-root.MuiPickersDay-today': {
        border: '2px solid '+theme.palette.primary.light
    },
    '& .MuiButtonBase-root:not(.Mui-selected):not(.Mui-disabled)': {
        color: theme.palette.primary.main,
    },
    '& .MuiPickersYear-yearButton.Mui-disabled': {
        display: 'none'
    }
}))

type Props = {
    defaultValue: Date
    onChange: (value: unknown) => void
}
export default function ResponsiveDatePicker({defaultValue, onChange}: Props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi} localeText={fiFI.components.MuiLocalizationProvider.defaultProps.localeText}>
            <StyledPicker
                disablePast
                onChange={onChange}
                defaultValue={defaultValue}
                slotProps={{ 
                    actionBar: { actions: [] },
                    toolbar: { hidden: true }
                }}
                />
        </LocalizationProvider>
    );
}