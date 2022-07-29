// Changer l'url du localhost en variable -> appel à l'API
let url = "http://localhost:3000/api/products"; // Créer une variable url qui va récupérer l'url de l'API

fetch(url, { method: "GET" }) // Créer une requête fetch qui va récupérer les données de l'API 
  // Conversion de la réponse en JSON (JavaScript Object Nomination):
  .then((response) => response.json())

  // Récupération de la réponse pour traitement:
  .then((data) => {
    // Affichage du contenu des données en console:
    console.log(data);

    data.forEach((canape) => { // Pour chaque canapé, créer une fonction qui va ajouter le canapé au panier (cart) (canape = canapé)
      //Insérer l'image et les caractéristiques du canapé dans le tableau ["array" en anglais] des caractéristiques;

      // Ponctionner dans le DOM via document.getElementById ou document.querySelector:
      let articlesSection = document.getElementById("items"); // Récupérer le container des articles

      // Création d'éléments enfants:

      let childElement = document.createElement("a"); // Création d'un élément enfant "a" (lien)  pour le canapé sélectionné
      console.log(childElement);
      // Assigner l'url du canapé à l'élément enfant (childElement)  de l'élément parent (articlesSection)
      childElement.href = `./product.html?id=${canape._id}`; 
      console.log(childElement.href);
      // element.innerHTML : récupère ou définit la syntaxe HTML décrivant les descendants de l'élément.
      childElement.innerHTML = `<article><img src=${canape.imageUrl} alt=${canape.altTxt}> <!----- image du canapé ---->
        
                    <h3 class="productName">${canape.name}</h3> <!-- Récupérer le nom du canapé -->
        
                    <p class="productDescription">${canape.description}</p> <!-- Récupérer la description du canapé -->
        
                    </article>`;  // Récupérer l'image du canapé

      articlesSection.appendChild(childElement);  // Ajouter l'élément enfant dans la section articles du DOM (section des articles)
    });
    // addProducts(data)
  });

//  function addProducts(data) { // Créer la fonction addProducts qui ajoute les produits au panier (cart)
//    console.log(data);

//    const imageUrl = data[0].imageUrl;  // Récupérer l'image du canapé dans l'array data

//    console.log("url de l'image", imageUrl); // Afficher l'url de l'image dans la console 
//  };
// URLSearchParams : classe qui permet de créer un objet qui va récupérer les paramètres de la requête
// DOM: Document Object Model (API)  qui permet de manipuler le DOM (HTML) de la page
// API : Application Programming Interface (API) qui permet de manipuler les données de l'application (ex: récupérer des données)
//localStorage: permet de stocker des données dans le navigateur
// * Commentaire très important!*
// Code du statut du protocole HTPP:
// Codes commençant par 1(100): indique une réponse provisoire.
// Code commençant par 2(200): indique que la requête a été reçue, comprise et acceptée.
// Code commençant par 3(300): indique qu'une action supplémentaire doit être entreprise
// par l'agent d'utilisateur, afin de satisfaire la demande.
// Code commençant par 4(400 - dont le célèbre 404): indique que le navigateur semble s'être trompé.
// 404: Le serveur n'a rien trouvé correspondant à l'url demandée.
// Rien ne précise si c'est temporaire, mais si c'est définitif, l'erreur 410 est préférable.
// Code commençant par 5(500): inque que le serveur web n'a pas réussi à traiter une requête
// pourtant valide.
