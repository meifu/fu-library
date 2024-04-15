import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

export default function ArtistListSkeleton() {
  return (
    <Paper elevation={3}>
      <Stack spacing={2} padding={3}>
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={60}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={60}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={60}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={60}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={60}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={60}
          animation="wave"
        />
        <Skeleton
          variant="rounded"
          width={'100%'}
          height={60}
          animation="wave"
        />
      </Stack>
    </Paper>
  );
}
