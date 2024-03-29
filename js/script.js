// Changer l'url du localhost en variable -> appel à l'API
let url = "http://localhost:3000/api/products";

fetch(url,{method:"GET"})
   
    // Conversion de la réponse en JSON (JavaScript Object Nomination)
    .then(response => response.json())

    // Récupération de la réponse pour traitement
    .then(data => {
  
        // Affichage du contenu des données en console
        console.log(data)
       
    
  
        data.forEach(canape =>{ 

            //Insérer l'image et les caractéristiques du canapé dans le tableau des caractéristiques
        
            // Ponctionner dans le DOM via document.getElementById ou document.querySelector
            let articlesSection = document.getElementById("items");

            // Création d'éléments enfants: 

            let childElement = document.createElement("a");
        
            childElement.href = `./product.html?id=${canape._id}`;

            // element.innerHTML : récupère ou définit la syntaxe HTML décrivant les descendants de l'élément.
            childElement.innerHTML = `<article><img src=${canape.imageUrl} alt=${canape.altTxt}>
        
                    <h3 class="productName">${canape.name}</h3>
        
                    <p class="productDescription">${canape.description}</p>
        
                    </article>`;
        
            articlesSection.appendChild(childElement)
        });
});

       function addProducts(data) {

           console.log(data)

           const imageUrl = data [0].imageUrl
           
           console.log("url de l'image", imageUrl)
       };
        
       // *Commentaire très important!*
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