import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { surferActions } from '../../_actions';
 
//CSS
import "./Home.css";


function Unregistered(){
    return (
        <div className="container pt-5 pb-5">

            <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-9 text-center">
                    <h1>Bienvenue sur Surfrider</h1>
                    <h2>L'appli qui te facilite le surf !</h2>
                </div>
            </div>

            <div className="row justify-content-center pt-3">
                <a href="/login" className="btn btn-primary btn-lg scrollto mr-2">Se connecter</a>
                <a href="/register" className="btn btn-primary btn-lg scrollto">S'inscrire</a>
            </div>

        </div>
    );
}

function Registered(){
    const user = useSelector(state => state.authentication.user);
    const weather = useSelector(state => state.surfers.weather);
    const dispatch = useDispatch();
    
    useEffect(() => {
      
        dispatch(surferActions.getWeather('HOSSEGOR'));
        console.log('weather', weather);
    }, []);

    return (
        <div className="container pt-5 pb-5">
        <ul>
       
             </ul>
            <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-9 text-center">
                    <h1>Bonjour {user.firstName}</h1>
                    <h4>Bon retour parmis nous !</h4>
                </div>
            </div>

            <div className="row justify-content-center pt-3">
                <a href="/formulaire" className="btn btn-primary btn-lg scrollto mr-2">Soumettre un formulaire</a>
                <a href="/myforms" className="btn btn-primary btn-lg scrollto">Mes formulaires</a>
            </div>
            <br/>
            <hr/>

            <h5> Des informations utiles sur votre Plage favorite ...  HOSSEGOR  ! &#128512; </h5>
            <br></br>
            {weather &&
                   
                   <table className="table">
                   <thead >
                   <tr>
                       <th scope="col">Icon</th>
                       <th scope="col">Couverture nuageuse</th>
                       <th scope="col">Humidity</th>
                       <th scope="col">Temperature</th>
                       <th scope="col">Vitesse du vent</th>
                       <th scope="col">Description du temps</th>
                        
                       
                   </tr>
                   </thead>

                   <tbody>
                  
                       <tr >
                           <td > <img 
      src={weather.current.weather_icons[0]}
      alt="new"
      /> </td>
                           <td >{weather.current.cloudcover}</td>
                           <td >{weather.current.humidity}</td>
                           <td >{weather.current.temperature}</td>
                           <td > {weather.current.wind_speed} </td>
                           <td >{ weather.current.weather_descriptions[0] }  </td>

                       </tr>
                  
                   </tbody>

               </table>
               }

        </div>
        
        
        
        );
}

function HomePage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(user);
    }, []);

    return (
        <div>
            {user &&
                <Registered/>
            }
            {!user &&
                <Unregistered/>
            }
        </div>
    );
}

export { HomePage };