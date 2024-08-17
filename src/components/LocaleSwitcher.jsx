import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const StyledDiv = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: theme.spacing(2),
  justifyContent: "flex-end",
}));

const LocaleSwitcher = ({ currentLocale, onLocaleChange }) => (
  <StyledDiv>
    <TextField
      select
      variant="standard"
      value={currentLocale}
      onChange={onLocaleChange}
      label="Język"
    >
      <MenuItem value="pl-PL">Polski</MenuItem>
      <MenuItem value="en-US">English</MenuItem>
      <MenuItem value="fr-FR">Français</MenuItem>
    </TextField>
  </StyledDiv>
);

LocaleSwitcher.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  onLocaleChange: PropTypes.func.isRequired,
};

export default LocaleSwitcher;
