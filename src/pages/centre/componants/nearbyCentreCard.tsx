import { Box, Divider, Typography } from "@mui/material";
import DetailItem from "./centreSummaryDetails";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { centreTypes } from "../../../data/centreTypes";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { colorAssets } from "../../../assets/colorAssests";
import { toTitleCase } from "../../../assets/helper";

const NearbyCentreCard = ({ centre }: { centre: any }) => {
  const selectedCentreTypeData = centreTypes.find(
    (type) => type.KeyID === centre.wcen_type_id
  );
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: "4px",
        height: "100%",
        backgroundColor: "#fff", // White background for the card area
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: colorAssets.headingColor,
          fontWeight: 500,
          fontSize: { xs: "1rem", sm: "1.25rem" },
          mb: 1,
        }}
      >
        {toTitleCase(
          centre.wcen_name + " - " + selectedCentreTypeData?.KeyValueDec
        )}
      </Typography>
      <Divider sx={{ mb: 1.5, borderColor: "#efebe9" }} />
      <DetailItem icon={PersonOutlineOutlinedIcon} value={centre.wcen_leader} />
      <DetailItem icon={DraftsOutlinedIcon} value={centre.wcen_leader_email} />
      <DetailItem
        icon={PhoneOutlinedIcon}
        value={centre.wcen_leader_mobile || centre.wcen_leader_tel}
      />
      <DetailItem
        icon={AccessTimeOutlinedIcon}
        value={centre.wcen_leader_timing}
      />
      <DetailItem icon={LocationOnOutlinedIcon} value={centre.wcen_address} />{" "}
    </Box>
  );
};

export default NearbyCentreCard;
