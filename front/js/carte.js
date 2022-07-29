let cart = [];

 function recupItemsFromCache(){
     // Récupérer les données depuis le localStorage
     const numberOfItems = localStorage.length;

     for(let i = 0; i < numberOfItems; i++){
        
        
         const item = localStorage.getItem(localStorage.stringify(cart)) || "" ;
    
         console.log("objet à la position", i, "est", item);
    
         // Changer item en objet (parse est l'inverse de stringify, 
         //c'est-à-dire qu'il change en objet au lieu de changer en string):
         const itemObject = JSON.parse(item);
    
         // À chaque fois qu'on va trouver un objet, il sera pushed, mis à jour dynamiquement dans le cart:
        cart.push (itemObject);

    
     };

    };

     
     
     // Etablir la fonction getData
     function getData(cart) {
         
         if (cart !== null) {
             // Si le panier n'est pas vide
             fetch(`http://localhost:3000/api/products`) //fetch => appel à l'API kanap
             .then((res) => res.json()) // Obtention de la réponse (res) = (response)
             
             .then((data) => {
                 // Obtention des données:
                 let cartContainer = document.getElementById("cart__items"); // 1: cart__items
                 data.forEach ((item) => {
                     // => Pour chaque item des données (data)
                     cart.forEach((element) => {
                         console.log(element);
                         // Pour chaque élément du panier:
                         if (element.id === item.__id) {
                             // Si l'élément.id de l'API est similaire à l'_id de l'item du localStorage:
                            let article = document.createElement("article"); // 2: création de la balise article dans le DOM
                            article.classList.add("cart__item"); // 3: création de la class cart__item
                            article.dataset.id = `${cart[i].id}`; // 3: création du data-id avec la methode dataset
                            article.dataset.color = `${cart[i].color}`; // 4: création du data-color
                            cartContainer.appendChild(article); // 5: apparition de la balise article, de sa class et de ses éléments enfants
                            
                            // 6: Création de la div parent qui contient l'image et ses attributs enfants
                            let divImg = document.createElement("div");
                            divImg.classList.add("cart__item__img"); // 7: création de la class cart__item__img
                            divImg.appendChild(divImg); // 8: apparition de la div 

                            // 9: Création de la balise image et de ses attributs (enfants)
                            let img = document.createElement("img");
                            img.setAttribute("src", item.imageUrl);
                            divImg.appendChild(img);

                            // 10: Création de la div ayant la class cart__item__content
                            let divInformations = document.createElement("div");
                            divInformations.classList.add("cart__item__content");
                            article.appendChild(divInformations);
                            
                            // 11: Création de la div contenant la class cart__item__content__description
                            let divDescription = document.createElement("div");
                            divDescription.classList.add("cart__item__content__description");
                            divInformations.appendChild(divDescription);

                            // 12: Création du h2
                            let h2 = document.createElement("h2");
                            h2.innerHTML = element.title;
                            divDescription.appendChild(h2);

                            //13: Création du p de color
                            let color = document.createElement("p");
                            color.innerHTML = element.color;
                            divDescription.appendChild(color);

                            // 14: Création du p de price
                            let price = document.createElement("p");
                            price.innerHTML = `${item.price} €`;
                            divDescription.appendChild(price);

                            // 15: Création de la div settings
                            let divSettings = document.createElement("div");
                            divSettings.classList.add("cart__item__content__settings");
                            divInformations.appendChild(divSettings);

                            // 16: Création de la div quantity
                            let divQuantity = document.createElement("div");
                            divQuantity.classList.add("cart__item__content__settings__quantity");
                            divSettings.appendChild(divQuantity);

                            // 17: Création de la balise p de quantity
                            let itemQuantity = document.createElement("p");
                            itemQuantity.innerHTML = `Qté : `;
                            divSettings.appendChild(itemQuantity);

                            // 18: Création du bouton (input) quantité
                            let inputQuantity = document.createElement("input");
                            inputQuantity.setAttribute("itemQuantity");
                            inputQuantity.setAttribute("type", "number");
                            inputQuantity.setAttribute("value", element.quantity);
                            inputQuantity.setAttribute("min","1");
                            inputQuantity.setAttribute("max","100");
                            // (changement de quantité)
                            changeQuantity(inputQuantity);
                            divSettings.appendChild(inputQuantity);
                            
                            // 19: Création de la div incluant la suppession (delete)
                            let divDelete = document.createElement("div");
                            divDlelete.classList.add("cart__item__content__settings__delete");
                            divSettings.appendChild(divDelete);

                            // 20 Création du bouton supprimer (delete)
                            let deleteButton = document.createElement("button");
                            deleteButton.classList.add("deleteItem");
                            deleteButton.innerHTML = "Supprimer";
                            divDelete.appendChild(deleteButton);
                            displayTotalPriceQuantity(item);
                            
                        };
                    });
                });
                deleteItem(); //Supprimer l'élément
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else {
              // si le panier est vide 
              alert("Votre panier est vide")
          };
    };


    // Par la suite, créer une fonction quic hange la quantité
    // Une fonction qui calcule le prix total des articles,
    // Et une fonction qui supprime un article (canapé).
    

    function displayChangeQuantity () {

        let totalQantity = document.querySelector("#totalQuantity");

        let total = cart.reduce((total, item) => total + item.quantity, 0);
        
        displayTotalQuantity.textContent = total;

    };

    function displayTotalPrice() {
        let totalPrice = document.querySelector("#totalPrice");
        // dans le [cart], pour chaque élément item, le prix total est = au prix de l'item, fois (*) la quantité de l'item:
        let total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        // * reduce permet de transformer un array [ ] en une seule valeur
        totalPrice.textContent = total;
    };

    // document.getElementById("itemQunatity").addEventListener("click", (e) =>{

    // });

    // function deleteItem(deleteButton){
    //     let deleteButton = doc.getElementById("deleteItem");
    //     if (deleteItem === false) {
    //         deleteButton = localStorage.removeItem("Supprimer");

    //     };
    // }; 
    // 

// function displayTotalQuantity() {
//     
//     displayTotalQuantity.textContent = total; 
// };

// // Fonction de la quantité totale:
// function displayTotalPrice() {
  

//     
//     
//     

//     console.log(total);
//     //Cela ne fonctionnera pas, car price n'a pas été défini via l
//     
// };
    
    
// // Etablir une liste totale du cart, via un array (tableau[]):
// const cart = [];

// recupItemsFromCache();

// // Pour chaque élément dans le cart,intégrer tous les éléments "item" du HTML:
// // Faire une loop:
// cart.forEach((item) => displayItem(item));
// //Mettre un exemple en commentaire (ci-dessous) pour ne pas oublier par la suite:
// //altTxt: "Photo d'un canapé bleu, deux places"
// //color: "White"
// //id: "107fb5b75607497b96722bda5b504926"
// //imageUrl: "http://localhost:3000/images/kanap01.jpeg"
// //price: 1849 (! attention: le prix doit toujours être appelé depuis le back - utiliser fetch method GET pour cela)
// //Cela empêche à l'utilisateur de modifier le prix depuis le localStorage. 
// //quantity: 1
// //name:Kanap Sinopé

// console.log(cart);


// function recupItemsFromCache(){
//     // Récupérer les données depuis le localStorage
//     const numberOfItems = localStorage.length;

//     for(let i = 0; i < numberOfItems; i++){
        
        
//         const item = localStorage.getItem(localStorage.key(i)) || "" ;
    
//         console.log("objet à la position", i, "est", item);
    
//         // Changer item en objet (parse est l'inverse de stringify, 
//         //c'est-à-dire qu'il change en objet au lieu de changer en string):
//         const itemObject = JSON.parse(item);
    
//         // À chaque fois qu'on va trouver un objet, il sera pushed, mis à jour dynamiquement dans le cart:
//     cart.push (itemObject);

    
//     };
    
// };
// // Apparaître des items:
// function displayItem(item){
//     // Créer la constante article: 
//     const article = makeArticle(item);
//     console.log(article);
//     //ensuite faire une const imageDiv:
//     const imageDiv = makeImageDiv(item);
//     // On l'append à article:
//     article.appendChild(imageDiv);
//     console.log(imageDiv);
//     const cartItemContent = makeCartContent(item);
//     article.appendChild(cartItemContent);
//     // On passe au contenu:
//     displayArticle(article);
//     // Quantité totale:
//     //displayTotalQuantity(item);

// };

// function makeCartContent(item){
//     const cartItemContent = document.createElement("div");
//     console.log(cartItemContent);
//     cartItemContent.classList.add("cart__item__content");

//     const description = makeDescription(item);
//     const settings = makeSettings(item);

//     cartItemContent.appendChild(description);
//     cartItemContent.appendChild(settings);
//     return cartItemContent;
// };

// function makeSettings(item){
//     const settings = document.createElement("div");
//     settings.classList.add("cart__item__content__settings");
//     //Créer une fonction qui ajoute la quantité:
//     addQuantiyToSettings(settings, item);
//     // Créer l'élément qui permet d'effacer (delete) la quantité:
//     addDeleteToSettings(settings, item);
//   return settings;
// };


// // Fonction permettant l'ajout de la quantité:
// function addQuantiyToSettings(settings, item) {
//     const quantity = document.createElement("div");
//     quantity.classList.add("cart__item__content__settings__quantity");
//     const p = document.createElement("p");
//     p.textContent = "Qté : ";
//     quantity.appendChild(p);
//     const input = document.createElement("input");
//     // On passe à l'input:
//     input.type = "number";
//     // La class de l'input:
//     input.classList.add("itemQuantity");
//     input.name = "itemQuantity";
//     input.min = "1";
//     input.max = "100";
//     //intéger la valeur par défaut, relative à la quantité voulue (d'où le item.quantity),
//     // mais on peut aussi garder value, cela ne changera rien:
//     input.value = item.quantity; // considéré comme la quantité initiale.
//     // !: addEventListener à l'input pour la prise en compte des modifications (updatePriceAndQuantity) de la quantité: 
//     input.addEventListener("input", () => updatePriceAndQuantity (item.id, input.value));
//     quantity.appendChild(input);
//     settings.appendChild(quantity);
// };

// function updatePriceAndQuantity(id, newValue, item) {
//     //Récupérer la nouvelle valeur à chaque nouvelle modification de quantité; chercger depuis le cart []:
//     console.log(id);
//     const itemToUpdate = cart.find(item => item.id === id); // Chercher le item, tel que item === à l'id du item.
//     console.log("itemToUpdate", itemToUpdate);
//     console.log("newValue", newValue); // ici, le console.log montre la nouvelle quantité.
//     // newValue a été récupéré depuis le "input.value = item.quantity" plus haut.
    
//     itemToUpdate.quantity = Number (newValue); // la quantité sera le nouveau nombre de la newValue.
//     console.log(cart);
//     //item.quantity = itemToUpdate.quantity;
//     // Rappeler les deux fonctions displayTotalPrice et DisplayTotalQuantity:
//     displayTotalQuantity ();
//     displayTotalPrice ();
//     // Au cas où il faut sauver la sélection sauvegardée, ajouter la fonction de sauvegarde dans le cache:
//     saveDataToCache(item)
// };

// // Fonction de sauvegarde dans le cache:
// function saveDataToCache(item) {

//     const dataToSave = JSON.stringify(item);
//     console.log(dataToSave);
//     const key = `${item.id}-${item.color}`
//     localStorage.setItem(key, dataToSave);

// };

// //Créer une fonction permettant le retrait de la quantité ("Supprimer"):
// function addDeleteToSettings(settings) {
//     const div = document.createElement("div");
//     div.classList.add("cart__item__content__settings__delete");
//     const p = document.createElement("p");
//     p.textContent = "Supprimer";
//     div.appendChild(p);
//     settings.appendChild(div);
// };

// //  getPriceData(price);

// // //Pour le prix, il faut faire un appel à l'API:
// //  function getPriceData (price) {
// //      if (cart !== null) {
// //          fetch (`http://localhost:3000/api/products`);
        
// //          then((response) => response.json(price))

// //          // Récupération de la réponse pour traitement:
// //          then((data) => {
         
// //           const price = document.createElement("p");

// //           data.forEach (price =>{

// //             price.textContent = item.price + "€";

// //             price.appendChild(p);
// //             console.log(price);

// //           });
        
// //          });  
// //  };    

// //  };    
// const totalQantity = document.getElementById("totalQuantity");

// function displayTotalQuantity() {
//     const total = cart.reduce((total, item) => total + item.quantity, 0);
//     displayTotalQuantity.textContent = total; 
// };

// // Fonction de la quantité totale:
// function displayTotalPrice() {
  

//     const totalPrice = document.getElementById("totalPrice");
//     // dans le [cart], pour chaque élément item, le prix total est = au prix de l'item, fois (*) la quantité de l'item:
//     const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);

//     console.log(total);
//     //Cela ne fonctionnera pas, car price n'a pas été défini via l
//     totalPrice.textContent = total;
// };

// // Fonction makeDescription:
// function makeDescription(item){
//  // Ajouter une description dans cette div:
//  const description = document.createElement("div");
//  description.classList.add("cart__item__content__description");
//  // Création de la div:
// console.log(description);

//  // Ensuite on passe à la création du h2 pour le nom du produit:
//  const h2 = document.createElement("h2");
//  h2.textContent = item.name;

//  // On passe au p à créer:
//  const p = document.createElement("p");
//  p.textContent = item.color;

//  // Vient ensuite le prix:
//  //  const pPrice = document.createElement("p");
//  // pPrice.textContent = item.price + "€";

//  // On les "append" tous à la description (description sera leur parent):
//  description.appendChild(h2);
//  description.appendChild(p);
//  //description.appendChild(pPrice);

//  // Sans oublier la div (qui du coup sera le parent de description):
//  //div.appendChild(description);

//  // Renvoi de la div, sinon rien ne sera renvoyé:
//  return description;
 
// };

// // La partie contenu à la créer:
// function makeCartItemContent (){
// };




// // La fonction displayArticle pour la mettre dans la page (mettre "article" en argument):
// function displayArticle(article){
//     document.querySelector("#cart__items").appendChild(article);
// };

// // La fonction article:
// function makeArticle(item){

//     const article = document.createElement("article");
//     article.classList.add("cart__item");
//     // Un dataset en machine learning regroupe un ensemble de données. 
//     // Celles-ci dépendent d'une variable associée aux valeurs.
//     article.dataset.id = item.id;
//     article.dataset.color = item.color;

//     return article;
// };

// // La fonction image:
// function makeImageDiv(item){

//     const div = document.createElement("div");
//     div.classList.add("cart__item__img");
//     const image = document.createElement('img');
//     image.src = item.imageUrl;
//     image.atl = item.altTxt;
//     div.appendChild(image);
//     return div;
// };

//=================================================================

// // Etablir une liste totale du cart, via un array (tableau[]):
// const cart = [];
//         console.log(cart);
// //* La valeur de displayCart est un localStorage, dans lequel les articles sélctionnés sont sauvegardés       
// const displayCart = localStorage.getItem("id");
//         console.log(displayCart);
//         //Intégration de chaque élément parent et enfant:
//         //Créer une boucle (ou loop) forEach dans le tableau [array] cart:
        
//         cart.forEach((item => displayItem(item)));
    
//         //Récupération des items depuis le localStorage:
//         //Appel à la fonction recupItemsFromCache:
// recupItemsFromCache();

//         //Créer la fonction recupItemsFromCache:
// function recupItemsFromCache(){ 
        
//         //Déclaration d'une variable indiquant le nombre d'articles ajoutés depuis le localStorage:
//         const numberOfItems = localStorage.length;
//         console.log("Nombre d'articles ajoutés:", numberOfItems);
//         for(let i = 0; i < numberOfItems.length; i++) {
//         const item = localStorage.getItem(localStorage.key(i));
//         //Changer item en objet:
//         const itemObject = JSON.parse(item);    
//         cart.push(itemObject);
//         console.log(recupItemsFromCache);
//         // let item = document.createElement("article");   
//         // console.log(item);    
//         // item.classList.add("cart__item");
//         // item.dataset.id = `${cart[i].id}`;
//         // item.dataset.color = `${cart[i].color}`;
//         // item.appendChild(item);

//         // Image:
//         // let itemImg = document.createElement("div");
//         // itemImg = classList.add("cart__item__img");
//         // item.appendChild(itemImg);    
//         // Conversion en Objet:
//         // cart.push(itemObject);   

//     };

// };
// // Note: il y a deux div parent, dont la deuxième comporte deux div enfants
// function displayItem(item) {

//         const article = makeArticle(item);
//         //Appel à la fonction displayArticle:
    
//         const imageDiv = makeImageDiv(item);
//         article.appendChild("div");
//         //makeCartDescription contient une description et un settings
//         const cartItemContent = makeCartDescription(div, item);
//         displayArticle(article);
//         article.appendChild(cartItemContent);

// };
// //contenu de la div cart:
// function makeCartContent(div, item) {
//         const description = makeDescription(item);
//         makeSettings();
//         //const div = document.createElement("div");
//         div.classList.add("cart__item__content");

// };


// function makeDescription(item) {

//         const description = document.createElement("div");
//         description.classList.add("cart__item__content__description");
//         const h2 = document.createElement("h2");
//         h2.textContent = item.name;
//         const p = document.createElement("p");
//         p.textContent = item.color;
//         //Price (prix) étant aussi un p, je vais le nomme p2:
//         const p2 = document.createElement("p")
//         p2.textContent = item.price + "€";

//         description.appendChild(h2);
//         description.appendChild(p);
//         description.appendChild(p2);
//         div.appendChild(description);
//         return div;

// };

// //Mettre l'article dans la page avec une fonction:
// function displayArticle(article) {
//         document.querySelector("#cart__items");
// };

// function makeArticle(item) {
//         const article = document.createElement("article");
//         article.classList.add("cart__item");
//         article.dataset.id = item.id;
//         article.dataset.color = item.color;

//         return article;
// };

// function makeImageDiv(item) {
//         const div = document.createElement("div");
//         div.classList.add("cart__item__img");
//         const image = document.createElement("img");
//         image.src = item.imageUrl;
//         image.alt = item.altTxt;
//         div.appendChild(image);
//         return div;
// };


// function articleHere(item){
//     let article = document.createElement.add("article");
//     article.classList.add("item");
//     article.appendChild(articleHere(item));
//     article.appendChild(titleHere(item));
//     article.appendChild(priceHere(item));
//     article.appendChild(quantityHere(item));
//     article.appendChild(colorHere(item));
//     article.appendChild(imageHere(item));
    
//     //stopper la fonction avec return:
//     return article;
    
// };


// //let recupItemsFromCache = localStorage.getItem("item");

// // Pour chaque élément dans le cart, intégrer tous les éléments du HTML:
// // Faire une loop:
// cart.forEach((item) => displayItem(item));

// // Liste mémo des éléments à traiter:
// //altTxt: "Photo d'un canapé bleu, deux places"
// //color: "White"
// //id: "107fb5b75607497b96722bda5b504926"
// //imageUrl: "http://localhost:3000/images/kanap01.jpeg"
// //price: 1849 ... Mais le prix (price) ne devra pas être pris en compte dans le front
// //car l'utilisateur pourrait modifier le prix
// //quantity: 1
// //name:"Kanap Sinopé"



// function recupItemsFromCache (){
//         // Récupérer les données depuis le localStorage
//         const numberOfItems = localStorage.length;

//         for(let i = 0; i < numberOfItems; i++){
        
        
//         const item = localStorage.getItem(localStorage.key(i)) || "";
//         // Prise en compe des articles sélectionnés et stockés dans le localStorage:
//         console.log("objet à la position", i, "est", item);
    
//         // ! :Changer item en  objet (parse est l'inverse de stringify, 
//         //c'est-à-dire qu'il change en objet au lieu de changer en string):
//         const itemObject = JSON.parse(item);
    
//         // À chaque fois qu'on va trouver un objet, il sera pushed, introduit dans le cart:
//         cart.push(itemObject);
//     };
    
// };

// //recupItemsFromCache();

// function displayItem(item){
//         // Créer la constante article: 
//         const article = makeArticle(item);
//         console.log(article);
//         //const imageDiv = 
//         const imageDiv = makeImageDiv(item);
//         // On l'append à article:
//         article.appendChild(imageDiv);

//         // On passe au contenu:
//         makeCartContent(item);
//         article.appendChild(cartItemContent);
//         displayArticle(article);

// };

// cart.forEach((item) => displayItem(item));

// function makeCartContent(item){
//         const cartItemContent = document.createElement("div");
//         cartItemContent.classList.add(".cart__item__content");

//         const description = makeDescription(item);
//         const settings = makeSettings(item);
    
//         cartItemContent.appendChild(description);
//         cartItemContent.appendChild();
// };

// function makeSettings(item){
//     return ""
// };

// // Fonction makeDescription:
// function makeDescription(item){
//         // Ajouter une description dans cette div:
//         const description = document.createElement("div");
//         description.classList.add("cart__item__content__description");
//         // Création de la div:
//         const div = document.createElement("div");
//         div.classList.add("cart__item__content");

//         // Ensuite on passe à la créaion du h2 pour le nom du produit:
//         const h2 = document.createElement("h2");
//         h2.textContent = item.name;

//         // On passe au p à créer:
//         const p = document.createElement("p");
//         p.textContent = item.color;
      
//         const pPrice = document.createElement("p");
//         pPrice.textContent = item.price + "€";

//         // On les "append" tous à la description (description sera leur parent):
//         description.appendChild(h2);
        
//         description.appendChild(p);
        
//         description.appendChild(pPrice);

//         // Sans oublier la div (qui du coup sera le parent de description):
//         div.appendChild(description);

//         // Renvoi de la div, sinon rien ne sera renvoyé:
//  return description;
//  console.log(description);
// };

// // La fonction displayArticle pour la mettre dans la page (mettre "article" en argument):
// function displayArticle(article){

//     document.querySelector("#cart__items").appendChild(article);
// };

// // La fonction article:
// function makeArticle(item){

//     const article = document.createElement("article");
//     article.classList.add("cart__item");
//     // Un dataset en machine learning regroupe un ensemble de données. 
//     // Celles-ci dépendent d'une variable associée aux valeurs.
//     article.dataset.id = item.id;
//     article.dataset.color = item.color;

//     return article;
// };

// // La fonction image:
// function makeImageDiv(item){

//     const div = document.createElement("div");
//     div.classList.add("cart__item__img");
//     const image = document.createElement('img');
//     image.src = item.imageUrl;
//     image.atl = item.altTxt;
//     div.appendChild(image);
//     return div;
//  // };