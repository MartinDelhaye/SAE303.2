// ------------------ Options & Données ------------------

// ------------------ Variables Globales ------------------
let graph1;
let fond, grille, iconGP, courbeChargingPoints, courbeELVP, iconVEL, titre;
let legendeChargingPoints, legendeElVP, annee, nbr, zero;

let elementsVpEl, elementsGP;
let modeGraph = "noActive"; 
let modeActiveElemnts = ""; 

let buttonGraph;

let graph2;

// ------------------ Fonction ------------------
function ChargementCalquesGraph1(loadedFragment) {
    // Ajout de l'image à la surface
    graph1.append(loadedFragment);

    // Récupération des calques
    fond = graph1.select("#Fond");
    grille = graph1.select("#Grille");
    titre = graph1.select("#Titre");
    annee = graph1.select("#Annee");
    nbr = graph1.select("#Nbr");
    zero = graph1.select("#_x30_");

    iconGP = graph1.select("#Icon_GP");
    courbeChargingPoints = graph1.select("#Courbe_Charging_Points");
    legendeChargingPoints = graph1.select("#Légende_Charging_Points");

    iconVEL = graph1.select("#Icon_VEL");
    courbeELVP = graph1.select("#Courbe_EL-VP");
    legendeElVP = graph1.select("#Legende_El-VP");

    // Ajout des classes 
    iconGP.addClass("GP");
    courbeChargingPoints.addClass("GP");
    legendeChargingPoints.addClass("GP");

    iconVEL.addClass("VpEl");
    courbeELVP.addClass("VpEl");
    legendeElVP.addClass("VpEl");

    // Gestion des événements de survol
    elementsVpEl = graph1.selectAll(".VpEl");
    elementsGP = graph1.selectAll(".GP");

    // ------Animation de survol et au click-----
    modeActive();
}

// ------------------ Fonction Callback ------------------
// Fonction générique pour mettre ou retirer l'effet de survol
function mettreOuRetirerEnAvant(action, classe) {
    let elements = classe === "VpEl" ? elementsGP : elementsVpEl;
    let opacity = action === "Mettre" ? 0.5 : 1;    // Nom de la variable = Nom de l'attribut à modifier
    elements.forEach(focus => {
        focus.animate({ opacity }, 300);            // Permet de seulement marquer "opacity"
    });
}
// Fonction pour changer le mode d'affichage au click
function setClickMode(mode, action) {
    mettreOuRetirerEnAvant(action, modeActiveElemnts);
    modeGraph = mode;
    modeActive();
}

function buttonGraphClick() {
    modeActiveElemnts = this.getAttribute("data-modeActiveElemnts");
    switch (modeGraph) {
        case "active":
            setClickMode("noActive", "Retirer");
            break;
        case "noActive":
            setClickMode("active", "Mettre");
            break;
    }
}

// Fonction pour changer le mode d'affichage
function modeActive() {
    switch (modeGraph) {
        case "active":
            console.log("active");
            // Désactive le survol
            elementsVpEl.forEach(focus => {
                focus.unhover(); // Désactive le survol
                focus.unclick(); // Désactive les événements au clic précédent
                if (modeActiveElemnts === "VpEl") {
                    focus.click(() => {
                        setClickMode("noActive", "Retirer");
                    });
                }
            });
            elementsGP.forEach(focus => {
                focus.unhover(); 
                focus.unclick(); 
                if (modeActiveElemnts === "GP")focus.click(() => {
                    setClickMode("noActive", "Retirer");
                });
            });

            // Buttons en dehors du graph
            buttonGraph.forEach(focus => {
                focus.removeEventListener("click", buttonGraphClick);
                focus.addEventListener("click", buttonGraphClick);
            });
            break;

        case "noActive":
            console.log("noActive");
            // Rétablit les événements de survol
            elementsVpEl.forEach(focus => {
                focus.hover(
                    () => mettreOuRetirerEnAvant("Mettre", "VpEl"),
                    () => mettreOuRetirerEnAvant("Retirer", "VpEl")
                );
                focus.unclick(); 
                focus.click(() => {
                    modeActiveElemnts = "VpEl"; // Met à jour modeActiveElemnts
                    setClickMode("active", "Mettre");
                });
            });
            elementsGP.forEach(focus => {
                focus.hover(
                    () => mettreOuRetirerEnAvant("Mettre", "GP"),
                    () => mettreOuRetirerEnAvant("Retirer", "GP")
                );
                focus.unclick();
                focus.click(() => {
                    modeActiveElemnts = "GP"; // Met à jour modeActiveElemnts
                    setClickMode("active", "Mettre");
                });
            });


            buttonGraph.forEach(focus => {
                focus.removeEventListener("click", buttonGraphClick);
                focus.addEventListener("click", buttonGraphClick);
            });
            break;

        default:    
            console.log("default");
            break;
    }
}

function ChargementCalquesGraph2(loadedFragment) {
    // Ajout de l'image à la surface
    graph2.append(loadedFragment);
}

// ------------------ Fonction Initiation ------------------
function setupListeners_MD() {
    // Récupération buttons pour le graph
    buttonGraph = document.querySelectorAll(".buttonGraph");
    // Chargement de l'image
    graph1 = Snap("#graph1");
    Snap.load("Images/Graph-1.svg", ChargementCalquesGraph1);
    graph2 = Snap("#graph2");
    Snap.load("Images/Graph-2.svg", ChargementCalquesGraph2);

}

// ------------------ Chargement de la page ------------------
window.addEventListener("load", setupListeners_MD);
