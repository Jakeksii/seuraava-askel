import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloudImage from 'src/components/images/image';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

type Image = {
  _id: string
  name: string
}

type Props = {
  images: Image[]
}

export default function MediaLibrary({ images }: Props) {
  const mobile = useResponsive('down', 'md')

  return (
    <ImageList cols={mobile ? 2 : 4} gap={10} sx={{ m: 'auto' }}>
      {images.map((image) => (
        <ImageListItem key={image._id}>
          <Card>
            <CardMedia>
              <CloudImage image_id={image._id} width={300} height={300} />
            </CardMedia>
            <CardContent>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography>{image.name}</Typography>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </ImageListItem>
      ))}
    </ImageList>
  );
}