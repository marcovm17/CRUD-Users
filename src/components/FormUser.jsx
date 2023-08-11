import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./styles/FormUser.css";
import WarningUser from "./WarningUser";

const FormUser = ({
    createNewUser,
    updateInfo,
    updateUserById,
    setUpdateInfo,
    closeForm,
    setCloseForm
}) => {

    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const [closeWarning, setCloseWarning] = useState(true)
    const [user, setUser] = useState()
    const [flag, setFlag] = useState()

    useEffect(() => {
        reset(updateInfo);
    }, [updateInfo]);

    const submit = data => {
        if (updateInfo) {
            //Update
            updateUserById("/users", updateInfo.id, data);
            handleOpenWarning(data)
            setFlag('U')
        } else {
            //Create
            createNewUser("/users", data);
            handleOpenWarning(data)
            setFlag('N')
        }
    };

    const handleCloseForm = () => {
        setCloseForm(true)
        setUpdateInfo()
        reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
        });
    }

    const handleCreateUpdate = (e) => {
        e.preventDefault()
        setCloseWarning(true)
        setCloseForm(true)
        setUpdateInfo()
    }

    const handleCloseWarning = () => {
        setCloseWarning(true)
        setCloseForm(true)
        setUpdateInfo()
    }

    const handleOpenWarning = (data) => {
        setUser(data)
        setCloseWarning(false)
        reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: "",
        });
    }

    return (
        <>
            <div onClick={handleCloseForm} className={`formuser-container ${closeForm && 'close-form'}`}>
                <form onClick={e => e.stopPropagation()} className="formuser" onSubmit={handleSubmit(submit)}>
                    <h2 className="formuser__title">
                        {updateInfo ? "Edit user" : "New user"}
                    </h2>
                    <div onClick={handleCloseForm} className="formuser__close">x</div>
                    <div className="formuser__group">
                        <label className="formuser__label" htmlFor="first_name">
                            Name
                        </label>
                        <input
                            className="formuser__input"
                            {...register("first_name", { required: true, maxLength: 20 })}
                            type="text"
                            id="first_name"
                            placeholder="Enter name"
                        />
                        <small className="formuser__text-danger">
                            {errors.first_name?.type === "required" && "* names are required"}
                            {errors.first_name?.type === "maxLength" && "* Name entered has more than 20 characters"}
                        </small>
                    </div>
                    <div className="formuser__group">
                        <label className="formuser__label" htmlFor="last_name">
                            Last name
                        </label>
                        <input
                            className="formuser__input"
                            {...register("last_name", { required: true })}
                            type="text"
                            id="last_name"
                            placeholder="Enter last name"
                        />
                        <small className="formuser__text-danger">
                            {errors.last_name?.type === "required" && "* Last name are required"}
                        </small>
                    </div>
                    <div className="formuser__group">
                        <label className="formuser__label" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="formuser__input"
                            {...register("email", { required: true, pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i })}
                            type="email"
                            id="email"
                            placeholder="Enter email"
                        />
                        <small className="formuser__text-danger">
                            {errors.email?.type === "required" && "* email is required"}
                            {errors.email?.type === "pattern" && "* Email entered has an incorrect format"}
                        </small>
                    </div>
                    <div className="formuser__group">
                        <label className="formuser__label" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="formuser__input"
                            {...register("password", { required: true, minLength: 8, maxLength: 20 })}
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            autoComplete="true"
                        />
                        <small className="formuser__text-danger">
                            {errors.password?.type === "required" && "* Password is required"}
                            {errors.password?.type === "minLength" && "* Entered password has less than 8 characters"}
                            {errors.password?.type === "maxLength" && "* Password entered has more than 20 characters"}
                        </small>
                    </div>
                    <div className="formuser__group">
                        <label className="formuser__label" htmlFor="birthday">
                            Birthday
                        </label>
                        <input
                            className="formuser__input"
                            {...register("birthday", { required: true })}
                            type="date"
                            id="birthday"
                            placeholder="DD/MM/YYYY"
                        />
                        <small className="formuser__text-danger">
                            {errors.birthday?.type === "required" && "* Birthday date is required"}
                        </small>
                    </div>
                    <button /*onClick={handleOpenWarning} */ className="formuser__btn">
                        {updateInfo ? "Save changes" : "Add new user"}
                    </button>
                </form>
            </div>
            <WarningUser
                user={user}
                handleCreateUpdate={handleCreateUpdate}
                closeWarning={closeWarning}
                handleCloseWarning={handleCloseWarning}
                flag={flag}
            />
        </>
    );
};

export default FormUser