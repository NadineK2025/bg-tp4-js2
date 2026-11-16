"use strict"; // Mode strict : signale les variables non déclarées (slide 51)

// Compteur de lignes insérées, initialisé à 0 (slides 37 et 51 : let pour une variable)
let lignes = 0;

// Total des points du tableau, initialisé à 0 (slides 37 et 51)
let total_points = 0;

// Tableau d'objets "persons" : chaque objet a nom, prenom, points (slides 39-40)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de init() : les déclarations de fonctions sont "hoistées" (slide 46),
// donc on peut l'appeler avant sa définition. persons et lignes sont déjà déclarés.
init();

function init() {
    // Boucle for...of pour parcourir les objets du tableau persons (slide 44)
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

// Fonction qui insère UNE ligne dans l'élément table (fonctions : slides 45-46)
function doInsertRowTable(num, nom, prenom, points) {

    // Récupérer l'élément tableau par son identifiant (slides 61-63)
    const table = document.getElementById("table_persons");

    // Créer un élément tr (ligne de tableau) (slides 85-99 : opérations sur le DOM)
    const row = document.createElement("tr");

    // Affecter la valeur "row" à l'attribut "class" avec setAttribute (slides 106-107)
    row.setAttribute("class", "row");

    // Créer 5 éléments td (colonnes)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu de chaque colonne avec innerText (slides 86 et 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // La dernière colonne contient un input de type checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");   // setAttribute (slides 106-107)
    col5.append(checkbox);                       // append() (slides 97-99)

    // Affectation des classes CSS de chaque colonne (slides 106-107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Rajouter les colonnes à la ligne avec append() (slides 97-99)
    row.append(col1, col2, col3, col4, col5);

    // Rajouter la ligne au tableau
    table.append(row);
}

// doInsert : met à jour les compteurs, insère la ligne et met à jour le résumé (slides 45-46)
function doInsert(nom, prenom, points) {
    // Ajouter les points au total (opérateur combiné += : slide 41)
    total_points += points;
    // Incrémenter lignes, puis l'affecter à num
    lignes++;
    const num = lignes;
    doInsertRowTable(num, nom, prenom, points);
    // Mettre à jour l'espace résumé
    update_summary();
}

// Affiche le contenu du tableau persons dans la console (slides 33 et 38)
function consoleTableau() {
    console.log(persons);
}

// Met à jour l'espace "résumé" (slides 61-63 : getElementById, slide 91 : innerText)
function update_summary() {
    // Récupérer l'élément id = p1
    const element_lignes = document.getElementById("p1");
    // Récupérer l'élément id = p3
    const element_points = document.getElementById("p3");
    // Modifier le contenu avec innerText
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

// Appelée au clic sur le bouton "Ajouter" (événement onclick : slides 20-21 et 52-54)
function doNewData() {
    // Récupérer les 3 champs de saisie par leur id (slides 61-63)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Lire leur attribut value (slides 86-88)
    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    // parseInt convertit le texte en entier ; renvoie NaN si le champ est vide
    const points = parseInt(elt_points.value);

    // Saisie contrôlée : condition if...else (slide 42) avec opérateur logique || (slide 41)
    if (nom.trim() === "" || prenom.trim() === "" || Number.isNaN(points)) {
        // alert : méthode de l'objet window (BOM, slide 116)
        alert("Formulaire incomplet !");
    } else {
        // Insérer dans le tableau HTML
        doInsert(nom, prenom, points);
        // Insérer aussi dans le tableau d'objets persons
        persons.push({ nom: nom, prenom: prenom, points: points });
        // Vider les champs pour une autre saisie
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

// Supprime les lignes cochées (bouton "Supprimer")
function deleteRow() {

    // Étape 1 : tableau vide ? (if : slide 42)
    if (lignes === 0) {
        alert("Le tableau est vide !");   // alert : BOM (slide 116)
        return;
    }

    // Étape 2 : récupérer le tableau et les checkbox cochées
    // querySelector / querySelectorAll avec un sélecteur CSS (slides 76-77)
    const table = document.querySelector("#table_persons");
    const checked = table.querySelectorAll(".col_chkbox input:checked");

    // Étape 3 : aucune checkbox cochée ?
    if (checked.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Étape 4 : confirmation (méthode de window : slide 116)
    if (!confirm("Supprimer " + checked.length + " ligne(s) ?")) {
        return;   // "Annuler"
    }

    // Étape 5 : récupérer toutes les lignes de données (class "row") (slides 76-77)
    const rows = table.querySelectorAll("tr.row");

    // Étape 6 : parcourir les lignes (boucle for : slide 44).
    // On part de la FIN pour que splice() sur persons garde les bons indices.
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const chk = row.querySelector(".col_chkbox input");
        if (chk.checked) {
            // Points = 4e cellule (index 3) (slide 86 : propriétés d'un élément)
            const points = parseInt(row.cells[3].innerText);
            total_points -= points;   // soustraire du total
            lignes--;                 // décrémenter le compteur
            row.remove();             // supprimer la ligne du DOM (slides 97-99)
            persons.splice(i, 1);     // supprimer la même entrée dans persons
        }
    }

    // Renuméroter les lignes restantes pour garder la colonne N° cohérente
    // forEach : slide 44 ; fonction fléchée : slide 46
    table.querySelectorAll("tr.row").forEach((row, index) => {
        row.cells[0].innerText = index + 1;
    });

    // Étape 7 : message de succès + mise à jour du résumé
    alert(checked.length + " ligne(s) supprimée(s) !");
    update_summary();
}

/* ================= 3 FONCTIONNALITÉS SUPPLÉMENTAIRES ================= */

// Bonus 1 : "Tout sélectionner" (checkbox dans l'en-tête).
// addEventListener : slide 139 ; fonction fléchée : slide 46
document.getElementById("chk_all").addEventListener("change", (e) => {
    const rows = document.querySelectorAll("#table_persons tr.row");
    rows.forEach((row) => {
        // On ne coche que les lignes visibles (compatible avec le filtre)
        if (row.style.display !== "none") {
            row.querySelector(".col_chkbox input").checked = e.target.checked;
        }
    });
});

// Bonus 2 : filtrer les lignes par nom/prénom (événement "input", slide 139).
// style.display : propriété style d'un élément (slide 86)
document.getElementById("search").addEventListener("input", (e) => {
    const texte = e.target.value.toLowerCase();
    const rows = document.querySelectorAll("#table_persons tr.row");
    rows.forEach((row) => {
        const contenu = (row.cells[1].innerText + " " + row.cells[2].innerText).toLowerCase();
        row.style.display = contenu.includes(texte) ? "" : "none";
    });
});

// Bonus 3 : validation avec la touche Entrée dans les champs du formulaire
// (événement "keydown", slide 139)
document.querySelectorAll(".form_field").forEach((champ) => {
    champ.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            doNewData();
        }
    });
});
