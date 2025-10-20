import { Skeleton, Box } from "@mui/material";
import { colorAssets } from "../assets/colorAssests";

const MAX_WIDTH = "1140px";
const ORANGE_COLOR = colorAssets.secondaryBackground;
const ACCORDION_BG = "#f5f5ee";

const ShimmeringEffect = () => {
  return (
    <Box
      sx={{
        mb: 4,
        mx: "auto",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: ORANGE_COLOR,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "-60px",
            left: 0,
            width: "100%",
            height: "60px",
            backgroundColor: colorAssets.secondaryBackground,
            zIndex: 0,
          }}
        />
        <Skeleton
          variant="rectangular"
          animation="pulse"
          sx={{
            bgcolor: ORANGE_COLOR,
            height: 100,
            transform: "scale(1, 1)",
            width: "100%",
            maxWidth: MAX_WIDTH,
            mx: "auto",
          }}
        />
      </Box>
      <Box
        sx={{
          p: 2,
          pt: 4,
          width: "100%",
          maxWidth: MAX_WIDTH,
          mx: "auto",
          backgroundColor: ACCORDION_BG,
          position: "relative",
          zIndex: 999,
        }}
      >
        {[...Array(8)].map((_, index) => (
          <Box
            key={index}
            sx={{
              mb: "1rem",
              p: 1,
              backgroundColor: ACCORDION_BG,
              borderRadius: 2,
              maxWidth: MAX_WIDTH,
              mt: index === 0 ? "-1rem" : 0,
            }}
          >
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                bgcolor: "rgba(0, 0, 0, 0.11)",
                height: 56,
                borderRadius: 2,
                p: 2,
                width: "100%",
              }}
            ></Skeleton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ShimmeringEffect;
