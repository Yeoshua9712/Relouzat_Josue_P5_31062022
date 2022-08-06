// Changer l'url du localhost en variable -> appel à l'API
let url = "http://localhost:3000/api/products"; // Créer une variable url qui va récupérer l'url de l'API

fetch(url, { method: "GET" }) // Créer une requête fetch qui va récupérer les données de l'API 
  // Conversion de la réponse en JSON (JavaScript Object Nomination):
  .then((response) => response.json())

  // Récupération de la réponse pour traitement:
  .then((data) => {
    // Affichage du contenu des données en console:
    console.table(data); // Affiche les données de l'API dans la console sous forme de tableau

    data.forEach((canape) => { // Pour chaque canapé [data.forEach: itération sur le tableau] (canape: variable qui va récupérer les données de l'API)
      console.log(canape); // Affiche le nom du canapé dans la console
      //Insérer l'image et les caractéristiques du canapé dans le tableau ["array" en anglais] des caractéristiques;
      canapAppear(canape); // Appel de la fonction canapAppear qui va afficher les données du canapé dans le DOM

      function canapAppear(canape) { // Créer la fonction canapAppear qui va afficher les données du canapé dans le DOM

      let articlesSection = document.getElementById("items"); // Récupérer l'élément items du DOM (HTML)
      let childElement = document.createElement("a");  // Créer un élément a (lien) qui va servir de conteneur pour les données du canapé
      childElement.href = `./product.html?id=${canape._id}`; // Créer un lien qui va rediriger vers la page product.html avec l'id du canapé
      console.log(childElement);
      articlesSection.appendChild(childElement); // Ajouter le lien dans le DOM dans la section articles

      let article = document.createElement("article"); 
      articlesSection.appendChild(article);  
      let img = document.createElement("img"); // Créer un élément img pour afficher l'image du canapé
      img.setAttribute("src", canape.imageUrl); // Assigner l'url de l'image du canapé à l'attribut src de l'élément img
      article.appendChild(img); // Insérer l'image du canapé dans le DOM
      img.setAttribute("alt", canape.altTxt) // Assigner le texte alternatif de l'image du canapé à l'attribut alt de l'élément img
      console.log(img);

      let title = document.createElement("h3"); // Créer un élément h3 pour afficher le nom du canapé
      title.classList.add("productName"); // Ajouter la classe productName à l'élément h3
      title.textContent = canape.name; // Assigner le nom du canapé à l'élément h3
      article.appendChild(title); // Insérer le nom du canapé dans le DOM
      console.log(title);

      let pDescription = document.createElement("p");
      pDescription.classList.add("productDescription"); // Ajouter la classe productDescription à l'élément p
      pDescription.textContent = canape.description; // Assigner la description du canapé à l'élément p
      article.appendChild(pDescription); // Insérer la description du canapé dans le DOM
      console.log(pDescription);
      };
    });
  });

      
      // // Ponctionner dans le DOM via document.getElementById ou document.querySelector:
      // let articlesSection = document.getElementById("items"); // Récupérer le container des articles

      // // Création d'éléments enfants:

      // let childElement = document.createElement("a"); // Création d'un élément enfant "a" (lien)  pour le canapé sélectionné
      // // console.log(childElement);
      // // Assigner l'url du canapé à l'élément enfant (childElement)  de l'élément parent (articlesSection)
      // childElement.href = `./product.html?id=${canape._id}`; 
      //  console.log(childElement.href);
      //  //element.innerHTML : récupère ou définit la syntaxe HTML décrivant les descendants de l'élément.
      //  childElement.innerHTML = `<article><img src=${canape.imageUrl} alt=${canape.altTxt}> <!----- image du canapé ---->
        
      //                <h3 class="productName">${canape.name}</h3> <!-- Récupérer le nom du canapé -->
        
      //                <p class="productDescription">${canape.description}</p> <!-- Récupérer la description du canapé -->
        
      //                </article>`;  // Récupérer l'image du canapé
      
      
      // articlesSection.appendChild(childElement);  // Ajouter l'élément enfant dans la section articles du DOM (section des articles)
    //});
    
  //});
// Petits rappels:
// URLSearchParams : classe qui permet de créer un objet qui va récupérer les paramètres de la requête
// DOM: Document Object Model (API)  qui permet de manipuler le DOM (HTML) de la page
// API : Application Programming Interface (API) qui permet de manipuler les données de l'application (ex: récupérer des données)
//localStorage: permet de stocker des données dans le navigateur
// * Commentaires très importants! * //
// Code du statut du protocole HTPP:
// Codes commençant par 1(100): indique une réponse provisoire.
// Code commençant par 2(200): indique que la requête a été reçue, comprise et acceptée.
// Code commençant par 3(300): indique qu'une action supplémentaire doit être entreprise
// par l'agent d'utilisateur, afin de satisfaire la demande.
// Code commençant par 4(400 - dont le célèbre 404): indique que le navigateur semble s'être trompé.
// 404: Le serveur n'a rien trouvé correspondant à l'url demandée.
// Rien ne précise si c'est temporaire, mais si c'est définitif, l'erreur 410 est préférable.
// Code commençant par 5(500): indique que le serveur web n'a pas réussi à traiter une requête
// pourtant valide.

// 