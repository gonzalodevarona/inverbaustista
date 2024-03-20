import { Skeleton, Stack } from '@mui/material/';

function SkeletonCard() {
  return (
    <Stack>
        <Skeleton variant="rectangular" animation="wave" width={"40em"} height={"40em"} />
        <Skeleton variant="rectangular" animation="wave" width={"40em"} height={"2em"} />
        <Skeleton variant="rectangular" animation="wave" width={"20em"} height={"2em"} />
        <Skeleton variant="rectangular" animation="wave" width={"40em"} height={"4em"} />
    </Stack>
  )
}

export default SkeletonCard