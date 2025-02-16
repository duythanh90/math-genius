import { useState } from 'react';
import { FaDivide, FaMinus, FaPlus, FaTimes } from "react-icons/fa"; 
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button - increased z-index */}
      <button 
        onClick={toggleMenu}
        className="fixed top-5 left-4 md:hidden z-50 p-2 rounded-md bg-white shadow-lg"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden pt-16"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed md:static inset-y-0 left-0 w-64 bg-white shadow-lg 
        transform transition-transform duration-300 ease-in-out z-40
        md:transform-none pt-20 md:pt-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Math Genius</h2>
          <nav className="space-y-2">
            <Link 
              to="/" 
              className="flex items-center p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              <FaPlus className="mr-3 text-blue-600" />
              Addition
            </Link>
            <Link 
              to="/subtract" 
              className="flex items-center p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              <FaMinus className="mr-3 text-red-600" />
              Subtraction
            </Link>
            <Link 
              to="/multiply" 
              className="flex items-center p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              <FaTimes className="mr-3 text-green-600" />
              Multiplication
            </Link>
            <Link 
              to="/divide" 
              className="flex items-center p-2 hover:bg-gray-100 rounded"
              onClick={() => setIsOpen(false)}
            >
              <FaDivide className="mr-3 text-purple-600" />
              Division
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;