import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
 
import { useDispatch, useSelector } from 'react-redux';
import {surferActions} from '../../_actions';
 

function MyFormsApp() {

    console.log('HELLOOO ')

    const user = useSelector(state => state.authentication.user);
    const surfers = useSelector(state => state.surfers.currentSurf);
    const dispatch = useDispatch();
    

    useEffect(() => {
        console.log(user);
        
        dispatch(surferActions.getById(user.id));
        console.log(surfers);
    }, []);
    function msConversion(millis) {
        let sec = Math.floor(millis / 1000);
        let hrs = Math.floor(sec / 3600);
        sec -= hrs * 3600;
        let min = Math.floor(sec / 60);
        sec -= min * 60;
      
        sec = '' + sec;
        sec = ('00' + sec).substring(sec.length);
      
        if (hrs > 0) {
          min = '' + min;
          min = ('00' + min).substring(min.length);
          return hrs + ":" + min + ":" + sec;
        }
        else {
          return min + ":" + sec;
        }
      }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Mes précedents Formulaires</h1>
                    <hr/>
                    {surfers &&
                   
                   <table className="table">
                   <thead className={"thead-dark"}>
                   <tr>
                       <th scope="col">Ville</th>
                       <th scope="col">Spot</th>
                       <th scope="col">Date</th>
                       <th scope="col">Durée</th>
                       <th scope="col">Waterman</th>
                       
                   </tr>
                   </thead>

                   <tbody>
                   {surfers.map((element, index) =>
                       <tr >
                           <td scope="row">{element.ville}</td>
                           <td >{element.spot.nom}</td>
                           <td>{new Date(element.debut).toLocaleDateString()}</td>
                           <td>{ msConversion (Math.abs (new Date(element.fin) - new Date(element.debut) ) ) }</td>
                           <td>{element.waterman.nom}</td>

                       </tr>
                   )}
                   </tbody>

               </table>
               }
                   
 
               

            </div>
        </div>
        </div>
    );
}

export { MyFormsApp };