import { Task } from "../../types/Types";

type TicketTableProps = {
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
};

export const TicketSection: React.FC<TicketTableProps> = ({ title, tasks, onTaskClick }) => {

  return (
    <section className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskClick(task)}
            className="cursor-pointer bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold">{task.name}</h3>
            <p className="text-gray-600 text-sm truncate">
              {task.description.length > 20
                ? `${task.description.slice(0, 20)}...`
                : task.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}