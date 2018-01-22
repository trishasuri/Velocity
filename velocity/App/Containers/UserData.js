var userData = [{
    currentState: 0,
    name: 'Serena M.',
    picture: require('../Images/serena.png'),
    weeklyKM: '0',
    totalKM: '0',
    quote: "Hey Serena!. Start Your Biking Journey With Us, by Selecting a Challenge"
},
{
    currentState: 1,
    name: 'Serena M.',
    picture: require('../Images/serena.png'),
    weeklyKM: '0',
    totalKM: '36',
    quote: "Hey Serena!. Prepare for your next challenge. Ready.set. go!",
    currentProgress: {
        distanceDone: 3,
    },
    progress: 0
},
{
    currentState: 2,
    name: 'Serena M.',
    pictures: require('../Images/serena.png'),
    weeklyKM: '15',
    totalKM: '51',
    currentProgress: {
        distanceDone: 7
    },
    quote: "Hey Serena!. You're doing great. Keep it up. Finish Strong.",
    progress: 0.15
}, {
    currentState: 3,
    name: 'Serena M.',
    pictures: require('../Images/serena.png'),
    weeklyKM: '30',
    totalKM: '66',
    currentProgress: {
        distanceDone: 7
    },
    quote: "Hey Serena!. You're doing great. Keep it up. Finish Strong.",
    progress: 0.3
},
{
    currentState: 4,
    name: 'Serena M.',
    picture: require('../Images/serena.png'),
    weeklyKM: '100',
    totalKM: '136',
    quote: "Hey Serena!. You're doing great. Keep it up. Finish Strong.",
    currentProgress: {
        distanceDone: 3,
    },
    progress: 1
}]

var currentChallenge = {
    logo: require('../Images/adidas_logo.png'),
    displayText: 'Superstar Challenge',
    slideColor: [],
    totalDistance: 10,
    totalDays: 7,
    background: require('../Images/Superstars_Gradient_Overlay.png'),
    // background: require('../Images/adidas_overlay.png'),
    progress: 0.3,
    couponCode: require('../Images/White_QR_code.png'),
}

var completedChallenges = [{
    logo: require('../Images/dean_david_logo.png'),
    displayText: 'Salad Challenge',
    slideColor: [],
    totalDistance: 10,
    totalDays: 7,
    background: require('../Images/Salad_Gradient_Overlay.png'),
    couponCode: require('../Images/White_QR_code.png'),
    progress: 1
},
{
    logo: require('../Images/dean_david_logo.png'),
    displayText: 'Smoothie Challenge',
    slideColor: [],
    totalDistance: 10,
    totalDays: 7,
    background: require('../Images/Smoothie_Gradient_Overlay.png'),
    couponCode: require('../Images/White_QR_code.png'),
    progress: 1
}
]

module.exports = { completedChallenges, currentChallenge, userData };
