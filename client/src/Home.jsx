import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get('http://localhost:8081/avaliableJoin')
      .then(res => {
        setBookings(res.data);
        const formattedBookings = res.data.map(booking => ({
          ...booking,
          date: formatDate(booking.date) // Format the date before setting it in state
        }));
        setBookings(formattedBookings);
      })
      .catch(err => {
        console.error('Error fetching bookings:', err);
      });
  };

  const handleJoin = (bookingID) => {
    axios.post(`http://localhost:8081/joinBooking/${bookingID}`)
      .then(res => {
        console.log('Booking joined:', res.data);
        // Refresh the bookings after a successful join
        fetchBookings();
      })
      .catch(err => {
        console.error('Error joining booking:', err);
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
      <h2>Bookings with Fulled Capacity Not Matching Sport Capacity</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Fulled Capacity</th>
            <th>Sport Venue</th>
            <th>Sport Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingID}>
              <td>{booking.date}</td>
              <td>{booking.timeSlot}</td>
              <td>{booking.fulledCapacity}</td>
              <td>{booking.sportVenueID}</td>
              <td>{booking.sportType}</td>
              <td>
                <button onClick={() => handleJoin(booking.bookingID)}>Join</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
