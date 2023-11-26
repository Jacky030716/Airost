import { ping_pong, shuttlecock, pingpong, volleyball, racquet, volley, pingpongplayer } from '../assets'

export const datas = [{
    key: "sport1",
    name: "Badminton",
    icon: shuttlecock,
    venue: "Court 2",
    time: "08:00 - 10:00",
    date: "10/11/2023",
    organizer: "Jacky",
    players: "1/8",
    image: racquet
},{
    key: "sport2",
    name: "Ping Pong",
    icon: pingpong,
    venue: "Court 1",
    time: "10:00 - 12:00",
    date: "10/10/2023",
    organizer: "Si Ni",
    players: "2/4",
    image: pingpongplayer
},
{
    key: "sport3",
    name: "Volleyball",
    icon: volleyball,
    venue: "Court 3",
    time: "12:00 - 14:00",
    date: "10/12/2023",
    organizer: "Johnny",
    players: "3/6",
    image: volley
},{
    key: "sport4",
    name: "Badminton",
    icon: shuttlecock,
    venue: "Court 4",
    time: "14:00 - 16:00",
    date: "10/13/2023",
    organizer: "Jacky",
    players: "6/8",
    image: racquet
}];

export const activities = [{
    key: "activity1",
    date: "10/11/2023",
    time: "08:00 - 10:00",
    name: "Badminton",
    venue: "Court 2",
    players: "6",
    src: racquet
},{
    key: "activity2",
    date: "10/10/2023",
    time: "10:00 - 12:00",
    name: "Ping Pong",
    venue: "Court 1",
    players: "2",
    src: ping_pong
}]