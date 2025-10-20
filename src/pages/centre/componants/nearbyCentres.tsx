import React, { useMemo, useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import { centreTypes } from "../../../data/centreTypes";
import { useGetCentresQuery } from "../../../api/centreApi";
import NearbyCentreCard from "./nearbyCentreCard";
import { colorAssets } from "../../../assets/colorAssests";

interface NearbyCentresTabsProps {
  id: string | number;
  lat: number;
  long: number;
}

const NearbyCentresTabs = ({ id, lat, long }: NearbyCentresTabsProps) => {
  const { selectedCentreType, selectedClassType, selectedLocation } =
    useSelector((state: any) => state.centre);

  const [activeTab, setActiveTab] = useState(0);

  const [queryTypeId, setQueryTypeId] = useState<number | null>(null);

  const selectedCentreTypeData = useMemo(
    () => centreTypes.find((ct) => ct.KeyID === selectedCentreType),
    [selectedCentreType]
  );

  const dynamicTabName = selectedCentreTypeData
    ? `${selectedCentreTypeData.KeyValueDec} Nearby`
    : "Satsang Centre Nearby";

  const tabContent = [
    { key: 0, name: "Other Centres Nearby" },
    { key: 1, name: dynamicTabName },
  ];

  const queryParams: any = useMemo(() => {
    const params: any = {
      limit: 10,
      offset: 0,
      location: selectedLocation,
      latitude: lat,
      longitude: long,
      centre_id: id,
      radius_km: 5,
    };

    if (selectedClassType) {
      params.class_type = selectedClassType;
    }

    if (queryTypeId !== null) {
      params.type_id = queryTypeId;
    }

    return params;
  }, [selectedLocation, selectedClassType, queryTypeId]);

  const { data: nearbyCentresData, isFetching } =
    useGetCentresQuery(queryParams);

  const currentData = nearbyCentresData?.data || [];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    if (newValue === 1) {
      setQueryTypeId(selectedCentreType);
    } else {
      setQueryTypeId(null);
    }
  };

  return (
    <Box sx={{ mt: 3, p: 0, borderRadius: "4px" }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        aria-label="Nearby Centres Tabs"
        variant="fullWidth"
        TabIndicatorProps={{
          sx: {
            backgroundColor: "transparent",
            height: 0,
            display: "none",
          },
        }}
      >
        {tabContent.map((tab, index) => (
          <Tab
            key={tab.key}
            label={tab.name}
            sx={{
              textTransform: "none",
              fontWeight: 400,
              color: colorAssets.radioTitleColor,
              backgroundColor: activeTab === index ? "#efebe9" : "transparent",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              padding: "16px 8px",
              fontSize: "14px",
              "@media (min-width: 600px)": {
                padding: "30px",
                fontSize: "20px",
              },
              // ------------------------------------------------------------------

              fontFamily: "Roboto, arial, sans-serif",
              "&:hover": {
                color: colorAssets.headingColor,
              },
              "&.Mui-selected": {
                color: colorAssets.radioTitleColor,
                fontWeight: 550,
              },
            }}
            id={`nearby-tab-${index}`}
            aria-controls={`nearby-tabpanel-${index}`}
          />
        ))}
      </Tabs>

      <Box
        sx={{
          p: 2,
          backgroundColor: "#efebe9",
          borderBottomLeftRadius: "4px",
          borderBottomRightRadius: "4px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
        }}
      >
        {isFetching && <Typography>Loading centres...</Typography>}
        {!isFetching && currentData.length === 0 && (
          <Typography>
            No {tabContent[activeTab].name.toLowerCase()} found.
          </Typography>
        )}

        {!isFetching && currentData.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "16px",
              "@media (min-width: 900px)": {
                gridTemplateColumns: "1fr 1fr",
              },
            }}
          >
            {currentData
              .filter((centre: any) => {
                if (queryTypeId === null) {
                  return centre.wcen_type_id !== selectedCentreType;
                }
                return true;
              })
              .map((centre: any, index: number) => (
                <Box key={index}>
                  <NearbyCentreCard centre={centre} />
                </Box>
              ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NearbyCentresTabs;
