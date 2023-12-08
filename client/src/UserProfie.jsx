import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch student details based on UTMID from the backend
    axios.get(`http://localhost:8081/student?utmId=${localStorage.getItem('utmId')}`)
      .then(res => {
        setStudentData(res.data);
        fetchBookings(res.data.UTMID);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const fetchBookings = (utmId) => {
    // Get current date
    const currentDate = new Date().toISOString().slice(0, 10);

    // Fetch bookings based on criteria
    axios.get(`http://localhost:8081/bookingHistory?utmId=${utmId}&currentDate=${currentDate}`)
    .then(res => {
      const formattedBookings = res.data.map(booking => ({
        ...booking,
        date: formatDate(booking.date) // Format the date before setting it in state
      }));
      setBookings(formattedBookings);
    })
    .catch(err => {
      console.error(err);
      setError("Error fetching bookings");
    });
};

// Function to format date to "dd-mm-yyyy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h2>User Details</h2>
      {error && <div>{error}</div>}
      {studentData && (
        <div>
            <p>Hi, {studentData.UTMID} !</p>
            <p>Name: {studentData.name}</p>
            <p>Matric Number: {studentData.matricNo}</p>
            <p>IC: {studentData.IC}</p>
            <p>Faculty: {studentData.faculty}</p>
            <p>Course: {studentData.course}</p>
            <p>Phone: {studentData.phoneNo}</p>
            <p>Email: {studentData.email}</p>
            <h3>Bookings Today or After Today</h3>
          
          {bookings.length === 0 ? (
            <p>No bookings found for today or after today.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Sport Type</th>
                  <th>Venue</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.bookingID}>
                    <td>{booking.date}</td>
                    <td>{booking.timeSlot}</td>
                    <td>{booking.nameSport}</td>
                    <td>{booking.sportVenueID}</td>
                    <td>{booking.fulledCapacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;