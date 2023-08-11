import "./styles/WarningUser.css";

const WarningUser = ({
    user,
    handleCreateUpdate,
    handleDelete,
    closeWarning,
    handleCloseWarning,
    flag
}) => {

    return (
        <div onClick={handleCloseWarning} className={`warninguser-container ${closeWarning && 'close-warning'}`}>
            <form onClick={e => e.stopPropagation()} className="warninguser">
                <h2 className="warninguser__title">{flag === 'N' ? "Create user" : flag === 'U' ? "Edit user" : "Delete user"}</h2>
                <div onClick={handleCloseWarning} className="warninguser__close">x</div>
                <span className="warninguser__message">
                    The user <strong>{`${user?.first_name} ${user?.last_name}`}</strong> has been successfuly {flag === 'N' ? "create" : flag === 'U' ? "update" : "deleted"}
                </span>
                <button onClick={flag === 'N' ? handleCreateUpdate : flag === 'U' ? handleCreateUpdate : handleDelete} className="warninguser__btn">
                    accept
                </button>
            </form>
        </div>
    )
}

export default WarningUser