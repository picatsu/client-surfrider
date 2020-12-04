import React, {Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../_actions';

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
    const dispatch = useDispatch();

    return (
        <div className="container pt-5 pb-5">

            <div className="row justify-content-center">
                <div className="col-xl-7 col-lg-9 text-center">
                    <h1>Bonjour {user.firstName}</h1>
                    <h4>Bon retour parmis nous !</h4>
                </div>
            </div>

            <div className="row justify-content-center pt-3">
                <a href="/formulaire" className="btn btn-primary btn-lg scrollto mr-2">Soumettre un formulaire</a>
                <a href="#" className="btn btn-primary btn-lg scrollto">Mes formulaires</a>
            </div>
            <br/>
            <hr/>
            <div className="row">
                <div className="col-12 text-center">
                    <h2>Les dernières actualiés sur le surf</h2>
                </div>

                <div className="col-3">
                    <div className="card">
                        <img className="card-img-top" src="https://occ-0-1068-1723.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABYQp33Z3D9uGJK0IZsYfvENQpSz4zoSrjb8v5CCl4UTiFDe7Z_yovhieDFhJtGm2Rh4LoleJfHwHdyRDMtezwqojkDXH.jpg?r=77f" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the
                                bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>


            </div>

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