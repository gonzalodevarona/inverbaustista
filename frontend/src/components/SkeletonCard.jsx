import { Skeleton, Stack } from '@mui/material/';

function SkeletonCard() {
  return (
    <Stack>
        <Skeleton variant="rectangular" animation="wave" width={"35em"} height={"40em"} />
        <Skeleton variant="rectangular" animation="wave" width={"35em"} height={"2em"} />
        <Skeleton variant="rectangular" animation="wave" width={"35em"} height={"2em"} />
        <Skeleton variant="rectangular" animation="wave" width={"35em"} height={"4em"} />
    </Stack>
  )
}

export default SkeletonCard