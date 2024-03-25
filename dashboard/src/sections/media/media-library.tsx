import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CloudImage from 'src/components/images/image';
import { useGetImages } from 'src/hooks/api-hooks/useImages';
import { useResponsive } from 'src/hooks/use-responsive';
import LoadingView from '../loading/loading-view';
import DeleteImageButton from './delete-image-button';

// ----------------------------------------------------------------------

type ImageObject = {
  _id: string
  name: string
  organization_id: string
  created_by: string
  updated_by: string
  createdAt: Date
  updateAt: Date
}

export default function MediaLibrary() {
  const mobile = useResponsive('down', 'md')
  const { data, isLoading } = useGetImages()

  if (!data || isLoading) return <LoadingView />

  const imageObjects = data as ImageObject[]

  const renderEmpty = (
    <Typography textAlign='center' variant='h3'>Tyhjältä näyttää</Typography>
  )

  const renderImages = (
    imageObjects.map((object) => (
      <ImageListItem key={object._id}>
        <Card>
          <CardMedia>
            <CloudImage image_id={`${object.organization_id}/${object._id}`} width={300} height={300} />
          </CardMedia>
          <CardContent>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography>{object.name}</Typography>
              <DeleteImageButton image_id={object._id} />
            </Stack>
          </CardContent>
        </Card>
      </ImageListItem>
    ))
  )

  return (
    <>
      {imageObjects.length < 1 && renderEmpty}
      <ImageList cols={mobile ? 2 : 4} gap={10} sx={{ m: 'auto' }}>
        {data && renderImages}
      </ImageList>
    </>
  );
}