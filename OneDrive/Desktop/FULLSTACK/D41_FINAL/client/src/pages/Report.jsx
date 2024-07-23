import { Box } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'

const Report = () => {

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <LoadingButton
        variant='outlined'
        color='success'
      // onClick={accessReport}
      // loading={loading}
      >
        Sit tight... Report features coming soon!
      </LoadingButton>
    </Box>
  )
}

export default Report