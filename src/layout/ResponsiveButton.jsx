import PropTypes from 'prop-types'

export const ResponsiveButton = () => {
    return (
        <>
            <div className="fixed top-3 px-3 block md:hidden">
                <button>
                    Menu
                </button>
            </div>
        </>
    )
}

ResponsiveButton.propTypes = {
    children: PropTypes.node.isRequired
}