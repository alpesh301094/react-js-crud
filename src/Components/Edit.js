import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link,useHistory} from "react-router-dom";
import {useFormik } from 'formik';
import axios from 'axios';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

const baseUrl = 'http://localhost/soul_business/public/api';

const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Required";
    }else if(values.name.length > 15){
        errors.name = "Must be 15 characters or less";
    }

    if(!values.email){
        errors.email = "Required";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = "Invalid email address";
    }

    if(!values.mobile_number){
        errors.mobile_number = "Required";
    }else if(values.mobile_number.length > 10){
        errors.mobile_number = "Must be 10 characters or less";
    }
    return errors;
}

const Edit = () => {
    const [initialValues, setInitialValues] = useState();

    let {id} = useParams();
    let userId = id;
    const location = useLocation()
    const { user } = location.state
    let history = useHistory();
    
    useEffect(() => {
        loadUser();
    }, []);
        

    const loadUser = async e => {
        const result = await axios.get(`${baseUrl}/get-users-info/${userId}`);
        // console.log(result.data.data);
        // return result.data.data;
    }
    const formik = useFormik({
        initialValues: {
            name: user.name,
            email: user.email,
            mobile_number: user.mobile_number,
        },
        validate,
        onSubmit: values => {
            let bodyFormData = values;
            bodyFormData.id = userId;
            // console.log(bodyFormData);
            axios({
            method: "post",
            url: `${baseUrl}/edit-users`,
            data: bodyFormData,
            // headers: { "Content-Type": "multipart/form-data" },
            }).then(function (response) {
            if(response.data.status === true){
                history.push("/");
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                formik.resetForm();
            }
            }).catch(function (response) {
                // handle error
                // console.log(response);
            });
        },
    }); 

    return (
        <div className="row justify-content-center">
            <div className="col-4">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label for="name">Name:</label>
                        <input 
                        type="hidden" 
                        name="id" 
                        id="id" 
                        value={userId}/>
                        <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        placeholder="Enter name" 
                        id="name" 
                        onChange={formik.handleChange}
                        value={formik.values.name}/>
                        {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                    </div>
                    <div className="form-group">
                        <label for="name">Email:</label>
                        <input 
                        type="text" 
                        name="email" 
                        className="form-control" 
                        placeholder="Enter email" 
                        id="email" 
                        onChange={formik.handleChange}
                        value={formik.values.email}/>
                        {formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                    </div>
                    <div className="form-group">
                        <label for="name">Mobile Number:</label>
                        <input 
                        type="text" 
                        name="mobile_number" 
                        className="form-control" 
                        placeholder="Enter Mobile Number" 
                        id="mobile_number" 
                        onChange={formik.handleChange}
                        value={formik.values.mobile_number}/>
                        {formik.errors.mobile_number ? <div className="text-danger">{formik.errors.mobile_number}</div> : null}
                    </div>
                    <div className="d-flex pt-1">
                        <button type="submit" className="btn btn-success" >Submit</button>
                        &nbsp;<Link to="/">
                            <button type="button" className="btn btn-danger">
                                BACK
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Edit
