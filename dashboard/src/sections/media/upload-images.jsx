import { LoadingButton } from '@mui/lab';
import { Card, CardContent, CardMedia, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUploadImage } from 'src/hooks/api-hooks/useImages';

export default function UploadImages() {
  // STATE
  const [files, setFiles] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    setFiles([...acceptedFiles])
  }, [])

  const clearFiles = () => {
    setFiles([])
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps
  } = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    onDrop
  });

  
  // UPLOAD
  const {mutate, isLoading} = useUploadImage()

  const uploadImages = () => {
    const formData = new FormData()
    formData.append('image', acceptedFiles[0])
    formData.append('name', acceptedFiles[0].name);
    mutate(formData, { onSuccess: clearFiles })
  }

  
  // RENDER
  const acceptedFileItems = files.map(file => (
    <Card key={file.path} sx={{ maxWidth: 150, m: 1 }}>
      <CardMedia>
        <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
      </CardMedia>
      <CardContent sx={{ p: 1 }}>
        <Typography variant='body2' sx={{ wordWrap: 'break-word' }}>{file.path}</Typography>
      </CardContent>
    </Card>
  ));


  return (
    <Paper sx={{ p: 4, mb: 5, mt: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>Lataa kuvia</Typography>
      </Stack>
      <Card {...getRootProps({ className: 'dropzone' })} sx={{ p: 4 }}>
        <input {...getInputProps()} />
        <Stack>
          {
            files.length < 1
            && <Typography textAlign={'center'} variant='subtitle1'>Raahaa ja pudota kuva tähän tai klikkaa valitaksesi kuva</Typography>
          }
        </Stack>
        <Stack direction="row" gap={1} justifyContent={'center'} >
          {acceptedFileItems}
        </Stack>
      </Card>
      <Stack pt={2}>
        {
          files.length > 0
          && <LoadingButton loading={isLoading} variant='contained' color='success' onClick={uploadImages}>Lataa palvelimelle</LoadingButton>
        }
      </Stack>
    </Paper>
  );
}