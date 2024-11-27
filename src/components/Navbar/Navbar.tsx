import { useNavigate } from "react-router-dom";
import { ClipboardDocumentListIcon, CheckCircleIcon, ArrowLeftEndOnRectangleIcon, Bars3Icon } from "@heroicons/react/24/solid";

type NavbarProps = {
  onFilter: (status: string | null) => void; // Callback na zmenu filtra
};

export const Navbar: React.FC<NavbarProps> = ({ onFilter }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="w-1/6 bg-gray-800 text-white flex flex-col justify-between p-4 h-full">
      <ul className="space-y-6">
        <li>
          <button
            onClick={() => onFilter(null)}
            className="flex items-center text-lg hover:underline"
          >
            <ClipboardDocumentListIcon className="w-6 h-6 mr-3" />
            All Tickets
          </button>
        </li>
        <li>
          <button
            onClick={() => onFilter("ToDo")}
            className="flex items-center text-lg hover:underline"
          >
            <Bars3Icon className="w-6 h-6 mr-3" />
            To-Do
          </button>
        </li>
        <li>
          <button
            onClick={() => onFilter("InProgress")}
            className="flex items-center text-lg hover:underline"
          >
            <ClipboardDocumentListIcon className="w-6 h-6 mr-3" />
            In Progress
          </button>
        </li>
        <li>
          <button
            onClick={() => onFilter("Finished")}
            className="flex items-center text-lg hover:underline"
          >
            <CheckCircleIcon className="w-6 h-6 mr-3" />
            Finished
          </button>
        </li>
      </ul>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-lg"
      >
        <ArrowLeftEndOnRectangleIcon className="w-6 h-6 mr-3" />
        Log Out
      </button>
    </nav>
  );
};
