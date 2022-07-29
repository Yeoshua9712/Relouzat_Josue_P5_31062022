
// Etablir une liste totale du cart, via un array (tableau[]):
const cart = [];

recupItemsFromCache();

// Pour chaque élément dans le cart,intégrer tous les éléments du HTML:
// Faire une loop:
cart.forEach((item => displayItem(item)));

//altTxt: "Photo d'un canapé bleu, deux places"
//color: "White"
//id: "107fb5b75607497b96722bda5b504926"
//imageUrl: "http://localhost:3000/images/kanap01.jpeg"
//price: 1849
//quantity: 1
//name:Kanap Sinopé

console.log(cart);


function recupItemsFromCache(){
    // Récupérer les données depuis le localStorage
    const numberOfItems = localStorage.length;

    for(let i = 0; i < numberOfItems; i++){
        
        
        const item = localStorage.getItem(localStorage.key(i));
    
        console.log("objet à la position", i, "est", item);
    
        // Changer item en  objet (parse est l'inverse de stringify, 
        //c'est-à-dire qu'il change en objet au lieu de changer en string):
        const itemObject = JSON.parse(item);
    
    // À chaque fois qu'on va trouver un objet, il sera pushed dans le cart:
    cart.push (itemObject);
    };
    
};

function displayItem(item){
    // Créer la constante article: 
    const article = makeArticle(item);
    console.log(article);
    //const image = 
    const div = makeImageDiv(item);
    // On l'append à article:
    article.appendChild(div);
    // On passe au contenu:
    const cartItemContent = makeCartItemContent(item);
    // Description:
    //article.appendChild(cartItemContent);
    displayArticle(article);

};

// La partie contenu à la créer:
function makeCartItemContent (){
    const div = document.createElement("div");
    div.classList.add("cart__item__content");
};

function makeCartContent(item){
    const div = document.createElement("div");
    const description = makeDescription(item);
    const settings = makeSettings();
    return "";
}

function makeSettings(item){
  return ""
};

// Fonction makeDescription:
function makeDescription(item){
 // Ajouter une description dans cette div:
 const description = document.createElement("div");
 description.classList.add("cart__item__content__description");
 // Création de la div:
 const div = document.createElement("div");
 div.classList.add("cart__item__content");


 // Ensuite on passe à la créaion du h2 pour le nom du produit:
 const h2 = document.createElement("h2");
 h2.textContent = item.name;

 // On passe au p à créer:
 const p = document.createElement("p");
 p.textContent = item.color;

 // Vient ensuite le prix:
 const pPrice = document.createElement("p");
 pPrice.textContent = item.price + "€";

 // On les "append" tous à la description (description sera leur parent):
 description.appendChild(h2);
 description.appendChild(p);
 description.appendChild(pPrice);

 // Sans oublier la div (qui du coup sera le parent de description):
 //div.appendChild(description);

 // Renvoi de la div, sinon rien ne sera renvoyé:
 return description;
 console.log(description);
}

// La fonction displayArticle pour la mettre dans la page (mettre "article" en argument):
function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article);
};

// La fonction article:
function makeArticle(item){

    const article = document.createElement("article");
    article.classList.add("cart__item");
    // Un dataset en machine learning regroupe un ensemble de données. 
    // Celles-ci dépendent d'une variable associée aux valeurs.
    article.dataset.id = item.id;
    article.dataset.color = item.color;

    return article;
};

// La fonction image:
function makeImageDiv(item){

    const div = document.createElement("div");
    div.classList.add("cart__item__img");
    const image = document.createElement('img');
    image.src = item.imageUrl;
    image.atl = item.altTxt;
    div.appendChild(image);
    return div;
};