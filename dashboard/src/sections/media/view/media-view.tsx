import Container from '@mui/material/Container';
import MediaLibrary from '../media-library';
import UploadImages from '../upload-images';

// ----------------------------------------------------------------------

export default function MediaView() {

  return (
    <Container>
      <UploadImages />
      <MediaLibrary />
    </Container>
  );
}