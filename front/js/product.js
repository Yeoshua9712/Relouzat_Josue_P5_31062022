// !: Avant toute chose, toujours créer des "console.log" pour savoir ce que l'on manipule!
// Récupérer l'id dans l'url. Utiliser l'API native de chrome
const id = new URLSearchParams(window.location.search).get("id"); 
// Récupérer l'id dans l'url et afficher le canapé  dans le panier (cart) avec les données récupérées via l'API
console.log(id);
// Créer une fonction qui récupère les données du canapé via l'API
function getCanap() {
  fetch(`http://localhost:3000/api/products/${id}`) // Récupérer le canapé via l'API
    .then((res) => res.json()) //* res = response*//
    .then((data) => { //* data = data*// Récupérer les données du canapé
      displayCanap(data); // Appel de la fonction displayCanap et lui assigner la valeur de data (canapé) (data = canapé)
    })
    .catch((error) => console.log(error, cause)); // Si il y a une erreur, afficher l'erreur
}; // "cause" est une mise à jour récente de l' ES6 qui permet de récupérer l'erreur (mise à jour: juillet 2022)

getCanap(); // Appel à cette fonction pour faire apparaitre le canapé sélectionné dans le panier
addToCart(); // Appel à cette fonction pour ajouter les produits au panier (cart)

// Créer une fonction displayCanap qui affiche le canapé sélectionné dans le panier (cart)
function displayCanap(data) {
  console.log(data);
  const containerImage = document.querySelector(".item__img"); // Récupérer le container de l'image
  console.log(containerImage);
  const img = document.createElement("img"); // Créer une image
  img.src = data.imageUrl; // Assigner l'image du canapé
  img.setAttribute("alt", data.altTxt); // Assigner l'attribut alt à l'image
  containerImage.appendChild(img); // Ajouter l'image au container

  const title = document.getElementById("title"); // Récupérer le titre
  title.textContent = data.name;  // Assigner le titre du canapé à l'élément titre du DOM (HTML)
  console.log(title);

  const price = document.getElementById("price"); // Récupérer le prix
  price.textContent = data.price; // Assigner le prix du canapé
  console.log(price);

  const description = document.getElementById("description");   
  description.textContent = data.description;   // Assigner la description du canapé  à l'élément description du DOM (HTML)  
  console.log(description);
  canapColor(data.colors); // Appel de la fonction canapColor et lui assigner la valeur du tableau des couleurs
  console.log(data.colors);
};

// Créer une fonction qui traite les couleurs du canapé
function canapColor(arrayColor) {
  const containerColor = document.getElementById("colors"); // Récupérer le selecteur de couleurs
  // Procéder à une boucle qui va itérer sur le tableau des couleurs et créer des options
  arrayColor.forEach((color) => { // Pour chaque couleur du tableau,
    const colorOption = document.createElement("option"); // Créer une option
    colorOption.value = color; // Assigner la valeur de la couleur à l'option
    colorOption.textContent = color; // Assigner le texte de la couleur à l'option
    containerColor.appendChild(colorOption); // Ajouter l'option au selecteur
    console.log(containerColor);
  });
}

// Créer la fonction addToCart(), qui ajoute l'élément(canapé) sélectionné dans le localStorage
function addToCart() {
  // Créer de manière dynamique le bouton qui ajoute le ou les produits au panier (cart):
  const btnAddToCart = document.getElementById("addToCart");
  // Pour cela, il faut établir à la constante btnAddToCart un addEventListener de type "click" qui va appeler la fonction addToCart()
  btnAddToCart.addEventListener("click", (e) => {
    console.log("click");
    let cart = JSON.parse(localStorage.getItem("cart"));
    let title = document.getElementById("title").textContent; // Nom du canapé;
    let color = document.getElementById("colors").value; // Couleur du canapé;
    let quantity = document.getElementById("quantity").value; //  Quantité du produit.
    // Créer une variable "cartItem", qui contient ce qu'il y a dans le panier (caractéristiques):
    let cartItem = { // Créer un objet cartItem
      id: id, // Assigner l'id du canapé
      title: title, // Assigner le nom du canapé
      color: color,  // Assigner la couleur du canapé
      quantity: quantity, // Assigner la quantité du canapé
    };
    console.log(quantity);
    // Condition: si la quantité est supérieure à 0 et inférieur ou égal à 100, et que la couleur est différente de ""
    if (quantity > 0 && quantity <= 100 && color !== "") {
      // S'il n'y a rien dans le panier
      if (localStorage.getItem("cart") === null) {
        cart = []; // Initialiser un tableau cart vide,
        cart.push(cartItem); // Dans lequel on introduit la variable cartItem
        // Le localStorage stocke toujours en string (chaîne de caractères). Il faut donc employer JSON.stringify ici.
        // * Rappel: JSON signifie JavaScript Object Nomination {}
        // Enregistrer le tableau dans le localStorage
        localStorage.setItem("cart", JSON.stringify(cart)); // Stocke le tableau cart dans le localStorage
        // Créer un lien qui envoie vers "Mon Panier" (page cart.html):
        window.location.href = "cart.html";
      } else {
        let flagId = false; // Initialiser une variable flagId à false
        // Ajouter les quantités dans le panier (cart)
        for (let el in cart) {
          if (title === cart[el].title && color === cart[el].color) {
            // Si le nom est conforme à celui du tableau,
            //ainsi que la couleur...
            cart[el].quantity = parseInt(cart[el].quantity) + parseInt.quantity; // Ajouter la quantité au panier
            // parseInt pour transformer la chaine de caractères en nombre
            flagId = true;
            break; // Sortie de boucle (pour éviter de répéter le même canapé) et de la fonction addToCart
          };
        };
        // Par contre, si le produit est dans le panier (cart), mais avec une couleur différente,
        if (flagId === false) {
          cart.push(cartItem); // On l'ajoute au panier, tel un nouveau produit sélectionné
        }
        localStorage.setItem("cart", JSON.stringify(cart)); // Stocker le tableau cart dans le localStorage (en string)
        window.location.href = "cart.html"; // Rediriger vers la page cart.html (page panier)
      }
    } else { // Si la quantité est inférieure à 0 ou supérieure à 100, ou que la couleur est ""
      alert(
        "Veuillez sélectionner au moins une quantité ainsi qu'une couleur s'il vous plaît, merci!" // Afficher un message d'alerte
      );
    }
  });
};