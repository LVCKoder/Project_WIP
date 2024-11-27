import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { Task } from "../types/Types";
import { loadTasks, saveTasks } from "../utils/taskStorage";
import { Header } from "../components/Header";
import { TicketSection } from "../components/TicketSection";
import { nanoid } from "nanoid";
import { TicketDetail } from "../components/TicketDetail";
import { TicketComments } from "../components/TicketComments";
import { TicketForm } from "../components/TicketForm";

export const MainPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const handleSaveTask = (task: Omit<Task, "id">) => {
    const newTask = {
      id: nanoid(5),
      comments: [],
      ...task,
    };

    const updatedTasks = [...tasks, newTask];
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
    setModalOpen(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const filterTasks = (status: Task["status"]) =>
    tasks.filter((task) => task.status === status);

  const filteredTasks = filterStatus
    ? tasks.filter((task) => task.status === filterStatus)
    : tasks;

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="flex h-screen">
      {/* Navbar */}
      <Navbar onFilter={setFilterStatus} />
      <main className="w-full p-6">
        <Header onCreateTask={() => setModalOpen(true)} />
        <div className={filterStatus ? "grid grid-cols-1" : "grid grid-cols-3 gap-6"}>
          {filterStatus ? (
            <TicketSection
              title={filterStatus}
              tasks={filteredTasks}
              onTaskClick={setSelectedTask}
            />
          ) : (
            <>
              <TicketSection
                title="To-Do"
                tasks={filterTasks("ToDo")}
                onTaskClick={setSelectedTask}
              />
              <TicketSection
                title="In Progress"
                tasks={filterTasks("InProgress")}
                onTaskClick={setSelectedTask}
              />
              <TicketSection
                title="Finished"
                tasks={filterTasks("Finished")}
                onTaskClick={setSelectedTask}
              />
            </>
          )}
        </div>

        {/* Modálne okno pre vytváranie taskov */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
            onClick={closeModal}
          >
            <div
              className="bg-white p-6 rounded shadow-lg w-1/3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Formulár pre vytvorenie tasku */}
              <TicketForm
                onSave={handleSaveTask}
                onCancel={() => setModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Modálne okno pre detaily tasku */}
        {selectedTask && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    onClick={closeModal}
  >
    <div
      className="bg-white max-w-screen-lg w-full h-[700px] rounded-lg shadow-lg p-6 flex"
      onClick={(e) => e.stopPropagation()}
    >
      {/* TicketDetail: Úprava tasku */}
      <TicketDetail
        task={selectedTask}
        onSave={handleUpdateTask}
        onDelete={handleDeleteTask}
        onClose={closeModal}
      />

      {/* TicketComments: Správa komentárov */}
      <TicketComments taskId={selectedTask.id} />
    </div>
  </div>
)}
      </main>
    </div>
  );
};
