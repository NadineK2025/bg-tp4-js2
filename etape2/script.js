"use strict"; // Mode strict : signale les variables non déclarées (slide 51)

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
