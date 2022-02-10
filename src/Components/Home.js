import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const baseUrl = 'http://localhost/soul_business/public/api';

const Home = () => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        document.title = "User List";
        geteUsers();
    }, [])

    const geteUsers = () =>{
        axios.get(`${baseUrl}/get-users`).then((response) => {
            setUser(response.data.data)
        }).catch((error) => {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    }


    const deleteUser = (id) => {
        confirmAlert({
            title: 'Confirm!',
            message: 'Are you sure, you want to delete this record.',
            buttons: [
                {
                label: 'Yes',
                onClick: () => 
                    axios.delete(`${baseUrl}/delete-users/${id}`).then((response) => {
                        geteUsers();
                        toast.success(response.data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }).catch((error) =>{
                        toast.error(error.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
                },
                {
                label: 'No',
                }
            ]
            });
    };

    if (!user) return null;
    return (
        <div className="row">
            <div className="col-md-12">
                <Link to="/add"><button type="button" className="btn btn-primary">Add</button></Link>
            </div>
            <div className="col-sm-12">
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>User Type</th>
                        <th>Status</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((users, index) =>
                                <tr key={index}>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.mobile_number}</td>
                                    <td>{users.user_type}</td>
                                    <td>
                                        {users.status}
                                    </td>
                                    <td>
                                        <img src={users.profile_photo_path} width="100"/>
                                    </td>
                                    <td>
                                        
                                        <Link to={{pathname: `/edit/${users.id}`, state: { user: users}}}>
                                            <button type="button" className="btn btn-primary"><i className="fa fa-pencil"></i></button>
                                        </Link>

                                        &nbsp;
                                        <button onClick={() => deleteUser(users.id)} className='btn btn-danger'><i className="fa fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
