import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export interface SingleBarProps {
  width?: string;
  height?: number;
}

export function SingleBar({ width = '100%', height = 60 }: SingleBarProps) {
  return (
    <Skeleton variant="rounded" width={width} height={60} animation="wave" />
  );
}

export default function ArtistListSkeleton() {
  return (
    <Stack spacing={2} padding={3}>
      <SingleBar />
      <SingleBar width="80%" />
      <SingleBar />
      <SingleBar width="90%" />
      <SingleBar />
      <SingleBar width="90%" />
      <SingleBar />
    </Stack>
  );
}
