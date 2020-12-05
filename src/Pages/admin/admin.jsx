import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
 
import { useDispatch, useSelector } from 'react-redux';
import {surferActions} from '../../_actions';
 

function AdminApp() {

     

    const user = useSelector(state => state.authentication.user);
    const surfers = useSelector(state => state.surfers.allSurf);
    const dispatch = useDispatch();
    

    useEffect(() => {
         
        
        dispatch(surferActions.getAll());
       
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
                    <h1>Admin view </h1>
                    <p>(tout les formulaires soumis, Accessibles en environnement de dev seulement)</p>
                    <hr/>
                    {surfers &&
                   
                   <table className="table">
                   <thead className={"thead-dark"}>
                   <tr>
                       <th scope="col">Ville</th>
                       <th scope="col">Spot</th>
                       <th scope="col">Pratiquants</th>
                       <th scope="col">Baigneurs</th>
                       <th scope="col">Bateaux (P/L/A)</th>
                       <th scope="col">Date</th>
                       <th scope="col">Durée</th>
                       <th scope="col">Waterman</th>
                       <th scope="col">Produit utilisée</th>
                       
                   </tr>
                   </thead>

                   <tbody>
                   {surfers.map((element, index) =>
                       <tr >
                           <td scope="row">{element.ville}</td>
                           <td >{element.spot.nom}</td>
                           <td >{element.spot.pratiquand_activite}</td>
                           <td >{element.spot.baigneurs}</td>
                           <td >{element.spot.nbBateauxPeche} - {element.spot.nbBateauxLoisir} - {element.spot.nbBateauxAvoile}</td>
                           <td>{new Date(element.debut).toLocaleDateString()}</td>
                           <td>{ msConversion (Math.abs (new Date(element.fin) - new Date(element.debut) ) ) }</td>
                           <td>{element.waterman.nom}</td>
                           <td>{
                           element.waterman.produit_utilise.map((reptile) => <li>{reptile}</li>)
                           }
                           
                           </td>

                       </tr>
                   )}
                   </tbody>

               </table>
               }
                   
 
               

            </div>
            <p> P/L/A = Bateach Peche / Bateau Loisir / Bateau Avoile</p>
        </div>
        </div>
    );
}

export { AdminApp };