import { FaDivide, FaMinus, FaPlus, FaTimes } from "react-icons/fa"; // Import icons
import { Link } from "react-router-dom";
import { ResponsiveButton } from "../layout/ResponsiveButton";

const Sidebar = () => {
  return (
    <div className="relative">
      <ResponsiveButton />
      <div className="bg-white text-gray-900 p-5 hidden md:flex flex-col space-y-4">
        <h2 className="text-2xl font-bold mb-4">Game Menu</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/add" className="flex items-center py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-lg">
            <FaPlus className="mr-3 text-blue-600" /> Addition
          </Link>
          <Link to="/subtract" className="flex items-center py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-lg">
            <FaMinus className="mr-3 text-red-600" /> Subtraction
          </Link>
          <Link to="/multiply" className="flex items-center py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-lg">
            <FaTimes className="mr-3 text-green-600" /> Multiplication
          </Link>
          <Link to="/divide" className="flex items-center py-3 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-lg">
            <FaDivide className="mr-3 text-purple-600" /> Division
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;