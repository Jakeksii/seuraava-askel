import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MediaLibrary from '../media-library';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { Fade } from '@mui/material';
import Dropzone from 'react-dropzone';
import UploadImages from '../upload-images';

// ----------------------------------------------------------------------
type Image = {
  _id: string
  name: string
}

const images = [
  { _id: 'vl3klirewxdbby50kd9u', name: 'Carry The love.png' },
  { _id: 'i0rmxqcscsiegxqdpv9r', name: 'Cool event.jpg' },
  { _id: 'yfrylw5tamnzpuwoc5py', name: 'nyla.png' },
  { _id: 'shlres4yabttw3v6xqxe', name: 'espoon-hellari.png' },
]
export default function MediaView() {

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Media näkymä</Typography>
        <Button variant="contained" color="inherit" component={Link} to={'/media/new'} startIcon={<AddIcon />}>
          Lisää kuva
        </Button>
      </Stack>
      <UploadImages />
      <MediaLibrary images={images} />
    </Container>
  );
}