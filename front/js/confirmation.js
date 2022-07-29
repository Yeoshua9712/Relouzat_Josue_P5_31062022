const orderId = getOrderId(); // Appel de la fonction getOrderId et lui assigner la valeur de l'id
displayOrderId(orderId); // Appel de la fonction displayOrderId et lui assigner la valeur de l'id de la commande
cleanLocalStorage()  // Créer la fonction clearLocalStorage qui vide le localStorage du panier

function getOrderId() {  
    // Créer la fonction getOrderId qui récupère l'id de la commande et l'assigne à une variable orderId (qui est un nombre) 
    //et qui retourne la valeur de orderId //
    const paramString = window.location.search; 
    // Récupérer la chaîne de caractères de la requête (URL) (?id=1) et la stocker dans une variable paramString
    console.log(paramString); // Afficher la chaîne de caractères de la requête (URL) dans la console (?id=1)
    const searchParams = new URLSearchParams(paramString);  // Créer une instance de la classe URLSearchParams qui va récupérer les paramètres de la requête
    // Créer un objet URLSearchParams qui va récupérer l'id dans l'url 
    return searchParams.get("orderId") // Récupérer l'id dans l'url

};

function displayOrderId(orderId) { // Créer la fonction displayOrderId qui affiche l'id de la commande dans le DOM
    let orderIdElement = document.getElementById("orderId"); // Récupérer l'élément orderId du DOM (HTML)
    orderIdElement.textContent = orderId;  // Assigner l'id de la commande à l'élément orderId du DOM (HTML)
    console.log(orderId); // Afficher l'id de la commande dans la console
    
};

//========= Créer une fonction qui supprime toutes les données du localStorage =========//

 function cleanLocalStorage() {
     const cache = window.localStorage; // Récupérer le cache localStorage
     cache.clear(); // Supprimer toutes les données du cache localStorage
 };
