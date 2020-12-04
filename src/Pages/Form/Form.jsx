import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {surferActions, userActions} from '../../_actions';

function SurfersForm() {

    const user = useSelector(state => state.authentication.user);

    const [inputs, setInputs] = useState({
        ville: '',
        date: '',
        debut: '',
        fin: '',
        spot: '',
        waterman: '',
        userId: user.id
    });

    const [waterman, setWaterman] = useState({
        nom: user.username,
        produit_utilise: ''
    })

    const [spot, setSpot] = useState({
        nom: '',
        baigneurs: 0,
        pratiquand_activite: 0,
        nbBateauxPeche: 0,
        nbBateauxLoisir: 0,
        nbBateauxAvoile: 0
    })
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSpotChange(e) {
        const { name, value } = e.target;
        setSpot(spot => ({ ...spot, [name]: value }));
    }

    function handleWatermanChange(e) {
        const { name, value } = e.target;
        setWaterman(waterman => ({ ...waterman, [name]: value }));
    }

    function handleMultipleSelect(e) {
        const options = e.target.options;
        let value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        waterman.produit_utilise = value;
    }

    function handleSubmit(e) {
        e.preventDefault();
        inputs.spot = spot;
        inputs.waterman = waterman;
        setSubmitted(true);

        if (inputs.debut && inputs.fin && inputs.spot && inputs.ville && inputs.spot && inputs.waterman) {
            if(inputs.date && inputs.debut && inputs.fin){
                let debut = inputs.debut.split(':');
                let fin = inputs.fin.split(':');

                inputs.debut = new Date(inputs.date);
                inputs.debut.setHours(debut[0]);
                inputs.debut.setMinutes(debut[1]);

                inputs.fin = new Date(inputs.date);
                inputs.fin.setHours(fin[0]);
                inputs.fin.setMinutes(fin[1]);
            }
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(surferActions.postSurfer(inputs, from));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Formulaire</h1>
                    <hr/>
                </div>

                <div className="col-12">
                    <form name="form" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Ville</label>
                            <input type="text" name="ville" value={inputs.ville} onChange={handleChange} className={'form-control' + (submitted && !inputs.ville ? ' is-invalid' : '')}  />
                            {submitted && !inputs.ville &&
                            <div className="invalid-feedback">Le nom de la ville est requise</div>
                            }
                        </div>


                        <div className="form-group">
                            <label>Date</label>
                            <input type="date" name="date" value={inputs.date} onChange={handleChange} className={'form-control' + (submitted && !inputs.date ? ' is-invalid' : '')}  />
                            {submitted && !inputs.date &&
                            <div className="invalid-feedback">La date est requise</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Heure de début</label>
                            <input type="time" name="debut" value={inputs.debut} onChange={handleChange} className={'form-control' + (submitted && !inputs.debut ? ' is-invalid' : '')}  />
                            {submitted && !inputs.debut &&
                            <div className="invalid-feedback">L'heure de début est requise</div>
                            }
                        </div>

                        <div className="form-group">
                            <label>Heure de fin</label>
                            <input type="time" name="fin" value={inputs.fin} onChange={handleChange} className={'form-control' + (submitted && !inputs.fin ? ' is-invalid' : '')}  />
                            {submitted && !inputs.fin &&
                            <div className="invalid-feedback">L'heure de fin est requise</div>
                            }
                        </div>

                        <div className="card mb-3">
                            <div className="card-header">
                                Spot
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Nom du spot</label>
                                    <input type="text" name="nom" value={spot.nom} onChange={handleSpotChange} className={'form-control' + (submitted && !spot.nom ? ' is-invalid' : '')}  />
                                    {submitted && !spot.nom &&
                                    <div className="invalid-feedback">Le nom du spot est  requis</div>
                                    }
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Nombre de baigneurs</label>
                                        <input type="number" name="baigneurs" value={spot.baigneurs} onChange={handleSpotChange} className={'form-control' + (submitted && !spot.baigneurs ? ' is-invalid' : '')}  />
                                        {submitted && !spot.baigneurs &&
                                        <div className="invalid-feedback">Le nombre de baigneurs est requis</div>
                                        }
                                    </div>

                                    <div className="form-group col-md-6">
                                        <label>Nombre de pratiquants d'activités</label>
                                        <input type="number" name="pratiquand_activite" value={spot.pratiquand_activite} onChange={handleSpotChange} className={'form-control' + (submitted && !spot.pratiquand_activite ? ' is-invalid' : '')}  />
                                        {submitted && !spot.pratiquand_activite &&
                                        <div className="invalid-feedback">Le nombre de baigneurs pratiquants d'activité est requis</div>
                                        }
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-4">
                                        <label>Nombre de bateaux de pêche</label>
                                        <input type="number" name="nbBateauxPeche" value={spot.nbBateauxPeche} onChange={handleSpotChange} className={'form-control' + (submitted && !spot.nbBateauxPeche ? ' is-invalid' : '')}  />
                                        {submitted && !spot.nbBateauxPeche &&
                                        <div className="invalid-feedback">Le nombre bateaux de pêche d'activité est requis</div>
                                        }
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Nombre de bateaux de loisir</label>
                                        <input type="number" name="nbBateauxLoisir" value={spot.nbBateauxLoisir} onChange={handleSpotChange} className={'form-control' + (submitted && !spot.nbBateauxLoisir ? ' is-invalid' : '')}  />
                                        {submitted && !spot.nbBateauxLoisir &&
                                        <div className="invalid-feedback">Le nombre bateaux de pêche d'activité est requis</div>
                                        }
                                    </div>

                                    <div className="form-group col-md-4">
                                        <label>Nombre de bateaux à voile</label>
                                        <input type="number" name="nbBateauxAvoile" value={spot.nbBateauxAvoile} onChange={handleSpotChange} className={'form-control' + (submitted && !spot.nbBateauxAvoile ? ' is-invalid' : '')}  />
                                        {submitted && !spot.nbBateauxAvoile &&
                                        <div className="invalid-feedback">Le nombre bateaux de pêche d'activité est requis</div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header">
                                Waterman
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label>Nom du spot</label>
                                    <input type="text" name="nom" value={waterman.nom} onChange={handleWatermanChange} className={'form-control' + (submitted && !waterman.nom ? ' is-invalid' : '')}  />
                                    {submitted && !waterman.nom &&
                                    <div className="invalid-feedback">Le nom du waterman est requis</div>
                                    }
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleFormControlSelect2">Example multiple select</label>
                                    <select multiple onChange={handleMultipleSelect} className="form-control" id="exampleFormControlSelect2">
                                        <option value={"cr_solaire"}>Crème solaire</option>
                                        <option value={"parfum"}>Parfum / Déodorant</option>
                                        <option value={"cr_hydratante"}>Crème hydratante</option>
                                        <option value={"maquillage"}>Maquillage</option>
                                        <option value={"essence"}>Essence</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary">
                                Valider
                            </button>
                            <Link to="/" className="btn btn-link">Annuler</Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export { SurfersForm };