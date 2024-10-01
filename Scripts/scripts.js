// ------------------ Variables Globales ------------------
// --------- Variables Snap.JS ---------
let graph1;

let courbeActiveGP, courbeNoActiveGP, courbeActiveVpEl, courbeNoActiveVpEl;
let grilleYactiveGP, grilleYnoActiveactiveVpEl, grilleXactiveVpEl, grilleXnoActiveactiveGP;
let y_noActiveactiveVpEl, y_activeGP;
let x_noActiveactiveGP, x_activeVpEl;
let iconGP, iconVpEl;
let legendeGP, legendeVpEl;
let titre;

// Variables associées à chaque mode
let elementsNoActive = [];
let elementsActiveVpEl = [];
let elementsActiveGP = [];

// Variables pour les éléments sur lesquels on met des intéractions
let elementsInteractionVpEl = [];
let elementsInteractionGP = [];

// Touts les textes 
let elementsTexte = [];

let modeGraph = "noActive";
let modeActiveElements = "";

let buttonGraph;
let buttonText;
// --------- Variables GSAP ---------

let textFalling;

// ------------------ Fonction pour Snap.JS ------------------
function ChargementCalquesGraph(loadedFragment) {
    // Ajout de l'image à la surface
    graph1.append(loadedFragment);

    // Récupération des calques SVG sur lesquels on va travailler
    titre = graph1.select("#Titre");

    iconGP = graph1.select("#IconGP");
    iconVpEl = graph1.select("#IconVpEl");
    legendeGP = graph1.select("#LegendeGP");
    legendeVpEl = graph1.select("#LegendeVpEl");

    grilleYactiveGP = graph1.select("#grilleYactiveGP");
    grilleYnoActiveactiveVpEl = graph1.select("#grilleYnoActiveactiveVpEl");
    grilleXactiveVpEl = graph1.select("#GrilleXactiveVpEl");
    grilleXnoActiveactiveGP = graph1.select("#GrilleXnoActiveactiveGP");

    courbeActiveGP = graph1.select("#CourbeactiveGP");
    courbeNoActiveGP = graph1.select("#CourbenoActiveGP");
    courbeActiveVpEl = graph1.select("#CourbeactiveVpEl");
    courbeNoActiveVpEl = graph1.select("#CourbenoActiveVpEl");

    y_noActiveactiveVpEl = graph1.select("#YnoActiveactiveVpEl");
    y_activeGP = graph1.select("#YactiveGP");
    x_noActiveactiveGP = graph1.select("#XnoActiveactiveGP");
    x_activeVpEl = graph1.select("#XactiveVpEl");

    elementsNoActive = [
        iconVpEl,
        iconGP,
        legendeVpEl,
        legendeGP,
        courbeNoActiveVpEl,
        courbeNoActiveGP,
        grilleYnoActiveactiveVpEl,
        grilleXnoActiveactiveGP,
        y_noActiveactiveVpEl,
        x_noActiveactiveGP
    ];

    elementsActiveVpEl = [
        iconVpEl,
        legendeVpEl,
        courbeActiveVpEl,

        grilleXactiveVpEl,
        y_noActiveactiveVpEl,
        x_activeVpEl,

        grilleYnoActiveactiveVpEl
    ];

    elementsActiveGP = [
        iconGP,
        legendeGP,
        courbeActiveGP,
        y_activeGP,
        x_noActiveactiveGP,
        grilleXnoActiveactiveGP,
        grilleYactiveGP
    ];

    elementsInteractionVpEl = [
        iconVpEl,
        legendeVpEl,
        courbeNoActiveVpEl,
        courbeActiveVpEl
    ]
    elementsInteractionGP = [
        iconGP,
        legendeGP,
        courbeNoActiveGP,
        courbeActiveGP
    ]

    elementsTexte = [
        titre,
        y_noActiveactiveVpEl,
        y_activeGP,
        x_noActiveactiveGP,
        x_activeVpEl,
        legendeVpEl,
        legendeGP
    ]




    // Initialisation de la visibilité des éléments
    modeActive();

    titre.hover(
        function () {
            // Sur hover, appliquer une décoration
            titre.attr({
                style: "text-decoration: underline;"
            });

        },
        function () {
            // Quand on quitte le hover, retirer la décoration
            titre.attr({
                "text-decoration": "none"
            });
        }
    );

    // Appel de la function pour ajouter la barre de navigation pour être sur que l'image SVG est chargé
    barreNav();


}
// Fonction générique pour mettre ou retirer l'effet de survol
function mettreOuRetirerEnAvant(action, classe) {
    let elements = classe === "VpEl" ? elementsInteractionGP : elementsInteractionVpEl;
    let opacity = action === "Mettre" ? 0.5 : 1;
    elements.forEach(element => {
        if (element.attr("opacity") != 0) element.animate({ opacity }, 100);
    });
}
// Fonction pour changer le focus des éléments (cacher/montrer)
function mettreOuRetirerEnFocus(action, classe) {
    let cacherElement, focusElement;

    if (classe === "VpEl") {
        cacherElement = elementsActiveGP;
        focusElement = elementsActiveVpEl;
    } else {
        cacherElement = elementsActiveVpEl;
        focusElement = elementsActiveGP;
    }

    let display = action === "Mettre" ? 'none' : 'flex';

    cacherElement.forEach(element => {
        element.attr({ display });
    });
}
// Function pour afficher ou cacher les boutons 
function afficherButtonsGraph(when) {
    buttonGraph.forEach(focus => {
        if (focus.dataset.modegraph == when) {
            focus.style.display = "block";
        } else {
            focus.style.display = "none";
        }
    });
}
// Fonction pour géré l'action sur les click des buttonGraph
function actionButtonsGraph() {
    console.log(this.dataset.modegraph);
    console.log(this.dataset.modeactiveelemnts);
    modeGraph = this.dataset.modegraph;
    if (this.dataset.modeactiveelemnts) modeActiveElements = this.dataset.modeactiveelemnts;
    modeActive();
}
function afficherButtonsText(when) {
    buttonText.forEach(focus => {
        if (focus.dataset.weight !== when) {
            focus.style.display = "block";
        } else {
            focus.style.display = "none";
        }
    });
}
// Fonction pour géré l'action sur les click des buttonText
function actionButtonsText() {
    afficherButtonsText(this.dataset.weight);
    elementsTexte.forEach(focus => {
        focus.attr({ "font-weight": this.dataset.weight });  // Ajoute le style gras

    });
}
// Fonction pour changer le mode d'affichage
function modeActive() {
    switch (modeGraph) {
        case "active":
            afficherButtonsGraph("noActive");
            elementsInteractionVpEl.forEach(focus => {
                focus.unhover();
                focus.unclick();
            });
            elementsInteractionGP.forEach(focus => {
                focus.unhover();
                focus.unclick();
            });
            switch (modeActiveElements) {
                case "VpEl":
                    elementsNoActive.forEach(element => element.attr({ opacity: 0 }));
                    elementsActiveVpEl.forEach(element => element.attr({ opacity: 1 }));
                    iconVpEl


                    // Transformation de l'icone VpEl
                    iconVpEl.animate({ transform: 'translate(350, -30) rotate(8))' }, 0);


                    break;
                case "GP":
                    elementsNoActive.forEach(element => element.attr({ opacity: 0 }));
                    elementsActiveGP.forEach(element => element.attr({ opacity: 1 }));

                    // Transformation de l'icone GP
                    iconGP.animate({ transform: 'translate(-68, 2) rotate(-20))' }, 0);
                    break;
                default:
                    console.log("mode non reconnu de modeActiveElements");
                    break;
            }
            break;
        case "noActive":
            elementsActiveVpEl.forEach(element => element.attr({ opacity: 0 }));
            elementsActiveGP.forEach(element => element.attr({ opacity: 0 }));
            elementsNoActive.forEach(element => element.attr({ opacity: 1 }));

            // Annule les transformation potentielles des icônes
            iconVpEl.animate({ transform: 'translate(0, 0) rotate(0))' }, 0);
            iconGP.animate({ transform: 'translate(0, 0) rotate(0))' }, 0);

            afficherButtonsGraph("active");
            elementsInteractionVpEl.forEach(focus => {
                focus.hover(
                    () => mettreOuRetirerEnAvant("Mettre", "VpEl"),
                    () => mettreOuRetirerEnAvant("Retirer", "VpEl")
                );
                focus.click(() => {
                    modeActiveElements = "VpEl"; // Met à jour modeActiveElements
                    modeGraph = "active";
                    modeActive();
                });
            });
            elementsInteractionGP.forEach(focus => {
                focus.hover(
                    () => mettreOuRetirerEnAvant("Mettre", "GP"),
                    () => mettreOuRetirerEnAvant("Retirer", "GP")
                );
                focus.click(() => {
                    modeActiveElements = "GP"; // Met à jour modeActiveElements
                    modeGraph = "active";
                    modeActive();
                });
            });
            break;
        default:
            console.log("mode non reconnu");
            break;
    }
}

// ------------------ Fonction pour GSAP ------------------
function barreNav() {
    // --------- Barre de Navigations ---------  
    let navBarSvg = Snap("#navBarSvg");

    // Création de la barre verticale 
    let navBar = navBarSvg.line(50, 150, 50, window.innerHeight - 120).attr({
        stroke: "#000",
        strokeWidth: 5
    });

    // Création d'un point qui représentera la position de navigation
    let navPoint = navBarSvg.circle(50, 150, 5).attr({
        fill: "#052962"
    });

    // Liste des ancres où on réalisé des animation sur le point
    let ancresAgrandissement = [["#graph1", "top 50%", "60% 25%"], ["#graph2", "top 50%", "10% 0%"], ["#titreArticle", "top 50%", "top 0%"]];

    // Associer ScrollTrigger à GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Créer l'animation du point en fonction du scroll
    gsap.to(navPoint.node, {
        cy: window.innerHeight - 120, // Position finale du point
        ease: "none", // Animation linéaire
        scrollTrigger: {
            trigger: document.body, // Basé sur le document entier
            start: "top top",
            end: "bottom bottom",
            scrub: true, // Lier l'animation au scroll
            markers: false,
        }
    });

    ancresAgrandissement.forEach(trigger => {
        // Animation pour changer la couleur et le style du point lorsque l'ancre est atteinte
        gsap.to(navPoint.node, {
            fill: "white",
            stroke: "#052962",
            strokeWidth: 1, // Largeur de la bordure
            r: 10, // Rayon du cercle
            yoyo: true, // Retourner à l'état d'origine
            repeat: 1, // Ne répéter qu'une fois
            scrollTrigger: {
                trigger: trigger[0],
                start: trigger[1],
                end: trigger[2],
                scrub: true,
                markers: false,
            }
        });
    });

}

// Fonction d'animation pour faire tomber chaque lettre du titre
function appearText(selector, dureeAnimation) {
    let textFalling = document.querySelectorAll(selector);

    // Parcourir chaque élément pour y appliquer l'animation
    textFalling.forEach((focus) => {
        // Scinder le texte de chaque élément en lettres individuelles
        focus.innerHTML = focus.textContent
            .split("")
            .map((letter) => `<span class="letter">${letter}</span>`)
            .join("");

        // Sélectionner les lettres pour cet élément spécifique
        let letters = focus.querySelectorAll(".letter");

        // Configuration initiale : position et opacité de chaque lettre
        gsap.set(letters, {
            y: -100, // Position de départ en dehors de l'écran
            opacity: 0, // Invisibilité au départ
        });

        // Animation de chute pour chaque lettre
        gsap.to(letters, {
            y: 0, // Retour à la position d'origine
            opacity: 1, // Rendre visible
            duration: dureeAnimation, // Vitesse de chaque lettre (définie par le paramètre)
            ease: "bounce.out", // Effet de rebond
            stagger: dureeAnimation * 0.1,
        });
    });
}

// ------------------ Fonction Initiation ------------------
function setupListeners_MD() {
    // --------- Pour Snap.JS ---------
    // Récupération des boutons pour le graph
    buttonGraph = document.querySelectorAll(".buttonGraph");
    buttonText = document.querySelectorAll(".buttonText");
    // Chargement de l'image SVG
    graph1 = Snap("#graph1");
    Snap.load("Images/Graph.svg", ChargementCalquesGraph);

    // Abonnement aux clics sur les boutons
    buttonGraph.forEach(focus => {
        focus.addEventListener("click", actionButtonsGraph);
    });

    buttonText.forEach(focus => {
        focus.addEventListener("click", actionButtonsText);
    });

    afficherButtonsText("normal")

    // --------- Pour GSAP ---------

    gsap.from("body", {
        duration: 1,
        opacity: 0
    });
    gsap.to("button", {
        duration: 0.5,
        scale: 1.1,
        repeat: -1,
        yoyo: true
    });

    appearText("#titreArticle", 0.8);
    appearText(".Titre", 1);
}

// ------------------ Chargement de la page ------------------
window.addEventListener("load", setupListeners_MD);
