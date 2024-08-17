import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from "date-fns/locale/pl";

const EventDialog = ({ open, onClose, event, onChange, onSave, isEditing }) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
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
        <DateTimePicker
          label="Data rozpoczęcia"
          value={event.startDate}
          onChange={(newValue) =>
            onChange({ target: { name: "startDate", value: newValue } })
          }
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" />
          )}
          locale={plLocale} 
        />
        <DateTimePicker
          label="Data zakończenia"
          value={event.endDate}
          onChange={(newValue) =>
            onChange({ target: { name: "endDate", value: newValue } })
          }
          renderInput={(params) => (
            <TextField {...params} fullWidth margin="normal" />
          )}
          locale={plLocale} 
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
  </LocalizationProvider>
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
