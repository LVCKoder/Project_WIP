import { useState } from "react";
import { Task } from "../../types/Types";

type TicketFormProps = {
  onSave: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
};

export const TicketForm: React.FC<TicketFormProps> = ({ onSave, onCancel }) => {
  const [formState, setFormState] = useState<Omit<Task, "id">>({
    name: "",
    description: "",
    status: "ToDo",
    priority: "Low"
  });

  const handleSubmit = () => {
    if (!formState.name.trim()) {
      alert('Task name is required!');
      return;
    }
    if (!formState.description.trim()) {
      alert('Task description is required!');
      return;
    }
    onSave(formState);
    setFormState({
      name: "",
      description: "",
      status: "ToDo",
      priority: "Low"
    });
  };


  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create New Task</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={formState.name}
          onChange={(e) =>
            setFormState({ ...formState, name: e.target.value })
          }
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={formState.description}
          onChange={(e) =>
            setFormState({ ...formState, description: e.target.value })
          }
          className="w-full border rounded p-2 resize-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Status</label>
        <select
          value={formState.status}
          onChange={(e) =>
            setFormState({
              ...formState,
              status: e.target.value as Task["status"],
            })
          }
          className="w-full border rounded p-2"
        >
          <option value="ToDo">To-Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Priority</label>
        <select
          value={formState.priority}
          onChange={(e) =>
            setFormState({
              ...formState,
              priority: e.target.value as Task["priority"],
            })
          }
          className="w-full border rounded p-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </div>
  );
}