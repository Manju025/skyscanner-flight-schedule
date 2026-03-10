import React, { useState } from "react";
import BpkButton from "@skyscanner/backpack-web/bpk-component-button";
import BpkText from "@skyscanner/backpack-web/bpk-component-text";
import BpkCalendar, {
  CALENDAR_SELECTION_TYPE,
} from "@skyscanner/backpack-web/bpk-component-calendar";
import BpkInput, {
  INPUT_TYPES,
} from "@skyscanner/backpack-web/bpk-component-input";
import { format } from "@skyscanner/backpack-web/bpk-component-calendar/src/date-utils";

import { cssModules } from "@skyscanner/backpack-web/bpk-react-utils";

import STYLES from "./App.scss";

const getClassName = cssModules(STYLES);
const formatDate = (date) => format(date, "EEEE, do MMMM yyyy");
const formatMonth = (date) => format(date, "MMMM yyyy");
const daysOfWeek = [
  {
    name: "Sunday",
    nameAbbr: "Sun",
    index: 0,
    isWeekend: true,
  },
  { name: "Monday", nameAbbr: "Mon", index: 1, isWeekend: false },
  { name: "Tuesday", nameAbbr: "Tue", index: 2, isWeekend: false },
  { name: "Wednesday", nameAbbr: "Wed", index: 3, isWeekend: false },
  { name: "Thursday", nameAbbr: "Thu", index: 4, isWeekend: false },
  { name: "Friday", nameAbbr: "Fri", index: 5, isWeekend: false },
  { name: "Saturday", nameAbbr: "Sat", index: 6, isWeekend: true },
];

const App = () => {
  const [selectionConfiguration, setSelectionConfiguration] = useState({
    type: CALENDAR_SELECTION_TYPE.SINGLE,
    date: null,
  });
  const dateSelectedHandler = (date) => {
    setSelectionConfiguration((prevState) => ({
      ...prevState,
      date: date,
    }));
  };
  return (
    <div className={getClassName("App")}>
      <header className={getClassName("App__header")}>
        <div className={getClassName("App__header-inner")}>
          <BpkText
            tagName="h1"
            textStyle="xxl"
            className={getClassName("App__heading")}
          >
            Flight Schedule
          </BpkText>
        </div>
      </header>
      <main className={getClassName("App__main")}>
        <BpkInput
          id="dateInput"
          type={INPUT_TYPES.text}
          name="date"
          value={(selectionConfiguration.date || "").toString()}
          placeholder="Departure Date"
          className={getClassName("App__input")}
        />
        <BpkCalendar
          id="calendar"
          onDateSelect={dateSelectedHandler}
          formatMonth={formatMonth}
          formatDateFull={formatDate}
          daysOfWeek={daysOfWeek}
          weekStartsOn={1}
          changeMonthLabel="Change Month"
          nextMonthLabel="Next Month"
          previousMonthLabel="Previous Month"
          selectionConfiguration={selectionConfiguration}
          className={getClassName("App__calendar")}
        />
        <div>
          <BpkButton onClick={() => alert(`Flight Booked! on ${formatDate(selectionConfiguration.date)}`)}>Continue</BpkButton>
        </div>
      </main>
    </div>
  );
};

export default App;