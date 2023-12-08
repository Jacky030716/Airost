import axios from 'axios';
import React, { useState } from 'react'

function Register(){
    //TO DB
    const [student, setStudent] = useState({
        matricNo: '',
        name: '',
        IC: '',
        faculty: '',
        course: '',
        phoneNo: '',
        email:'',
        UTMID:''
    })

    const handleUTMIDinput = (e) => {
        const value = e.target.value;
    
        // Update both user and student state properties with the new UTMID value
        setUser({ ...user, UTMID: value });
        setStudent({ ...student, UTMID: value });
      };

    const [user, setUser] = useState({
        UTMID: '',
        password: ''
    })



    //for submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/student', student)
        .then(res => console.log(res))
        .catch(err => console.log(err))

        axios.post('http://localhost:8081/user', user)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    //Simple Form
    return(
        <div>
            <form onSubmit={handleSubmit} id="register">
                <h2>SIGN UP</h2>
                <div>
                    <label htmlFor="" id="name">Name</label>
                    <input type="text" onChange={e => setStudent({...student, name: e.target.value})}></input>
                </div>
                <div>
                    <label htmlFor="" id="matricNo">Matric No</label>
                    <input type="text" onChange={e => setStudent({...student, matricNo: e.target.value})}></input>
                </div>
                <div>
                    <label htmlFor="" id="phoneNo">Phone No</label>
                    <input type="text" onChange={e => setStudent({...student, phoneNo: e.target.value})}></input>
                </div>
                <div>
                    <label htmlFor="" id="IC">IC</label>
                    <input type="text" onChange={e => setStudent({...student, IC: e.target.value})}></input>
                </div>
                <div>
                    <label htmlFor="" id="faculty">Faculty</label>
                    <input type="text" onChange={e => setStudent({...student, faculty: e.target.value})}></input>
                </div>
                <div>
                    <label htmlFor="" id="course">Course</label>
                    <input type="text" onChange={e => setStudent({...student, course: e.target.value})}></input>
                </div>
                <div>
                    <label htmlFor="" id="email">Email</label>
                    <input type="text" onChange={e => setStudent({...student, email: e.target.value})}></input>
                </div>
                <div>
                    <label htmlFor="" id="UTMID">UTM ID</label>
                    <input type="text" onChange={handleUTMIDinput}></input>
                </div>
                <div>
                    <label htmlFor="" id="password">Password</label>
                    <input type="text" onChange={e => setUser({...user, password: e.target.value})}></input>
                </div>
                <p>

                </p>
                <button>Register</button>
            </form>

        </div>
    )
}

export default Register