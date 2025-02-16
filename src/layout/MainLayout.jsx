import Sidebar from "../components/Sidebar"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const MainLayout = (props) => {
    const { children } = props
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center h-16">
                        <Link to="/" className="text-xl font-bold hover:text-blue-600 transition-colors">
                            Math Genius
                        </Link>
                    </div>
                </div>
            </header>
            <div className="pt-16">
                <div className="grid sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-5 h-screen">
                    <Sidebar />
                    <div className="sm:col-span-3 md:col-span-3 xl:col-span-4 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
}