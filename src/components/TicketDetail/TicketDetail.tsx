import React, { useState } from "react";
import { Task } from "../../types/Types";

interface TicketDetailProps {
  task: Task;
  onSave: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
  onClose: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({
  task,
  onSave,
  onDelete,
  onClose,
}) => {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority || "Low");
  const [status, setStatus] = useState<Task["status"]>(task.status);

  const handleSave = () => {
    const updatedTask: Task = { ...task, name, description, priority, status };
    onSave(updatedTask);
    onClose();
  };

  return (
    <div className="w-1/3 pr-6 border-r border-gray-300">
      <h2 className="text-2xl font-bold mb-6">Edit Task</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-lg resize-none h-32"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as Task["status"])}
          className="w-full p-2 border rounded-lg"
        >
          <option value="ToDo">To-Do</option>
          <option value="InProgress">In Progress</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="w-full p-2 border rounded-lg"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
