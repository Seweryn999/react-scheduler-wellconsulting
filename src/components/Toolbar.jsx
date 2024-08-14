import PropTypes from "prop-types";
import { Grid, IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ToolbarComponent = ({ onAddEvent, onDateChange }) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="space-between"
    style={{ padding: "10px" }}
  >
    <Grid item>
      <IconButton onClick={() => onDateChange(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton onClick={() => onDateChange(1)}>
        <ArrowForwardIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onAddEvent}>
        Dodaj wydarzenie
      </Button>
    </Grid>
  </Grid>
);

ToolbarComponent.propTypes = {
  onAddEvent: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default ToolbarComponent;
