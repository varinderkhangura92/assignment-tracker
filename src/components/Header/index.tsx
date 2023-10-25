import React, { useState } from "react";
import styles from "./header.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { uppercase } from "../../helpers/stringHelpers";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

type HeaderProps = {
  addAssignment: (title: string, deadline: Date) => void;
};

export function Header({ addAssignment }: HeaderProps) {
  const [newAssignment, setNewAssignment] = useState<string>("");
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerPosition, setDatePickerPosition] = useState({
    top: 0,
    left: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewAssignment(e.target.value);
  };

  const handleDayClick = (day: Date) => {
    setDeadline(day);
    setIsDatePickerOpen(false);
  };

  const handleSelectDate = () => {
    const buttonRect = document
      .querySelector(".select-date-button")
      ?.getBoundingClientRect();

    if (buttonRect) {
      setDatePickerPosition({
        top: buttonRect.bottom + window.scrollY,
        left: buttonRect.left + window.scrollX,
      });
    }

    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAssignment) {
      addAssignment(newAssignment, deadline || new Date());
      setNewAssignment("");
      setDeadline(undefined);
    }
  };

  return (
    <header className={styles.header}>
      <h1>{uppercase("bcit")} Assignment Tracker</h1>
      <form className={styles.newAssignmentForm} onSubmit={handleSubmit}>
        <input
          placeholder="Add a new assignment"
          type="text"
          value={newAssignment}
          onChange={handleInputChange}
        />
        <div className="date-picker-container">
          <button
            type="button"
            className="select-date-button"
            onClick={handleSelectDate}
          >
            {deadline ? (
              <p>{deadline.toDateString()}</p>
            ) : (
              "Select date"
            )}
          </button>
          {isDatePickerOpen && (
            <div
              className="date-picker-popup"
              style={{
                top: datePickerPosition.top,
                left: datePickerPosition.left,
                backgroundColor: "white", // Background color here
                padding: "10px", // Additional styling for the background
              }}
            >
              <DayPicker
                selected={deadline}
                onDayClick={handleDayClick}
              />
            </div>
          )}
        </div>
        <button type="submit" disabled={!newAssignment}>
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
