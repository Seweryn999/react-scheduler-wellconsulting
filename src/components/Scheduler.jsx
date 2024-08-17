import PropTypes from "prop-types";
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Appointments,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";

const SchedulerComponent = ({
  data,
  currentDateState,
  currentViewName,
  setCurrentDate,
  setCurrentViewName,
  commitChanges,
  onEditAppointment,
  onDeleteAppointment,
  onAppointmentClick,
  locale = "pl-PL",
}) => {
  const viewNames = {
    day: "Dzień",
    week: "Tydzień",
    month: "Miesiąc",
  };

  return (
    <Scheduler data={data} locale={locale}>
      <ViewState
        currentDate={currentDateState}
        currentViewName={currentViewName}
        onCurrentViewNameChange={setCurrentViewName}
        onCurrentDateChange={setCurrentDate}
      />
      <EditingState onCommitChanges={commitChanges} />
      <IntegratedEditing />

      <DayView startDayHour={0} endDayHour={24} displayName={viewNames.day} />
      <WeekView startDayHour={0} endDayHour={24} displayName={viewNames.week} />
      <MonthView displayName={viewNames.month} />

      <ConfirmationDialog />
      <Appointments onAppointmentClick={onAppointmentClick} />
      <AppointmentTooltip
        showOpenButton
        showDeleteButton
        onOpenButtonClick={onEditAppointment}
        onDeleteButtonClick={onDeleteAppointment}
      />
      <AppointmentForm />
      <Toolbar />
      <DateNavigator />
      <ViewSwitcher />
    </Scheduler>
  );
};

SchedulerComponent.propTypes = {
  data: PropTypes.array.isRequired,
  currentDateState: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]).isRequired,
  currentViewName: PropTypes.string.isRequired,
  setCurrentDate: PropTypes.func.isRequired,
  setCurrentViewName: PropTypes.func.isRequired,
  commitChanges: PropTypes.func.isRequired,
  selectedAppointment: PropTypes.object,
  onEditAppointment: PropTypes.func.isRequired,
  onDeleteAppointment: PropTypes.func.isRequired,
  onAppointmentClick: PropTypes.func.isRequired,
  locale: PropTypes.string,
};

export default SchedulerComponent;
