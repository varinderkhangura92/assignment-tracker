import React from "react";
import styles from "./assignment.module.css";
import { TbTrash } from "react-icons/tb";

type AssignmentProps = {
  title: string;
  completed: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
  deadline: Date;
};

export function Assignment({
  title,
  completed,
  onDelete,
  onToggleComplete,
  deadline,
}: AssignmentProps) {
  // Determine the class to apply to the button based on the deadline
  let buttonClass = styles.deleteButton; // Default button class

  const today = new Date();
  const diffTime = Math.abs(deadline.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    buttonClass = `${styles.deleteButton} ${styles.dueTomorrow}`;
  } else if (diffDays === 0) {
    buttonClass = `${styles.deleteButton} ${styles.dueToday}`;
  } else {
    buttonClass = `${styles.dueMoreThanOneDay}`;
  }

  return (
    <div
      className={`${styles.assignment} ${completed ? styles.completed : ""} ${
        completed ? styles.lineThrough : ""
      }`}
    >
      <input type="checkbox" checked={completed} onChange={onToggleComplete} className={styles.roundedCheckbox}/>
      <p>{title}</p>
      <button className={buttonClass}>
        {deadline ? getDeadlineText(deadline) : "No Deadline"}
      </button>
      <button  onClick={onDelete}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}

function getDeadlineText(deadline: Date) {
  const today = new Date();
  const diffTime = Math.abs(deadline.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Due: Tomorrow";
  } else if (diffDays === 0) {
    return "Due: Today";
  } else {
    return `Due: ${diffDays} days away`;
  }
}
