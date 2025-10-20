import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCentreType,
  setClassType,
  setLocation,
} from "../../features/centreLocator/centreSlice";
import {
  useGetCentresQuery,
  useGetCentreSearchQuery,
} from "../../api/centreApi";
import { centreTypes } from "../../data/centreTypes";
import RadioGroup from "../../components/RadioGroup";
import SearchIcon from "@mui/icons-material/Search";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import {
  Box,
  Typography,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import type { RootState } from "../../app/store";
import CentreList from "./componants/centreListing";
import ShimmeringEffect from "../../components/Shimmering";
import { colorAssets } from "../../assets/colorAssests";

const headingStyles = {
  color: colorAssets.headingColor,
  fontFamily: '"Playfair Display", serif',
  fontSize: { xs: "1rem", sm: "1.15rem", md: "1.4rem" },
  fontWeight: 400,
  mb: "0.5rem",
};

const CentreLocator: React.FC = () => {
  const dispatch = useDispatch();
  const { selectedCentreType, selectedClassType, selectedLocation } =
    useSelector((state: RootState) => state.centre);

  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedName, setSelectedName] = useState("");
  const [selectesSearchName, setSelectedSearchName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedCentre = centreTypes.find(
    (c) => c.KeyID === selectedCentreType
  );

  const { data: searchData } = useGetCentreSearchQuery(
    {
      type_id: selectedCentreType || 0,
      location: selectedLocation || "All",
      name: searchTerm || "",
    },
    { skip: !searchTerm.trim() }
  );

  const queryParams: any = {
    limit: 1000,
    offset: 0,
    type_id: selectedCentreType,
    location: selectedLocation,
  };

  if (selectedClassType) queryParams.class_type = selectedClassType;
  if (selectesSearchName) queryParams.name = selectesSearchName;

  const { data, isFetching } = useGetCentresQuery(queryParams);

  const handleSelectCentre = (centre: any) => {
    setSelectedSearchName(centre.wcen_name);
    setSearchTerm(centre.wcen_name);
    setShowDropdown(false);
  };

  useEffect(() => {
    if (!searchTerm.trim() || selectesSearchName) setShowDropdown(false);
    else setShowDropdown(true);
  }, [searchTerm, selectesSearchName]);

  return (
    <Box sx={{ m: 0, padding: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          padding: "5px 0",
          background: "#ffffff",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            mt: 3,
            mb: 3,
            width: "100%",
            mx: "auto",
            maxWidth: "1140px",
            px: { xs: 2, sm: 3, md: 1 },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Typography
            sx={{
              ...headingStyles,
              mr: { xs: 0, sm: 2 },
              mb: { xs: 1, sm: 0 },
              whiteSpace: "nowrap",
            }}
          >
            Search by Centre Name:
          </Typography>

          <TextField
            variant="standard"
            placeholder="Enter Centre Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flexGrow: 1,
              width: { xs: "100%", sm: "auto" },
              "& .MuiInputBase-root": {
                fontSize: "1rem",
                padding: 0,
                color: colorAssets.radioTitleColor,
                "& .MuiInputBase-input": { padding: "0" },
                "&:before": {
                  borderBottomColor: colorAssets.accentColor + " !important",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottomColor: colorAssets.darkerAccent + " !important",
                },
                "&:after": {
                  borderBottomColor: colorAssets.accentColor + " !important",
                  borderBottomWidth: "1px",
                },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "rgba(0, 0, 0, 0.54)",
                opacity: 1,
              },
            }}
            InputProps={{
              endAdornment: searchTerm ? (
                <ClearOutlinedIcon
                  sx={{
                    color: colorAssets.accentColor,
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSearchName("");
                  }}
                />
              ) : (
                <SearchIcon
                  sx={{
                    color: colorAssets.accentColor,
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                />
              ),
            }}
          />

          {/* Dropdown */}
          {showDropdown && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                top: { xs: "calc(100% + 15px)", sm: "100%" },
                left: { xs: "16px", sm: "210px" },
                right: { xs: "16px", sm: 0 },
                zIndex: 10,
                mt: 1,
                maxHeight: 200,
                overflowY: "auto",
                width: { xs: "auto", sm: "auto" },
              }}
            >
              {searchData?.data?.length > 0 ? (
                <List dense>
                  {searchData.data.map((centre: any) => (
                    <ListItem disablePadding key={centre.wcen_id}>
                      <ListItemButton
                        onClick={() => handleSelectCentre(centre)}
                      >
                        {`${centre.wcen_name}, ${centre.wcen_city}, ${centre.wcen_state}, ${centre.wcen_country}`}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography color="text.secondary">
                    No result found
                  </Typography>
                </Box>
              )}
            </Paper>
          )}
        </Box>
      </Box>

      {/* --- FILTERS SECTION --- */}
      <Box
        sx={{
          background: colorAssets.primaryBackground,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          px: { xs: 0, sm: 0, md: 1 },
        }}
      >
        <Box
          sx={{
            padding: { xs: "2rem 1rem", sm: "2.5rem 1.5rem", md: "2rem 0" },
            width: "100%",
            mx: "auto",
            maxWidth: "1140px",
          }}
        >
          <Typography sx={headingStyles}>Centre Type:</Typography>
          <RadioGroup
            options={centreTypes.map((c) => ({
              label: c.KeyValueDec,
              value: c.KeyID,
            }))}
            selectedValue={selectedCentreType}
            onChange={(val) => dispatch(setCentreType(Number(val)))}
          />
          {selectedCentre && selectedCentre.wcen_classes_type.length > 0 && (
            <>
              <Typography sx={{ ...headingStyles, mt: { xs: 2, sm: 3 } }}>
                Class Type:
              </Typography>
              <RadioGroup
                options={[
                  { label: "All", value: "" },
                  ...selectedCentre.wcen_classes_type.map((cls) => ({
                    label: cls,
                    value: cls,
                  })),
                ]}
                selectedValue={selectedClassType}
                onChange={(val) => dispatch(setClassType(String(val)))}
              />
            </>
          )}
          <Typography sx={{ ...headingStyles, mt: { xs: 2, sm: 3 } }}>
            Location:
          </Typography>
          <RadioGroup
            options={[
              { label: "All", value: "All" },
              { label: "Mumbai", value: "Mumbai" },
              { label: "India", value: "India" },
              { label: "Abroad", value: "Abroad" },
            ]}
            selectedValue={selectedLocation}
            onChange={(val) => dispatch(setLocation(String(val)))}
          />
        </Box>
      </Box>

      {/* --- RESULTS SECTION --- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          background: colorAssets.primaryBackground,
        }}
      >
        {isFetching ? (
          <ShimmeringEffect />
        ) : (
          <Box sx={{ width: "100%" }}>
            {data?.data &&
            Array.isArray(data?.data) &&
            data?.data.length > 0 ? (
              <CentreList data={data.data} />
            ) : (
              <Typography color="text.secondary" mt={2}>
                No centres found.
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CentreLocator;
