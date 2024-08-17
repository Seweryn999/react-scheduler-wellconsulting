import React from "react";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import plLocale from "date-fns/locale/pl";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "./firebaseConfig";

import ToolbarComponent from "./components/Toolbar";
import EventDialog from "./components/EventDialog";
import SchedulerComponent from "./components/Scheduler";

const MySchedulerComponent = () => {
  const [data, setData] = React.useState([]);
  const [currentViewName, setCurrentViewName] = React.useState(
    localStorage.getItem("currentViewName") || "Dzień"
  );
  const [currentDateState, setCurrentDate] = React.useState(
    localStorage.getItem("currentDate") || new Date()
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentEvent, setCurrentEvent] = React.useState({
    title: "",
    startDate: "",
    endDate: "",
    id: null,
  });
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);

  React.useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(firestore, "wydarzenia");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(eventsList);
    };

    fetchEvents();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("currentDate", currentDateState);
  }, [currentDateState]);

  React.useEffect(() => {
    localStorage.setItem("currentViewName", currentViewName);
  }, [currentViewName]);

  const commitChanges = async ({ added, changed, deleted }) => {
    let updatedData = data;

    if (added) {
      try {
        const docRef = await addDoc(collection(firestore, "wydarzenia"), added);
        updatedData = [...data, { id: docRef.id, ...added }];
      } catch (e) {
        console.error("Błąd dodawania dokumentu: ", e);
      }
    }

    if (changed) {
      try {
        for (const id in changed) {
          await updateDoc(doc(firestore, "wydarzenia", id), changed[id]);
        }
        updatedData = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      } catch (e) {
        console.error("Błąd aktualizacji dokumentu: ", e);
      }
    }

    if (deleted !== undefined) {
      try {
        await deleteDoc(doc(firestore, "wydarzenia", deleted));
        updatedData = data.filter((appointment) => appointment.id !== deleted);
      } catch (e) {
        console.error("Błąd usuwania dokumentu: ", e);
      }
    }

    setData(updatedData);
  };

  const handleDateChange = (daysToAdd) => {
    const newDate = new Date(currentDateState);
    newDate.setDate(newDate.getDate() + daysToAdd);
    setCurrentDate(newDate);
  };

  const handleAddEvent = () => {
    setIsEditing(false);
    setCurrentEvent({ title: "", startDate: "", endDate: "", id: null });
    setOpenDialog(true);
  };

  const handleEditEvent = () => {
    if (selectedAppointment) {
      setIsEditing(true);
      setCurrentEvent({
        title: selectedAppointment.title,
        startDate: selectedAppointment.startDate,
        endDate: selectedAppointment.endDate,
        id: selectedAppointment.id,
      });
      setOpenDialog(true);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedAppointment && selectedAppointment.id) {
      commitChanges({ deleted: selectedAppointment.id });
      setSelectedAppointment(null);
    }
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleSaveEvent = async () => {
    if (isEditing) {
      await commitChanges({ changed: { [currentEvent.id]: currentEvent } });
    } else {
      await commitChanges({ added: currentEvent });
    }
    setOpenDialog(false);
    setCurrentEvent({ title: "", startDate: "", endDate: "", id: null });
  };

  const handleEventChange = (e) => {
    setCurrentEvent({
      ...currentEvent,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
      <Paper>
        <ToolbarComponent
          onAddEvent={handleAddEvent}
          onDateChange={handleDateChange}
        />
        <SchedulerComponent
          data={data}
          currentDateState={currentDateState}
          currentViewName={currentViewName}
          setCurrentDate={setCurrentDate}
          setCurrentViewName={setCurrentViewName}
          commitChanges={commitChanges}
          onEditAppointment={handleEditEvent}
          onDeleteAppointment={handleDeleteEvent}
          selectedAppointment={selectedAppointment}
          onAppointmentClick={handleAppointmentClick}
        />
        <EventDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          event={currentEvent}
          onChange={handleEventChange}
          onSave={handleSaveEvent}
          isEditing={isEditing}
        />
      </Paper>
    </LocalizationProvider>
  );
};

export default MySchedulerComponent;
