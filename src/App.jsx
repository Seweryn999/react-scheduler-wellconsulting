import { useState, useEffect } from "react";
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
  const [data, setData] = useState([]);
  const [currentViewName, setCurrentViewName] = useState(
    localStorage.getItem("currentViewName") || "Dzień"
  );
  const [currentDateState, setCurrentDate] = useState(
    localStorage.getItem("currentDate") || new Date()
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    startDate: "",
    endDate: "",
    id: null,
  });
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  const [locale] = useState(plLocale);

  const fetchEvents = async () => {
    const eventsCollection = collection(firestore, "wydarzenia");
    const eventsSnapshot = await getDocs(eventsCollection);
    const eventsList = eventsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setData(eventsList);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    localStorage.setItem("currentDate", currentDateState);
  }, [currentDateState]);

  useEffect(() => {
    localStorage.setItem("currentViewName", currentViewName);
  }, [currentViewName]);

  const commitChanges = async ({ added, changed, deleted }) => {
    let updatedData = [...data];

    try {
      if (added) {
        const docRef = await addDoc(collection(firestore, "wydarzenia"), added);
        updatedData = [...updatedData, { id: docRef.id, ...added }];
      }

      if (changed) {
        for (const id in changed) {
          await updateDoc(doc(firestore, "wydarzenia", id), changed[id]);
          updatedData = updatedData.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          );
        }
      }

      if (deleted !== undefined) {
        await deleteDoc(doc(firestore, "wydarzenia", deleted));
        updatedData = updatedData.filter(
          (appointment) => appointment.id !== deleted
        );
      }

      setData(updatedData);
      fetchEvents();
    } catch (error) {
      console.error("Błąd aktualizacji danych: ", error);
    }
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
      setCurrentEvent({ ...selectedAppointment });
      setOpenDialog(true);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedAppointment?.id) {
      commitChanges({ deleted: selectedAppointment.id });
      setSelectedAppointment(null);
    }
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
    const { name, value } = e.target;
    setCurrentEvent((prevEvent) => ({ ...prevEvent, [name]: value }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
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
          selectedAppointment={selectedAppointment}
          onEditAppointment={handleEditEvent}
          onDeleteAppointment={handleDeleteEvent}
          locale={locale} // Przekazanie locale do SchedulerComponent
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
