import Container from '@mui/material/Container';
import MediaLibrary from '../media-library';
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
      <UploadImages />
      <MediaLibrary images={images} />
    </Container>
  );
}