import { Box, Typography } from "@mui/material";
import { colorAssets } from "../../../assets/colorAssests";

const DetailItem = ({ icon: Icon, value }: any) => {
  let processedValue = value;
  const containsTimePattern =
    typeof value === "string" && value.match(/\d{1,2}:\d{2}\s(a|p)\.m\./i);
  if (containsTimePattern) {
    let cleanedValue = String(value).replace(/<[^>]*>/g, " ");
    cleanedValue = cleanedValue.replace(/\s+/g, " ");
    processedValue = cleanedValue.trim();
  }
  const displayValue = processedValue || "-";

  return (
    <Box
      sx={{
        display: "flex",
        mb: 1.5,
        "&:last-child": { mb: 0 },
      }}
    >
      {Icon && (
        <Box
          sx={{
            mr: 2,
            "@media (min-width: 600px)": {
              mr: 3,
            },
            color: colorAssets.secondaryBackground,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon fontSize="medium" />
        </Box>
      )}
      <Typography
        variant="body2"
        sx={{
          color:
            displayValue !== "-"
              ? colorAssets.radioTitleColor
              : colorAssets.radioTitleColor,
          fontFamily: "Roboto,sans-serif",
          fontSize: "1rem",
          flexGrow: 1,
          minWidth: 0,
          fontWeigth: 500,
        }}
      >
        <span style={{ fontWeight: 500 }}></span> {displayValue}
      </Typography>
    </Box>
  );
};

export default DetailItem;
