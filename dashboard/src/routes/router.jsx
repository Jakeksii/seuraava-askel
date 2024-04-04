import { CircularProgress } from '@mui/material';
import { useAppContext } from 'src/context/appContext';
import { useUser } from 'src/hooks/api-hooks/useAuthenticate';
import Sections from './sections';

const loading = (
    <main aria-busy style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center' }}>
        <CircularProgress sx={{ alignSelf: 'center' }} />
    </main>
);

export default function Router () {
    const { selectedOrganization } = useAppContext();
    const { data: user, isLoading } = useUser();

    if(isLoading) {
        return loading
    } else {
        return <Sections user={user} selectedOrganization={selectedOrganization} />
    }
}