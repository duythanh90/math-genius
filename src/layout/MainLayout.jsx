import Sidebar from "../components/Sidebar"
import PropTypes from 'prop-types'

export const MainLayout = (props) => {
    const { children } = props
    return (
        <>
            <div className="grid sm:grid-cols-4 md:grid-cols-4 xl:grid-cols-5 h-screen">
                <Sidebar />
                <div className="sm:col-span-3 md:col-span-3 xl:col-span-4 w-full">
                    {children}
                </div>
            </div>
        </>
    )
}

MainLayout.propTypes = {
    children: PropTypes.node.isRequired
}