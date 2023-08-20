import React, {useState} from 'react';
import './App.css';
import {getRandom} from "./shared/utils/random";
import {roue} from "./shared/roue";
import {CouleurEnum} from "./shared/enum/couleur.enum";
import {config} from "./config";

function App() {

    const [mise, setMise] = useState(0);
    const [compte, setCompte] = useState(20);
    const [resultat, setResultat] = useState(roue[0]);
    // const [misePair, setMisePair] = useState(0);
    // const [miseImpair, setMiseImpair] = useState(0);
    const [miseRouge, setMiseRouge] = useState(0);
    const [miseNoir, setMiseNoir] = useState(0);
    const [coup, setCoup] = useState(0);

    const miser = (valeur: number) => {
        if ((valeur + mise) > compte) {
            // todo rien pour le moment
        } else {
            setMise(mise + valeur)
        }
    }

    const cleaner = () => {
        setMise(0)
    };

    const miserSur = (setter: any, current: number) => {
        setter(current + mise);
        setCompte(compte - mise);
        setMise(0);
    };

    const miserSurNoir = () => {
        if (miseRouge === 0) {
            miserSur(setMiseNoir, miseNoir);
        }
    };

    const miserSurRouge = () => {
        if (miseNoir === 0) {
            miserSur(setMiseRouge, miseRouge);
        }
    };

    const tourner_roue = () => {
        const index = getRandom(37)
        const nouvelleValeur = roue[index];
        if (nouvelleValeur.couleur === CouleurEnum.Rouge && miseRouge > 0) {
            // on gagne * 2
            setCompte(compte + miseRouge * 2);
        } else if (nouvelleValeur.couleur === CouleurEnum.Noir && miseNoir > 0) {
            // on gagne * 2
            setCompte(compte + miseNoir * 2);
        }
        setMiseRouge(0);
        setMiseNoir(0);
        setResultat(nouvelleValeur);
        setCoup(coup + 1);
    };

    return (
        <div>
            <span>xxx {config.titre}</span>

            <div className={"hud"}>
                <div className={"resultat"}>
                    <span>Resultat</span>
                    <span>Couleur : {resultat.couleur}</span>
                    <span>Valeur : {resultat.valeur}</span>
                    <button onClick={() => tourner_roue()}>Tourner la roue</button>
                </div>

                <div className={"infos-personnelles"}>
                    <span>argent actuel : {compte} €</span>
                    <span>nombre de coup joué : {coup} coups</span>
                </div>
            </div>

            <div>
                <div className={"mise"}>
                    <button onClick={() => miser(1)}>miser1</button>
                    <button onClick={() => miser(2)}>miser2</button>
                    <button onClick={() => miser(5)}>miser5</button>
                    <button onClick={() => miser(10)}>miser10</button>
                    <span className={"mise-valeur"}>{mise}</span>
                    <button onClick={() => cleaner()}>clean</button>
                </div>
                <div>
                    <button onClick={() => miserSurRouge()}>Rouge ({miseRouge})</button>
                    <button onClick={() => miserSurNoir()}>Noir ({miseNoir})</button>
                </div>
            </div>
        </div>
    );
}

export default App;
