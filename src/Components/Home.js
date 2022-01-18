import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const baseUrl = 'http://localhost/soul_business/public/api';

const Home = () => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        geteUsers();
    }, [])

    const geteUsers = () =>{
        axios.get(`${baseUrl}/get-users`).then((response) => {
            setUser(response.data.data)
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
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            user.map((users, index) =>
                                <tr>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.mobile_number}</td>
                                    <td>
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
