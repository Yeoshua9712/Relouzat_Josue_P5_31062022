// !: Avant toute chose, toujours créer des "console.log" ou "console.table" pour savoir ce que l'on manipule!
// Récupérer l'id dans l'url. Utiliser l'API native de chrome
const id = new URLSearchParams(window.location.search).get("id"); 
// URLSearchParams = un objet qui permet de récupérer les paramètres d'une URL
// Récupérer l'id dans l'url et afficher le canapé  dans le panier (cart) avec les données récupérées via l'API
console.log(id);
// Créer une fonction qui récupère les données du canapé via l'API
function getCanap() {
  fetch(`http://localhost:3000/api/products/${id}`) // Récupérer les données du canapé via l'API
    .then((res) => res.json()) //* res = response*//
    .then((data) => { //* data = data *// Récupérer les données du canapé
      displayCanap(data); // Appel de la fonction displayCanap et lui assigner la valeur de data (canapé) (data = canapé)
      
    })
    .catch((error) => console.log(error, {cause})); // Si il y a une erreur, afficher l'erreur
}; // "cause" est une mise à jour récente de l' ES6 qui permet de récupérer l'erreur (mise à jour: juillet 2022)

getCanap(); // Appel à cette fonction pour faire apparaitre le canapé sélectionné dans le panier
addToCart(); // Appel à cette fonction pour ajouter les produits au panier (cart)

// Créer une fonction displayCanap qui affiche le canapé sélectionné dans le panier (cart)
function displayCanap(data) {
  console.table(data);
  const containerImage = document.querySelector(".item__img"); // 1: Récupérer le container de l'image
  console.log(containerImage);
  const img = document.createElement("img"); //2: Créer une image pour afficher le canapé
  img.src = data.imageUrl; // 3: Assigner l'image du canapé à l'image créée
  img.setAttribute("alt", data.altTxt); // 4: Assigner l'attribut alt à l'image créée
  containerImage.appendChild(img); // 5: Ajouter l'image au container

  const title = document.getElementById("title"); // Récupérer le titre du canapé
  title.textContent = data.name;  // Assigner le titre du canapé à l'élément titre du DOM 
  console.log(title);
  // ! textContent = permet de récupérer le texte d'un élément du DOM 
  const price = document.getElementById("price"); // Récupérer le prix du canapé
  price.textContent = data.price; // Assigner le prix du canapé à l'élément prix du DOM 
  console.log(price);

  const description = document.getElementById("description"); // Récupérer la description du canapé dans le DOM
  description.textContent = data.description;   // Assigner la description du canapé  à l'élément description du DOM   
  console.log(description);
  canapColor(data.colors); // Appel de la fonction canapColor et lui assigner la valeur de data (canapé) (data = canapé)
  console.log(data.colors);
};

// Créer une fonction qui traite les couleurs du canapé
function canapColor(arrayColor) { // arrayColor = tableau des couleurs du canapé
  const containerColor = document.getElementById("colors"); // Récupérer le selecteur de couleurs
  // Procéder à une boucle qui va itérer sur le tableau des couleurs et créer des options
  arrayColor.forEach((color) => { // Pour chaque couleur du tableau,
    const colorOption = document.createElement("option"); // Créer une option pour chaque couleur
    colorOption.value = color; // Assigner la valeur de la couleur à l'option
    colorOption.textContent = color; // Assigner le texte de la couleur à l'option
    containerColor.appendChild(colorOption); // Ajouter l'option au selecteur de couleurs
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
    let cart = JSON.parse(localStorage.getItem("cart")); // Récupérer le panier (cart) dans le localStorage. parse: transforme le string en objet
    let title = document.getElementById("title").textContent; // Nom du canapé;
    let color = document.getElementById("colors").value; // Couleur du canapé;
    let quantity = document.getElementById("quantity").value; //  Quantité du produit.
    // Créer une variable "cartItem", qui contient ce qu'il y a dans le panier (caractéristiques):
    let cartItem = { // Créer un objet cartItem qui contient les caractéristiques du canapé
      id: id, // Assigner l'id du canapé
      title: title, // Assigner le nom du canapé
      color: color,  // Assigner la couleur du canapé
      quantity: quantity, // Assigner la quantité du canapé
    };
    // Si le panier est vide, créer un tableau qui contient le canapé sélectionné (cartItem) et l'ajouter au panier (cart)
    // Condition: si la quantité est supérieure à 0 et inférieur ou égal à 100, et que la couleur est différente de ""( "": rien ici)
    if (quantity > 0 && quantity <= 100 && color !== "") { 
      // S'il n'y a rien dans le panier
      if (localStorage.getItem("cart") === null) { 
        cart = []; // Initialiser un tableau cart vide,
        cart.push(cartItem); // Dans lequel on introduit la variable cartItem (qui contient les caractéristiques du canapé)
        // Le localStorage stocke toujours en string (chaîne de caractères). Il faut donc employer JSON.stringify ici.
        // * Rappel: JSON signifie JavaScript Object Nomination {}
        // Enregistrer le tableau dans le localStorage
        localStorage.setItem("cart", JSON.stringify(cart)); // Stocke le tableau cart dans le localStorage
        // Créer un lien qui envoie vers "Mon Panier" (page cart.html):
        window.location.href = "cart.html";
      } else { // S'il y a déjà un panier dans le localStorage (cart)
        let flagId = false; // Initialiser une variable flagId à false (pas de canapé dans le panier) pour vérifier si le canapé est déjà dans le panier
        // Ajouter les quantités dans le panier (cart)
        for (let el in cart) { // Pour chaque élément du tableau cart, el: le nom de l'élément du tableau
          if (title === cart[el].title && color === cart[el].color) { 
            // Si le nom est conforme à celui du tableau,
            //ainsi que la couleur...
            cart[el].quantity = parseInt(cart[el].quantity) + parseInt.quantity; // Ajouter la quantité au panier (cart) dans le localStorage
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