import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Booking() {
  const [sport, setSport] = useState('');
  const [sportDetail, setSportDetail] = useState(null);
  const [sportVenues, setSportVenues] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedSportID, setselectedSportID] = useState('');
  const [selectedSportVenue, setselectedSportVenue] = useState('');
  const [fulledCapacity, setFulledCapacity] = useState('');

  const handleSelectionChange = (event) => {
    const selectedSport = event.target.value;
    setSport(selectedSport);

    axios.get(`http://localhost:8081/sport?nameSport=${selectedSport}`)
      .then(res => {
        if (res.data && res.data.capacity) {
          setSportDetail(res.data);
          fetchSportVenues(res.data.sportID);
          setselectedSportID(res.data.sportID);
        } else {
          setSportDetail({ capacity: 'Not Available' });
        }
      })
      .catch(err => {
        console.error(err);
        setSportDetail({ capacity: 'Not Available' });
      });
  };

  const fetchSportVenues = (selectedSportID) => {
    axios.get(`http://localhost:8081/sportVenues?sportID=${selectedSportID}`)
      .then(res => {
        setSportVenues(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  };

  // Function to handle date change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  // Function to handle time slot change
  const handleTimeSlotChange = (event) => {
    setSelectedTimeSlot(event.target.value);
  };

  // Function to handle fulledCapacity change
  const handleFulledCapacityChange = (event) => {
    setFulledCapacity(event.target.value);
  };

  //Function to book court
  const bookCourt = () => {
    const userID = localStorage.getItem('utmId');
    if (!userID) {
      console.error('User ID not found.');
      return;
    }

    axios.post('http://localhost:8081/booking', {
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      fulledCapacity: fulledCapacity,
      sportVenueID: selectedSportVenue,
      UTMID: userID,
    })
      .then((res) => {
        if(res == "Booking successful!")
          console.log('Booking successful:', res.data);
        // Optionally, add logic to handle success (e.g., show a success message)
      })
      .catch((err) => {
        console.error('Booking failed:', err);
        console.log('Unavailable Time Slot');
        // Optionally, add logic to handle failure (e.g., show an error message)
      });
  };

  return (
    <div>
      <h2>Booking</h2>
      <div>
        <p>Sport:
          <select value={sport} onChange={handleSelectionChange}>
            <option value="">Select...</option>
            <option value="Badminton">Badminton</option>
            <option value="Ping Pong">Ping Pong</option>
            <option value="VolleyBall">VolleyBall</option>
          </select>
        </p>
        <p>Sport Venues:</p>
        <select value={selectedSportVenue} onChange={(event) => setselectedSportVenue(event.target.value)}>
        <option value="">Select...</option>
          {sportVenues.map((venue, index) => (
            
            <option key={index} value={venue.sportVenueID}>
              {venue.sportVenueID}
            </option>
          ))}
        </select>
        <p>
          Date:
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </p>
        <p>
          Time Slot:
          <select value={selectedTimeSlot} onChange={handleTimeSlotChange}>
            <option value="">Select...</option>
            <option value="08:00 - 10:00">08:00 - 10:00</option>
            <option value="10:00 - 12:00">10:00 - 12:00</option>
            <option value="12:00 - 14:00">12:00 - 14:00</option>
          </select>
        </p>
        <p>Maximum Capacity: {sportDetail ? sportDetail.capacity : 'Not Available'}</p>
        <p>
          Fulled Capacity:
          <input
            type="number"
            value={fulledCapacity}
            onChange={handleFulledCapacityChange}
            placeholder="Enter number of players"
          />
        </p>
        <button onClick={bookCourt}>Book Court</button>
      </div>
    </div>
  );
}

export default Booking;