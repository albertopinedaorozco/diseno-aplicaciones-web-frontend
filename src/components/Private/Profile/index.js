
import React, { useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Tweet from '../Tweet';

const Profile = (props) => {
    const params = useParams();
   // console.log(params)
    const [tweets, setTweets] = useState();

    const getTweets = () => {
        const localhost = process.env.REACT_APP_API_URL;
        const URL = `${localhost}/users/${params.userId}/tweets`;
        fetch(URL, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwt')
            }
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            setTweets(json)
        });
    }

    useEffect(() => {
        getTweets()
    }, [])


    return (
        
        
        <>
            <h2>Tweets @{params.username}</h2>
            <p><Link to="/">Return to home</Link></p>
            
            {
                tweets && tweets.map(res => 
                    <Tweet key={res._id} tweet={res}/> 
                )
            }
        </>
    );
}

export default Profile;