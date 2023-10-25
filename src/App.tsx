import { useState } from "react";
import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";

function App() {
  const [assignments, setAssignments] = useState<any[]>([]);

  const addAssignment = (title: string, deadline: Date) => {
    const newAssignment = {
      title,
      completed: false,
      deadline,
    };
    setAssignments([...assignments, newAssignment]);
  };

  const deleteAssignment = (index: number) => {
    const updatedAssignments = [...assignments];
    updatedAssignments.splice(index, 1);
    setAssignments(updatedAssignments);
  };

  const markAsCompleted = (index: number) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index].completed = !updatedAssignments[index].completed;
    setAssignments(updatedAssignments);
  };

  return (
    <>
      <Header addAssignment={addAssignment} />
      <Assignments
        assignments={assignments}
        deleteAssignment={deleteAssignment}
        markAsCompleted={markAsCompleted}
      />
    </>
  );
}

export default App;
