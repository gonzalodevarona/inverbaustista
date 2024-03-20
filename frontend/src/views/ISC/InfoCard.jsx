import { Stack, Typography } from '@mui/material'
import React from 'react'

function InfoCard({ title, body }) {
    return (
        <Stack sx={{ backgroundColor: 'primary.light', alignItems: 'center', py: '2em', width: '25em' }}>
            <Typography  variant="p">{title}</Typography>
            <Typography sx={{ fontSize: "2.2rem" }} variant="subtitle1">{body}</Typography>
        </Stack>
    )
}

export default InfoCard