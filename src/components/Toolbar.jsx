import PropTypes from "prop-types";
import { Grid, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ToolbarComponent = ({ onAddEvent }) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="space-between"
  >
    <Grid item></Grid>
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
