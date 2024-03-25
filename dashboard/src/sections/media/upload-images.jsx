import { Container, Paper, Card, CardContent, CardMedia, Button, Typography, Stack } from '@mui/material';
import { useDropzone } from 'react-dropzone';

export default function UploadImages(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 5,
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  });

  const acceptedFileItems = acceptedFiles.map(file => (
    <Card key={file.path} sx={{ maxWidth: 150, m: 1 }}>
      <CardMedia>
        <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
      </CardMedia>
      <CardContent sx={{ p: 1 }}>
        <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>{file.path}</Typography>
      </CardContent>
    </Card>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.path}>
        <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '100px', height: '100px' }} />
        {file.path} - {file.size} bytes
        <ul>
          {errors.map(e => <li key={e.code}>{e.message}</li>)}
        </ul>
      </li>
    )
  });


  return (
    <Paper sx={{ p: 4, mb: 5, mt: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>Lataa kuvia</Typography>
      </Stack>
      <Card {...getRootProps({ className: 'dropzone' })} sx={{ p: 4 }}>
        <input {...getInputProps()} />
        <Stack>
          {
            acceptedFiles.length < 1
            && <Typography textAlign={'center'} variant='subtitle1'>Raahaa ja pudota kuvia tähän tai klikkaa valitaksesi kuvia</Typography>
          }
        </Stack>
        <Stack direction="row" gap={1} justifyContent={'center'} >
          {acceptedFileItems}
        </Stack>
      </Card>
      <Stack pt={2}>
        {
          acceptedFiles.length > 0
          && <Button variant='contained' color='success'>Lataa valitut kuvat palvelimelle</Button>
        }
      </Stack>
    </Paper>
  );
}