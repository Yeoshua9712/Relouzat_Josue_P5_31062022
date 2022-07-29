// Appel à l'API
let url = "http://localhost:3000/api/products";
// Rajouter l'id du produit que l'on veut récupérer
// Retrouver l'id en employant la méthode document.location.search:
let params = new URLSearchParams(document.location.search);

let id = params.get("id");
//console.log(id);
const queryString = document.location.search;

//
const urlParams = new URLSearchParams(queryString);

 //if (id != null) {
     // "let" permet de réassigner cette variable, contrairement à "const", qui, reste immuable, non modifiable.
     //let itemPrice = 0;
     //let imgUrl, altText, articleName;
 // };

// Création de la variable canapId
let canapId = urlParams.get("id");

console.log(canapId);


// fetch(`http://localhost:3000/api/products/${id}`)
   
//     // Conversion de la réponse en JSON
//     .then(response => response.json()
//     .then((data) => {
//         console.log(data);
//     }));
    // .then (response =>{
    // Cette partie a été mise en commentaire en vue d'éviter une redite fetch.    
    // Mémo: res est le diminutif de response. 

url = url + "/" + id;


// Faire apparaître l'image

fetch(url, {method:"GET"})

// Récupération de l'objet
.then(res => res.json())

// handleData est bien inclu dans le fetch:
.then ((res) => handleData(res))


function handleData(canapOne){
    //handleData: manipulation des données
    // mettre un console.log(canapOne) pour voir l'affichage des informations de l'élément:
    console.log({canapOne})

    //const altTxt = canapOne.altTxt;
    //const colors = canapOne.colors;
    //const description = canapOne.description;
    //const imageUrl = canapOne.imageUrl;
    //const name = canapOne.name;
    //const price = canapOne.price;
    //const _id = canapOne._id;

    // Oubien écrir plus simplement le code pour récupérer tous les objets( rappel: objet = {}):
    const {altTxt, colors, description, imageUrl, name, price} = canapOne;
    // Le prix sera récupéré depuis l'API
    itemPrice = price;
    // ainsi que l'image;
    imgUrl = imageUrl;
    // Ainsi que le altTxt;
    altText = altTxt;
    // Et ainsi que le nom.
    articleName = name;

    // Faire apparaître l'image
    imgAppear (imageUrl, altTxt);

    // Emettre le titre du canapé (nom du canapé)
    canapTitle (name);

    // Emmettre le prix du canapé
    canapPrice (price);

    // Emmettre la description du canapé
    canapDescription (description);

    // Emmettre le choix des couleur du canapé
    canapColors (colors);
};



// Je crée une fonction imgAppear pour que l'image puisse apparaître
function imgAppear(imageUrl, altTxt){

    const image = document.createElement('img');

    image.src = imageUrl;

    image.alt = altTxt;

    // Emploi du document.querySelector pour mieux cibler l'élément du DOM (ici l'image ".item__img")
    const parent = document.querySelector(".item__img");

    if (parent != null) parent.appendChild(image);
    // != : fonctionne aussi si le parent est indefined
    // .appendChild: permet d'inserer des éléments de l'API dans le HTML
};

// Apparition du titre (name / nom du canapé en h1)
function canapTitle (name) {
    //document.getElementById procède comme document.querySelector, mais se concentre sur l'id("")
    const h1 = document.getElementById ("title");

    // Si h1 est différent de null, alors h1.innerHTML = name : le titre en h1 apparaît
    // null signifie "rien" généralement
    if (h1 != null) h1.innerHTML = name;

    console.log(name);
};

// Apparition du prix du canapé
function canapPrice (price) {

    const span = document.getElementById ("price");

    // Si span est différent de null, alors span.innerHTML = price : le prix apparaît
    if (span != null) span.innerHTML = price;

    console.log(price);
};

// Apparition de la description du canapé, avec pour paramètre (description)
function canapDescription (description) {

    const p = document.getElementById ("description");

    // Si p est différent de null, alors p.innerHTML = description : la description apparaît
    if (p != null) p.innerHTML = description;

    console.log(description);
};

// Apparition du choix decouleurs du canapé
function canapColors (colors) {

    const select = document.getElementById ("colors");

    // Ici c'est un peu différent car il y a la balise <option> à prendre en compte:
    if (select != null) {

        colors.forEach ((color) => {

            console.log(color);

            // Créer une constante "option" pour chaque couleur:
            const option = document.createElement ("option");

            // Pour la valeur:
            option.value = color;

            // Pour le textContent:
            option.textContent = color;

            // Et pour l'élément enfant de select avec .appendChild:
            select.appendChild (option);
            console.log (option)
        });

    };

};

// Traitement du bouton "Ajouter au panier" ("addToCart"):
const button = document.getElementById("addToCart");

if (button != null) {
    // (e) pour event. addEventListener de EventTarget attache une fonction à appeler chaque fois
    // que l'évènement est envoyé à la cible. Les cibles courantes sont un Element, le Document lui-même
    // et une Window, mais on peut aussi cibler n'importe quel objet qui prend en charge les évènements 
    // (comme XMLHttpRequest par exemple). addEventListener() agit en ajoutant une fonction ou un objet
    // qui adapte EvenListener à la liste des gestionnaires d'évènement pour le type d'évènement
    // spécifié sur la cible (EventTarget), à partir de laquelle il est appliqué.
    // Le target sera le "button" ici: 
    button.addEventListener ("click",(e) => {
    //Vérifier que le click fonctionne via un console.log:
    console.log("click!");
    console.log(e);// (e) pour (event)
    //e.preventDefault();
    
    // récupérer le panier dans le localStorage:
    let cart = JSON.parse (localStorage.getItem("cart"));
    // Récupérer  le nom du canapé:
    const title = document.getElementById ("title").textContent;    
    // Récupérer la couleur choisie:    
    const color = document.getElementById ("colors").value;
    // Récupérer la quantité choisie:
    const quantity = document.getElementById ("quantity").value;
    // Réup
    //Créer un message d'alerte au cas où aucune sélection n'est réalisée, même si la valeur est de 0
    // Pour cela créer une condition avec if: 
    if (color == null || color === "" || quantity == null || quantity == 0) {
        
        alert("Veuillez choisir une couleur et au moins une quantité s'il vous plaît, merci!");
       
        // Emploi de return pour arrêter cette partie de la fonction si on se retrouve dans cette condition:
        return;
    };
    // const key =`${id}-${color}`
    // Créer une constante (const) immuable nommée "data" pour inclure les données complètes du canapé:
    const data = {
        id: id,
        name: articleName,
        color: color,
        quantity: Number(quantity), // --> Mettre le type de variable "quantity" en nombre et non en string.
        //price: itemPrice,
        imageUrl: imgUrl,
        altTxt: altText
        
    };
    
    // Créer une condition dans laquelle si le panier (cart) est vide (null)...
    if (localStorage.getItem("cart") === null) {
        let cart = []; // Mettre en place un tableau "cart" (panier) vide
        cart.push(data); // Dans lequel on ajoute les données du canapé au panier "cart"
        localStorage.setItem ("cart", JSON.stringify (cart)); // Enregistrer le panier dans le localStorage, avec localStorage.setItem.
        console.log("1");  
        
    }
    
    else {
        for (let i in cart) {
            if (cart[i].name === title && cart[i].color === color) 
            // si la couleur et le nom du canapé  sont semblables / identiques,
            cart[i].quantity += Number(quantity); // Ajouter la quantité sélectionnée au panier.
            flagId = true; // la variable flagId prend la valeur boolean "true" (vraie)
            if (!flagId) {
                let flagId = false; // Créer une variable flagId afin de vérifier si l'id est déjà présent dans le panier 
                // Si flagId est false (faux), alors:
                cart.push(data); // On ajoute le canapé au panier
                flagId = false; // La valeur flagId prend la valeur false
    
            };
            break; // Sortie de boucle.

        };


    };
        // Utilisation du localStorage pour garder les données (const data) injectées en mémoire.
        // Le localStorage stocke toujours en string (chaîne de caractères). Il faut donc employer JSON.stringify ici.
        // Enregistrer le panier dans le localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        // Créer un lien qui envoie vers "Mon Panier" (page cart.html):
        window.location.href = "cart.html";
 
    });

};