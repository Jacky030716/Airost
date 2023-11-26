import { shuttlecock, pingpong, volleyball, racquet, pingpongplayer, volley } from '../assets'

export const timeSlots = [
    "08:00 - 10:00 ",
    "10:00 - 12:00 ",
    "12:00 - 14:00 ",
    "14:00 - 16:00 ",
    "16:00 - 18:00 ",
    "18:00 - 20:00 ",
    "20:00 - 21:50 ",
]

export const courtNumbers = [
    "Court 1",
    "Court 2",
    "Court 3",
    "Court 4",
    "Court 5",
    "Court 6",
    "Court 7",
    "Court 8",
    "Court 9",
    "Court 10",
]

export const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
]

export const icons = [{
    key: 1,
    name: "Shuttlecock",
    img: shuttlecock,
    background: racquet
}, {
    key: 2,
    name: "Ping Pong",
    img: pingpong,
    background: pingpongplayer
}, {
    key: 3,
    name: "Volleyball",
    img: volleyball,
    background: volley
}];

export const userNavLinks = [{
    key: 1,
    icon: 'AccountCircleIcon',
    name: 'Profile'
},{
    key: 2,
    icon: 'CalendarMonthIcon',
    name: 'Upcoming Activities'
}]
