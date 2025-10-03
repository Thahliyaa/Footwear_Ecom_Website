import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_no, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const token = localStorage.getItem('token');

  const handleUpdate = () => {
    axios.post('http://127.0.0.1:8000/api/profile/update/', 
      { name, email, phone_no, address }, 
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      alert(res.data.message);
    })
    .catch(err => {
      console.error(err);
      alert("Failed to update profile.");
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">👤 User Profile</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <input type="text" className="form-control" value={phone_no} onChange={e => setPhoneNo(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address</label>
                  <textarea className="form-control" rows="3" value={address} onChange={e => setAddress(e.target.value)} />
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary" onClick={handleUpdate}>Update Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
