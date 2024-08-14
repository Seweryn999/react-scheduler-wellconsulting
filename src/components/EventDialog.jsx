import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const EventDialog = ({ open, onClose, event, onChange, onSave, isEditing }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      {isEditing ? "Edytuj wydarzenie" : "Dodaj wydarzenie"}
    </DialogTitle>
    <DialogContent>
      <TextField
        name="title"
        label="Tytuł"
        value={event.title}
        onChange={onChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="startDate"
        label="Data rozpoczęcia"
        value={event.startDate}
        onChange={onChange}
        fullWidth
        margin="normal"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="endDate"
        label="Data zakończenia"
        value={event.endDate}
        onChange={onChange}
        fullWidth
        margin="normal"
        type="datetime-local"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Anuluj
      </Button>
      <Button onClick={onSave} color="primary">
        Zapisz
      </Button>
    </DialogActions>
  </Dialog>
);

EventDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default EventDialog;
