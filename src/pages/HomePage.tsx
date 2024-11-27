import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
      {/* Textová časť */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start px-6 sm:px-12 py-8">
        <h1 className="text-3xl sm:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
          Welcome to Task Manager
        </h1>
        <p className="text-sm sm:text-lg font-light mb-6 sm:mb-8">
          Simplify your workflow and manage your tasks effortlessly with our
          intuitive interface.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow hover:bg-gray-200 hover:scale-105 transition-transform"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-transparent border border-white font-semibold rounded-lg hover:bg-white hover:text-blue-500 hover:scale-105 transition-transform"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Obrázková časť */}
      <div className="w-full sm:w-1/2 flex justify-center items-center py-8 sm:py-0">
        <img
          src="/HeroImage.svg"
          alt="Task management illustration"
          className="w-3/4 max-w-sm drop-shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
};
