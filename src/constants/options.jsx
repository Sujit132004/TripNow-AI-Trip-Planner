export const SelectedTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'🤘',
        people:'5 to 10 people'
    }

]

export const SelectedBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont Worry about cost',
        icon:'🤑'
    }
]

export const AI_PROMPT='Generate Travel Plan for Location:{location},for {totalDays} Days for {traveler} with a {budget} budget , give me Hotel options list with HotelName, Hotel address, Price,hotel image url, geo coordinates,rating,descriptions and suggest itinerary with placeName, Place Details,Place Image Url, Geo Coordinates, ticket Pricing,  Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format .do not add image URL as a field itself because it is causing cors policy issue i will handle it later so dont provide images .also one thing provide the itinerary json data in array format only so that i can easily map over for data inside it because for object it is becoming problematicso, make it like itenerary as an array in which it will contain day field,plan arry with geocordinates init  then place details in it please make it array only and no field for object  '