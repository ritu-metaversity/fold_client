import React, { useState } from "react";
import DatePicker, { DatePickerProps } from "react-date-picker";
import { colorHex } from "../../constants";
import "./datePicker.css";

export function CustomizedDatePicker({
  //removing passed props to avoid conflicts
  clearIcon,
  calendarIcon,
  ...restProps
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  //removing passed props to avoid conflicts

  return (
    <DatePicker
      calendarIcon={
        isOpen ? null : (
          <i className="mx-icon-calendar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              width="1em"
              height="1em"
              color={`${colorHex.borderLine}`}
            >
              <path d="M940.218182 107.054545h-209.454546V46.545455h-65.163636v60.50909H363.054545V46.545455H297.890909v60.50909H83.781818c-18.618182 0-32.581818 13.963636-32.581818 32.581819v805.236363c0 18.618182 13.963636 32.581818 32.581818 32.581818h861.090909c18.618182 0 32.581818-13.963636 32.581818-32.581818V139.636364c-4.654545-18.618182-18.618182-32.581818-37.236363-32.581819zM297.890909 172.218182V232.727273h65.163636V172.218182h307.2V232.727273h65.163637V172.218182h176.872727v204.8H116.363636V172.218182h181.527273zM116.363636 912.290909V442.181818h795.927273v470.109091H116.363636z"></path>
            </svg>
          </i>
        )
      }
      onCalendarOpen={() => setIsOpen(true)}
      onCalendarClose={() => setIsOpen(false)}
      clearIcon={
        isOpen ? (
          <>
            <i className="mx-icon-clear">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                width="1em"
                height="1em"
              >
                <path d="M810.005333 274.005333l-237.994667 237.994667 237.994667 237.994667-60.010667 60.010667-237.994667-237.994667-237.994667 237.994667-60.010667-60.010667 237.994667-237.994667-237.994667-237.994667 60.010667-60.010667 237.994667 237.994667 237.994667-237.994667z"></path>
              </svg>
            </i>
          </>
        ) : null
      }
      maxDate={new Date()}
      {...restProps}
    />
  );
}
