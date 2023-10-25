import React from "react";
import { Assignment } from "../Assignment";
import styles from "./assignments.module.css";

type AssignmentType = {
  title: string;
  completed: boolean;
  deadline: Date;
};

type AssignmentsProps = {
  assignments: AssignmentType[];
  deleteAssignment: (index: number) => void;
  markAsCompleted: (index: number) => void;
};

export function Assignments({ assignments, deleteAssignment, markAsCompleted }: AssignmentsProps) {
  const completedCount = assignments.filter((a) => a.completed).length;

  return (
    <section className={styles.assignments}>
      <header className={styles.header}>
        <div>
          <p>Created Assignments</p>
          <span>{assignments.length}</span>
        </div>
        <div>
          <p className={styles.textPurple}>Completed Assignments</p>
          <span>
            {completedCount} of {assignments.length}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {assignments.map((assignment, index) => (
          <Assignment
            key={index}
            title={assignment.title}
            completed={assignment.completed}
            onDelete={() => deleteAssignment(index)}
            onToggleComplete={() => markAsCompleted(index)}
            deadline={assignment.deadline}
          />
        ))}
      </div>
    </section>
  );
}
