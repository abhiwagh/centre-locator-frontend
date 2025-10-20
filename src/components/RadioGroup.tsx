import {
  FormControl,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { colorAssets } from "../assets/colorAssests";

interface RadioGroupProps<T extends string | number> {
  options: { label: string; value: T }[];
  selectedValue: T | undefined;
  onChange: (value: T) => void;
}

const RadioGroup = <T extends string | number>({
  options,
  selectedValue,
  onChange,
}: RadioGroupProps<T>) => (
  <FormControl component="fieldset" sx={{ mb: "0.5rem", ml: "0.5rem" }}>
    <MuiRadioGroup
      row
      value={selectedValue ?? ""}
      onChange={(e) => onChange(e.target.value as T)}
      sx={{
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {options.map((opt) => (
        <FormControlLabel
          key={opt.value}
          value={opt.value}
          control={
            <Radio
              sx={{
                color: colorAssets.headingColor,
                "&.Mui-checked": {
                  color: colorAssets.headingColor,
                },
                "& .MuiSvgIcon-root": {
                  fontSize: "15px",
                },
                width: "15px",
                height: "15px",
                mr: "0.5rem",
              }}
            />
          }
          label={opt.label}
          sx={{
            "& .MuiFormControlLabel-label": {
              color: colorAssets.radioTitleColor,
              fontFamily: "Roboto, sans-serif",
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: "24px",
              mr: "1.5rem",
            },
          }}
        />
      ))}
    </MuiRadioGroup>
  </FormControl>
);

export default RadioGroup;
