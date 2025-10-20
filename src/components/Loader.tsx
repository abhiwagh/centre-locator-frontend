import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    py={4}
    gap={2}
  >
    <CircularProgress color="warning" size={28} />
    <Typography color="warning.main" fontWeight={600}>
      Loading Centres...
    </Typography>
  </Box>
);

export default Loader;
