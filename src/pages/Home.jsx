import { Link } from 'react-router-dom';
import { FaDivide, FaMinus, FaPlus, FaTimes } from "react-icons/fa";

const Home = () => {
  const games = [
    { 
      title: 'Addition', 
      path: '/', 
      icon: <FaPlus className="text-4xl text-blue-600" />,
      description: 'Practice basic addition with numbers',
      color: 'bg-blue-100 hover:bg-blue-200'
    },
    { 
      title: 'Subtraction', 
      path: '/subtract', 
      icon: <FaMinus className="text-4xl text-red-600" />,
      description: 'Learn to subtract numbers',
      color: 'bg-red-100 hover:bg-red-200'
    },
    { 
      title: 'Multiplication', 
      path: '/multiply', 
      icon: <FaTimes className="text-4xl text-green-600" />,
      description: 'Master multiplication tables',
      color: 'bg-green-100 hover:bg-green-200'
    },
    { 
      title: 'Division', 
      path: '/divide', 
      icon: <FaDivide className="text-4xl text-purple-600" />,
      description: 'Practice division problems',
      color: 'bg-purple-100 hover:bg-purple-200'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Math Genius</h1>
        <p className="text-xl text-gray-600">Choose a game to start practicing!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link 
            key={game.path}
            to={game.path}
            className={`${game.color} p-6 rounded-lg shadow-md transition-transform hover:scale-105`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                {game.icon}
              </div>
              <h2 className="text-2xl font-bold mb-2">{game.title}</h2>
              <p className="text-gray-600">{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home; 