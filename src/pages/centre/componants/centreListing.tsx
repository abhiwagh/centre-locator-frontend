// CentreList.jsx
import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import DetailItem from "./centreSummaryDetails";
import NearbyCentresTabs from "./nearbyCentres";
import { colorAssets } from "../../../assets/colorAssests";
import { toTitleCase } from "../../../assets/helper";

const groupCentresByZone = (centres: any) => {
  if (!centres || !Array.isArray(centres)) return {};
  return centres.reduce((acc, centre) => {
    const zone = centre.wcen_zone || "Unspecified Zone";
    if (!acc[zone]) {
      acc[zone] = [];
    }
    acc[zone].push(centre);
    return acc;
  }, {});
};

const CentreList = ({ data }: any) => {
  const groupedData = useMemo(() => groupCentresByZone(data), [data]);
  const zones = Object.keys(groupedData);
  const [expandedPanelId, setExpandedPanelId] = React.useState<string | false>(
    false
  );

  const handleAccordionChange =
    (panelId: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanelId(isExpanded ? panelId : false);
    };
  const headingStyles = {
    color: colorAssets.primaryBackground,
    padding: { xs: "10px 0", sm: "30px 0", md: "30px 8px" },
    width: "100%",
    textAlign: "left",
    fontWeight: 400,
    fontFamily: "Playfair Display, serif",
    fontSize: "1.75rem",
    "@media (min-width: 600px)": {
      fontSize: "2rem",
    },
    "@media (min-width: 900px)": {
      fontSize: "2.5rem",
    },
  };

  const centreItemStyle = {
    border: "none",
    boxShadow: "none",
    mb: "1.25rem",
    p: 1,
    "&:before": {
      display: "none",
    },
  };

  const summaryStyles = {
    minHeight: "56px",
    "& .MuiAccordionSummary-content": {
      my: 1.5,
    },
    "&.Mui-expanded": {
      minHeight: "56px",
    },
  };

  if (zones.length === 0) {
    return (
      <Typography color="text.secondary" mt={2}>
        No centres found.
      </Typography>
    );
  }

  return (
    <Box>
      {zones.map((zone) => (
        <Box key={zone} sx={{ mb: 4 }}>
          <Box
            sx={{
              backgroundColor: colorAssets.secondaryBackground,
              position: "relative",
              p: 2,
              "@media (min-width: 600px)": {
                p: 2,
              },
              "@media (min-width: 900px)": {
                p: 0,
              },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: "-40px", sm: "-20px" },
                left: 0,
                width: "100%",
                height: { xs: "42px", sm: "22px" },
                backgroundColor: colorAssets.secondaryBackground,
                zIndex: 0,
              }}
            />
            <Box
              sx={{
                width: "100%",
                mx: "auto",
                maxWidth: "1140px",
              }}
            >
              <Typography component="div" sx={headingStyles}>
                {zone}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
              p: 2,
              "@media (min-width: 600px)": {
                p: 2,
              },
              "@media (min-width: 900px)": {
                p: 1,
              },
            }}
          >
            <Box
              sx={{
                borderTop: "none",
                maxWidth: "1140px",
                width: "100%",
              }}
            >
              {" "}
              {groupedData[zone].map((centre: any, index: any) => {
                const panelId = `panel${centre.wcen_id}`;
                const isExpanded = expandedPanelId === panelId;
                return (
                  <Accordion
                    key={centre.wcen_id}
                    sx={centreItemStyle}
                    expanded={isExpanded} // Bind to the state
                    onChange={handleAccordionChange(panelId)}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandCircleDownOutlinedIcon
                          sx={{
                            color: colorAssets.secondaryBackground,
                            fontSize: { xs: "22px", sm: "30px" },
                          }}
                        />
                      }
                      aria-controls={`panel${centre.wcen_id}-content`}
                      id={`panel${centre.wcen_id}-header`}
                      sx={summaryStyles}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: colorAssets.headingColor,
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          fontFamily: "Roboto,sans-serif",
                        }}
                      >
                        {index + 1}. {toTitleCase(centre.wcen_name)}
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails
                      sx={{
                        pt: 2,
                        pb: 2,
                        px: 2,
                        borderTop: "1px solid rgba(15, 13, 13, 0.65)",
                      }}
                    >
                      <Box>
                        <DetailItem
                          icon={PersonOutlineOutlinedIcon}
                          value={centre.wcen_leader}
                        />
                        <DetailItem
                          icon={DraftsOutlinedIcon}
                          value={centre.wcen_leader_email}
                        />
                        <DetailItem
                          icon={PhoneOutlinedIcon}
                          value={
                            centre.wcen_leader_mobile || centre.wcen_leader_tel
                          }
                        />
                        <DetailItem
                          icon={AccessTimeOutlinedIcon}
                          value={centre.wcen_leader_timing}
                        />
                      </Box>
                      {isExpanded && (
                        <NearbyCentresTabs
                          id={centre.wcen_id}
                          lat={centre.latitude}
                          long={centre.longitude}
                        />
                      )}
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CentreList;
