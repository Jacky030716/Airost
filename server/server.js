import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'sporthall'
})

app.post('/login', (req,res) => {
    const sql = "SELECT * FROM user WHERE UTMID = ? AND password = ?";
    db.query(sql, [req.body.utmId, req.body.password], (err, data) => {
        if(err) return res.json("Error");
        if(data.length > 0){
            return res.json("Success")
        }else{
            return res.json("No record")
        }
    })
})

app.get('/avaliableJoin', (req, res) => {
  const bookingsQuery = 'SELECT * FROM booking';
  const sportVenueQuery = 'SELECT * FROM sportVenue';
  const sportQuery = 'SELECT * FROM sport';

  db.query(bookingsQuery, (bookingsErr, bookings) => {
    if (bookingsErr) {
      return res.status(500).json({ error: 'Error fetching bookings' });
    }

    db.query(sportVenueQuery, (sportVenueErr, sportVenues) => {
      if (sportVenueErr) {
        return res.status(500).json({ error: 'Error fetching sport venues' });
      }

      db.query(sportQuery, (sportErr, sports) => {
        if (sportErr) {
          return res.status(500).json({ error: 'Error fetching sport capacity' });
        }

        // Set tempSportID based on booking's sportVenueID
        bookings.forEach(booking => {
          const tempSport = sportVenues.find(sportVenue => sportVenue.sportVenueID === booking.sportVenueID);
          booking.tempSportID = tempSport ? tempSport.sportID : null;
        });

        // Filter bookings where fulledCapacity does not match the sport capacity
        const currentDate = new Date().toISOString().slice(0, 10);
        const filteredBookings = bookings.filter(booking => {
          const sport = sports.find(s => s.sportID === booking.tempSportID);
          return (
            sport &&
            booking.fulledCapacity !== sport.capacity &&
            new Date(booking.date) >= new Date(currentDate) // Filter by date: today or after today
          );
        }).map(booking => {
          const sport = sports.find(s => s.sportID === booking.tempSportID);
          return {
            ...booking,
            sportType: sport.nameSport // Add sportType with nameSport to the object
          };
        });

        return res.json(filteredBookings);
      });
    });
  });
});


app.post('/joinBooking/:bookingID', (req, res) => {
  const { bookingID } = req.params;

  const updateQuery = 'UPDATE booking SET fulledCapacity = fulledCapacity + 1 WHERE bookingID = ?';

  db.query(updateQuery, [bookingID], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error joining booking' });
    }
    return res.json({ message: 'Booking joined successfully' });
  });
});

app.get('/sport', (req, res) => {
    const { nameSport } = req.query;
    const sql = "SELECT * FROM sport WHERE nameSport = ?";
  
    db.query(sql, [nameSport], (err, data) => {
      if(err) return res.json(err);
      return res.json(data[0]);
    });
});

app.get('/sportVenues', (req, res) => {
  const { sportID } = req.query;
  const sql = "SELECT * FROM sportVenue WHERE sportID = ?";

  db.query(sql, [sportID], (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  });
});

app.post('/booking', (req, res) => {
  const { date, timeSlot, fulledCapacity, sportVenueID, UTMID } = req.body;

  // Check if a booking already exists for the provided date and sportVenueID
  const checkBookingSql = 'SELECT * FROM booking WHERE date = ? AND sportVenueID = ?';
  db.query(checkBookingSql, [date, sportVenueID], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking booking:', checkErr);
      return res.status(500).json({ error: 'Error in booking. Please try again later.' });
    }

    if (checkResult && checkResult.length > 0) {
      // If a booking exists for the provided date and sportVenueID, return a message indicating it's not possible to book
      return res.status(400).json({ message: 'Booking already exists for this date and venue.' });
    }

    // If no booking exists, proceed to insert the new booking details into the database
    const insertBookingSql = 'INSERT INTO booking (date, timeSlot, fulledCapacity, sportVenueID, UTMID) VALUES (?, ?, ?, ?, ?)';
    db.query(insertBookingSql, [date, timeSlot, fulledCapacity, sportVenueID, UTMID], (insertErr, result) => {
      if (insertErr) {
        console.error('Error in booking:', insertErr);
        return res.status(500).json({ error: 'Error in booking. Please try again later.' });
      }

      return res.status(200).json({ message: 'Booking successful!' });
    });
  });
});


app.get('/student', (req, res) => {
  const { utmId } = req.query;
  const sql = "SELECT * FROM student WHERE UTMID = ?";

  db.query(sql, [utmId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    
    if (data.length > 0) {
      return res.json(data[0]); // Assuming only one student record per UTMID
    } else {
      return res.status(404).json({ message: "No student record found" });
    }
  })
})

app.get('/bookingHistory', (req, res) => {
  const { utmId, currentDate } = req.query;
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  const sql = `
    SELECT booking.*, sport.nameSport
    FROM booking 
    JOIN sportVenue ON booking.sportVenueID = sportVenue.sportVenueID
    JOIN sport ON sportVenue.sportID = sport.sportID
    WHERE booking.UTMID = ? 
    AND ((booking.date = ? AND CAST(SUBSTRING_INDEX(booking.timeSlot, ' - ', 1) AS TIME) >= CAST(? AS TIME)) OR booking.date > ?)`;

  db.query(sql, [utmId, currentDate, currentTime, currentDate], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    return res.json(data);
  });
});



app.post('/forgotpassword', (req, res) => {
    const sql = "SELECT password FROM user WHERE UTMID = ?";
    db.query(sql, [req.body.utmId], (err, data) => {
      if (err) return res.json("Error");
  
      if (data.length > 0) {
        const password = data[0].password; // Retrieve password from query result
        return res.json({ password }); // Return password variable as JSON response
      } else {
        return res.json("No record");
      }
    })
})

app.put('/resetpassword/:id', (req, res) => {
    const { id } = req.params; // Get UTMID from URL parameter
    const { newPassword } = req.body; // Get the new password from the request body
  
    // SQL query to update the password for a specific UTMID
    const sql = "UPDATE user SET password = ? WHERE UTMID = ?";
  
    // Execute the SQL query with parameters (newPassword, id)
    db.query(sql, [newPassword, id], (err, result) => {
      if (err) {
        return res.json(err);
      }
      return res.json('Password updated successfully');
    });
  });

app.post('/student', (req, res) =>{
    const sql = "INSERT INTO student VALUES (?)";
    const values = [
        req.body.matricNo,
        req.body.name,
        req.body.IC,
        req.body.faculty,
        req.body.course,
        req.body.phoneNo,
        req.body.email,
        req.body.UTMID
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.post('/user', (req, res) =>{
    const sql = "INSERT INTO user VALUES (?)";
    const values = [
        req.body.UTMID,
        req.body.password
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.listen(8081, ()=>{
    console.log("Connected!")
})