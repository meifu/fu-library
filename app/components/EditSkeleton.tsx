import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function EditSkeleton() {
  return (
    <Stack spacing={2} padding={3}>
      <Skeleton variant="rounded" width={'100%'} height={65} animation="wave" />
      <Skeleton variant="rounded" width={'100%'} height={65} animation="wave" />
      <Skeleton variant="rounded" width={'100%'} height={65} animation="wave" />
      <Skeleton variant="rounded" width={'100%'} height={65} animation="wave" />
      <Skeleton
        variant="rounded"
        width={'100%'}
        height={150}
        animation="wave"
      />
    </Stack>
  );
}
