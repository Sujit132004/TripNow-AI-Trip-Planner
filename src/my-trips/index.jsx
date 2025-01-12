import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate(); // Move useNavigate to the top level
    const [userTrips, setUserTrips] = useState([]); // Ensure it's initialized as an array

    useEffect(() => {
        GetUserTrips(); // Call the function on component mount
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user')); // Parse user data
        if (!user) {
            navigate('/'); // Redirect if user is not logged in
            return;
        }

        try {
            const q = query(
                collection(db, 'AITrips'),
                where('userEmail', '==', user.email)
            );
            const querySnapshot = await getDocs(q);

            // Collect trips into an array
            const tripsArray = [];
            querySnapshot.forEach((doc) => {
                tripsArray.push({ id: doc.id, ...doc.data() }); // Add document ID to data
            });

            setUserTrips(tripsArray); // Update state once with the entire array
        } catch (error) {
            console.error('Error fetching user trips:', error);
        }
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl">My Trips 📍</h2>
            <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
                {userTrips.map((trip) => (
                    <UserTripCardItem key={trip.id} trip={trip} /> // Add unique key
                ))}
            </div>
        </div>
    );
}

export default MyTrips;
