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
}) => (
  <Scheduler data={data}>
    <ViewState
      currentDate={currentDateState}
      currentViewName={currentViewName}
      onCurrentViewNameChange={setCurrentViewName}
      onCurrentDateChange={setCurrentDate}
    />
    <EditingState onCommitChanges={commitChanges} />
    <IntegratedEditing />
    <DayView startDayHour={9} endDayHour={14} />
    <WeekView startDayHour={9} endDayHour={14} />
    <MonthView />
    <Appointments onAppointmentClick={onAppointmentClick} />
    <AppointmentTooltip
      showOpenButton
      showDeleteButton
      onOpenButtonClick={onEditAppointment}
      onDeleteButtonClick={onDeleteAppointment}
    />
    <Toolbar />
    <DateNavigator />
    <ViewSwitcher />
  </Scheduler>
);

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
  onEditAppointment: PropTypes.func.isRequired,
  onDeleteAppointment: PropTypes.func.isRequired,
  onAppointmentClick: PropTypes.func.isRequired,
};

export default SchedulerComponent;
