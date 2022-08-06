let cart = []; // Création du panier (cart) dans le localStorage via un tableau (array)[]

// Récupérer les données depuis le localStorage:
const numberOfItems = JSON.parse(localStorage.getItem("cart"));
console.log(numberOfItems);
// Changer item en objet (parse est l'inverse de stringify, stringify convertit un objet en chaîne de caractères,
// parse convertit une chaîne de caractères en objet
// c'est-à-dire qu'il change en objet au lieu de changer en string)

const orderButton = document.getElementById("order"); // Récupération du bouton order
orderButton.addEventListener("click", (e) => submitForm(e)); // Ajouter un évènement click sur le bouton submit

recupItemsFromCache(cart); // Appel de la fonction recupItemsFromCache pour récupérer les données depuis le localStorage

// Récupérer les données depuis le localStorage
function recupItemsFromCache() {
  for (let i = 0; i < numberOfItems.length; i++) {
    // À chaque fois qu'on va trouver un objet, il sera pushed, ajouté, mis à jour dynamiquement dans le cart (panier):
    cart.push(numberOfItems[i]);
  }
  return cart; // Retourner le cart (panier)  pour pouvoir l'utiliser dans la fonction totalQuantity et totalPriceDisplay
}

getData(cart); // Appel de la fonction getData pour récupérer les données du localStorage et les afficher dans le panier

// Etablir la fonction getData
function getData() {
  if (cart !== null) {
    // Si le panier n'est pas vide
    fetch(`http://localhost:3000/api/products`) //fetch => appel à l'API kanap
      .then((response) => response.json()) // Obtention de la réponse (res) = (response)

      .then((data) => {
        // Récupération des données
        // Obtention des données:
        const cartContainer = document.getElementById("cart__items"); // 1: id = cart__items
        console.log(cartContainer);
        //const cart = recupItemsFromCache(); // créer un panier à partir de la fonction "recupItemsFromCache"
        data.forEach((item) => { 
          console.log(item.price);
          // => Pour chaque item des données (data)
          cart.forEach((element) => {
            // Pour chaque élément du panier:
            if (element.id === item._id) {
              console.log(element.id, item._id);
              // Si l'élément.id de l'API est similaire à l'_id de l'item du localStorage:
              let article = document.createElement("article"); // 2: création de la balise article dans le DOM
              console.log(article);
              article.classList.add("cart__item"); // Création de la class cart__item
              article.setAttribute("data-id", element.id); // 3: création du data-id avec la methode setAttribute (setAttribute permet de créer des attributs dans le DOM)
              article.setAttribute("data-color", element.color); // 4: création du data-color
              cartContainer.appendChild(article); // 5: apparition de la balise article, de sa class et de ses éléments enfants

              // 6: Création de la div parent qui contient l'image et ses attributs enfants
              let divImg = document.createElement("div");
              divImg.classList.add("cart__item__img"); // 7: création de la class cart__item__img
              article.appendChild(divImg); // 8: apparition de la div dans la balise article (cart__item)
              console.log(divImg);

              // 9: Création de la balise image et de ses attributs (enfants)
              let img = document.createElement("img");
              img.setAttribute("src", item.imageUrl);
              divImg.appendChild(img); // Apparition de la balise image dans la div parent (divImg)

              // 10: Création de la div ayant la class cart__item__content
              let divInformations = document.createElement("div");
              divInformations.classList.add("cart__item__content");
              article.appendChild(divInformations); // Apparition de la div dans la balise article (cart__item)

              // 11: Création de la div contenant la class cart__item__content__description
              let divDescription = document.createElement("div");
              divDescription.classList.add("cart__item__content__description");
              divInformations.appendChild(divDescription); // Apparition de la div dans la div parent (divInformations) (cart__item__content)

              // 12: Création du h2
              let h2 = document.createElement("h2");
              h2.innerHTML = element.title;
              divDescription.appendChild(h2); // Apparition du h2 dans la div parent (divDescription) (cart__item__content__description)

              // 13: Création du p de color
              let color = document.createElement("p");
              color.innerHTML = element.color;
              divDescription.appendChild(color); // Apparition du p de color dans la div parent (divDescription) (cart__item__content__description)

              // 14: Création du p de price
              let price = document.createElement("p");
              price.innerHTML = `${item.price} €`;
              divDescription.appendChild(price); // Apparition du p de price dans la div parent (divDescription) (cart__item__content__description)

              // 15: Création de la div settings
              let divSettings = document.createElement("div");
              divSettings.classList.add("cart__item__content__settings");
              divInformations.appendChild(divSettings);

              // 16: Création de la div quantity
              let divQuantity = document.createElement("div");
              divQuantity.classList.add(
                "cart__item__content__settings__quantity"
              );
              divSettings.appendChild(divQuantity); // Apparition de la div dans la div parent (divSettings) (cart__item__content__settings)

              // 17: Création de la balise p de quantity
              let itemQuantity = document.createElement("p");
              itemQuantity.innerHTML = `Qté : `;
              divSettings.appendChild(itemQuantity); // Apparition du p de quantity dans la div parent (divSettings) (cart__item__content__settings)

              // 18: Création du bouton (input) quantité
              let inputQuantity = document.createElement("input");
              inputQuantity.setAttribute("type", "number");
              inputQuantity.classList.add("itemQuantity"); // Création de la class itemQuantity
              inputQuantity.setAttribute("name", "itemQuantity"); // Création du name de l'input
              inputQuantity.setAttribute("value", element.quantity);
              inputQuantity.setAttribute("min", "1");
              inputQuantity.setAttribute("max", "100");
              divSettings.appendChild(inputQuantity); // Apparition du bouton (input) quantité dans la div parent (divSettings) (cart__item__content__settings)
              console.log(inputQuantity);
              changeQuantity(); // Changer la quantité (changement de quantité)

              // 19: Création de la div incluant la suppession (delete)
              let divDelete = document.createElement("div");
              divDelete.classList.add("cart__item__content__settings__delete");
              divSettings.appendChild(divDelete); // Apparition de la div dans la div parent (divSettings) (cart__item__content__settings)

              // 20 Création du bouton supprimer (delete)
              let deleteButton = document.createElement("button");
              deleteButton.classList.add("deleteItem");
              deleteButton.innerHTML = "Supprimer";
              divDelete.appendChild(deleteButton); // Apparition du bouton supprimer (delete) dans la div parent (divDelete) (cart__item__content__settings)
              console.log(deleteButton);
              deleteItem(); //Supprimer l'élément
              totalPriceDisplay(item); // Afficher le prix total du panier (totalPriceDisplay)
            }
          });

          totalQuantity(); //Calculer la quantité totale du panier (totalQuantity)
        });
      })
      .catch((error) => {
        // Si erreur d'appel API (catch)
        console.log(error, { cause: error }); // Afficher l'erreur et son cause ({cause: error}) dans la console
      });
  } else {
    // si le panier est vide
    alert("Votre panier est vide"); // Afficher un message d'alerte si le panier est vide
  }
}

function deleteItem() {
  // Supprimer un élément du panier

  let deleteButton = document.querySelectorAll(".deleteItem"); // 1: récupération du bouton delete (deleteItem)
  deleteButton.forEach((element, index) => {
    // 2: pour chaque bouton delete / supprimer
    element.addEventListener("click", (e) => {
      // 3: ajouter un évènement click
      e.preventDefault(); // 4: empêcher le comportement par défaut
      let id = document.getElementsByClassName("cart__item")[index].dataset.id; // 5: récupération de l'id de l'élément
      let color =
        document.getElementsByClassName("cart__item")[index].dataset.color; // 6: récupération de la couleur de l'élément
      console.log(id);
      cart.forEach((element) => {
        // 6: pour chaque élément du panier
        if (element.id === id && element.color === color) {
          // 7: si l'id de l'élément est égal à l'id de l'élément du panier et que la couleur est égal à la couleur de l'élément du panier
          cart.splice(index, 1); // 8: supprimer l'élément du panier à l'index correspondant (index)
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart)); // 9: mettre à jour le localStorage
      location.reload(); // 10: recharger la page pour afficher le nouveau panier
      // 11: empêcher le comportement par défaut
    });
  });
  return; //  12: retourner la fonction
}

// 21 Création de la div incluant la quantité totale, mais le prix est dans le data depuis fetch
function totalQuantity() {
  // Création de la fonction totalQuantity pour calculer la quantité totale du panier
  let totalQuantity = document.getElementById("totalQuantity"); // 1: récupération de la div totalQuantity

  console.log(totalQuantity);

  const total = cart.reduce(
    (total, item) => total + parseInt(item.quantity),
    0 // 0 = initialisation de la fonction
  ); // reduce = fonction qui permet de réduire un tableau en un seul élément (total) (total + parseInt(item.quantity))
  // parseInt permet de convertir une chaîne de caractères en nombre (Number). Number peut aussi être utilisé ici.

  totalQuantity.textContent = total; // Afficher la quantité totale dans la div totalQuantity

  console.log(cart);
}

// 22 Ainsi que le prix total
function totalPriceDisplay(data) {
  // Création de la fonction totalPriceDisplay pour calculer le prix total du panier
  let totalPrice = document.getElementById("totalPrice"); // Récupération de la div totalPrice

  console.log(totalPrice);

  let total = cart.reduce(
    // Création de la fonction totalPriceDisplay qui permet de calculer le prix total du panier (reduce)
    (total, item) => total + data.price * item.quantity, // total + data.price * item.quantity = total + prix * quantité
    0 // 0 = initialisation de la fonction
  );

  totalPrice.textContent = Number(total);
  // Number permet de convertir un nombre en chaîne de caractères (String).

  console.log(total);
}

// La fonction changeQuantity permet de changer la quantité d'un article dans le panier:  on change la quantité dans le panier et on met à jour le localStorage
function changeQuantity() {
  const itemQuantity = document.querySelectorAll(".itemQuantity"); // 1: récupération de l'input quantité
  itemQuantity.forEach((element, index) => {
    // 2: pour chaque input quantité  / changer la quantité d'un article))
    element.addEventListener("change", (e) => {
      // 3: ajouter un évènement change / changer la quantité d'un article
      e.preventDefault(); // 4: empêcher le comportement par défaut
      let value = e.target.value; // 5: récupération de la valeur de l'input quantité
      for (let j = 0; j < cart.length; j++) {
        // Pour chaque élément du panier (cart)
        // dataset: récupération des données de l'élément (id et color) dans la div cart__item
        let id =
          document.getElementsByClassName("cart__item")[index].dataset.id; // 8: récupération de l'id de l'élément
        let color =
          document.getElementsByClassName("cart__item")[index].dataset.color; // 9: récupération de la couleur de l'élément
        if (id === cart[j].id && color === cart[j].color) {
          // 10: si l'id de l'élément est égal à l'id de l'élément du panier et que la couleur est égal à la couleur de l'élément du panier
          cart[j].quantity = value; // 11: changer la quantité de l'élément du panier
          localStorage.setItem("cart", JSON.stringify(cart)); // 12: mettre à jour le localStorage
        }
      }
      window.location.reload(); // 13: recharger la page (permet de mettre à jour la quantité)
    });
  });
}

//========= Formulaire de contact =========//
// Créer 3 fonctions pour chaque champ du formulaire, pour vérifier que les champs sont remplis
// correctement, et retournent true ou false ses chaînes de caractères contenant l'objet body:
function onlyLetterValidate(word) {
  // Fonction pour vérifier que le champ est rempli avec des lettres
  const regex_onlyLetter = /^[a-zA-Z\-é]{3,25}$/; // Expression régulière pour vérifier que le champ est rempli avec des lettres
  return regex_onlyLetter.test(word); // Retourne true ou false
}

function addressValidate(word) {
  // Création de la fonnction addressValidate pour vérifier si le mot est rempli avec des lettres et des chiffres
  const regex_address = /^[a-zA-Z0-9é\s\-\°]+$/;
  return regex_address.test(word); // Retourne true ou false
}

function emailValidate(word) {
  // Création de la fonnction emailValidate pour vérifier si le mot est rempli avec des lettres et des chiffres
  const regex_email = /^\w+@[a-zA-Z0-9_]+?\.[a-zA-Z]{2,3}$/;
  return regex_email.test(word); // Retourne true ou false
}

submitForm(); // Appel de la fonction submitForm

function submitForm() {
  // Création de la fonction submitForm pour envoyer le formulaire et afficher un message de confirmation
  const order = document.getElementById("order"); // Récupération du bouton de commande  (submit)
  // Création de la fonction submit qui permet de soumettre le formulaire de contact (submit) et de l'envoyer à l'API
  order.addEventListener("click", (e) => {
    // Ajouter un évènement submit
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
    const body = makeRequestBody(); // Création du body de la requête
    if (cart.length === 0)
      // Si le panier est vide
      alert(
        // Si le panier est vide, afficher un message d'alerte
        "Veuillez sélectionner un article avant de valider votre commande, merci."
      );
    if (
      onlyLetterValidate(body.contact.firstName) && // Si le champ firstName est rempli avec des lettres
      onlyLetterValidate(body.contact.lastName) && // Si le champ lastName est rempli avec des lettres
      onlyLetterValidate(body.contact.city) && // Si le champ city est rempli avec des lettres
      addressValidate(body.contact.address) && // Si le champ address est rempli avec des lettres et des chiffres
      emailValidate(body.contact.email) // Si le champ email est rempli avec des lettres et des chiffres
    ) {
      fetch("http://localhost:3000/api/products/order", {
        // Création de la requête fetch avec l'url de l'api
        method: "POST", // Méthode de la requête POST (création de la commande)
        body: JSON.stringify(body), // Body de la requête (JSON.stringify) (convertit un objet en chaîne de caractères)
        headers: {
          // En-têtes de la requête (headers) (permet de définir le type de données envoyées)
          "Content-Type": "application/json", // Type de la requête (JSON) et du body (JSON) (application/json)
        },
      })
        .then((response) => response.json()) // Récupération de la réponse de la requête (JSON)
        .then(
          (
            data // Récupération des données
          ) => {
            const orderId = data.orderId; // Récupération de l'id de la commande (data.orderId)
            window.location.href = "confirmation.html" + "?orderId=" + orderId; // Redirection vers la page de confirmation avec l'id de la commande
            console.log(data);
          } // Afficher les données
        );
    } else {
      alert(
        // Si le champ est vide, afficher un message d'alerte
        "Veuillez remplir tous les champs du formulaire, merci."
      );
      return;
    }
  });

  // localStorage.setItem("cart", JSON.stringify(cart)); // Stocker le tableau cart dans le localStorage (en string)
  // window.location.href = "confirmation.html"; // Rediriger vers la page confirmation.html (page de confirmation)

  makeRequestBody(); // Appel de la fonction makeRequestBody pour créer le body de la requête
}

function makeRequestBody() {
  // Création du body de la requête fetch avec les données du panier  (makeRequestBody) et les données du formulaire
  const form = document.querySelector(".cart__order__form"); // Récupération du formulaire
  const firstName = form.elements.firstName.value; // Récupération du nom
  const lastName = form.elements.lastName.value; // Récupération du prénom
  const address = form.elements.address.value; // Récupération de l'adresse
  const city = form.elements.city.value; // Récupération de la ville
  const email = form.elements.email.value; // Récupération de l'email

  const body = {
    // Création du body de la requête fetch avec les données du panier (body) et les données du formulaire (form)
    contact: {
      firstName: firstName, // Création du body de la requête
      lastName: lastName, // Création du body de la requête
      address: address, // Création du body de la requête
      city: city, // Pareil pour la ville
      email: email, // Pareil pour l'email
    },

    products: getIdFromCache(), // Récupération des id des produits du panier depuis le localStorage
  };

  return body; // Retourner le body de la requête fetch avec les données du panier et les données du formulaire
}

getIdFromCache(); // Récupération des id des produits du panier depuis le localStorage

function getIdFromCache() {
  // Création de la fonction getIdFromCache pour récupérer les id des produits du panier depuis le localStorage
  const cart = JSON.parse(localStorage.getItem("cart")); // Récupération du panier depuis le localStorage
  let ids = []; // Création d'un tableau vide pour stocker les id des produits du panier
  cart.map((item) => ids.push(item.id)); // Ajout des id des produits du panier dans le tableau
  console.log(ids); // Affichage des id des produits du panier  dans la console du navigateur
  return ids; // Retourner le tableau d'id des produits du panier
}

ifEmailIsNotValid(); // Vérifier si l'email est valide (si l'email n'est pas valide, afficher un message d'alerte)
ifFirstNameIsNotValid(); // Vérifier si le nom est valide (si le nom n'est pas valide, afficher un message d'alerte)
ifLastNameIsNotValid(); // Vérifier si le prénom est valide (si le prénom n'est pas valide, afficher un message d'alerte)
ifAddressIsNotValid(); // Vérifier si l'adresse est valide (si l'adresse n'est pas valide, afficher un message d'alerte)
ifCityIsNotValid(); // Vérifier si la ville est valide (si la ville n'est pas valide, afficher un message d'alerte)

function ifFirstNameIsNotValid() {
  // Création de la fonction ifFirstNameIsNotValid pour vérifier si le nom est valide (si le nom n'est pas valide, afficher un message d'alerte)
  const firstName = document.querySelector("#firstName"); // Récupération du prénom
  firstName.addEventListener("change", (e) => {
    console.log(e.target.value); // Affichage du prénom dans la console du navigateur
    // Ajouter un évènement change sur le prénom  pour vérifier si le nom est valide}
    const regex = /^[A-Za-z\-é]{3,25}$/; // Création de la regex pour le prénom (3 caractères minimum et 25 caractères maximum)
    const firstNameError = document.getElementById("firstNameErrorMsg"); // Récupération du message d'erreur
    if (regex.test(firstName.value) === false) {
      // Si le prénom n'est pas valide (regex) alors afficher un message d'alerte

      firstNameError.innerHTML = "Veuillez entrer un prénom valide"; // Si le prénom n'est pas valide, afficher un message d'erreur
      return false;
    } else {
      // Sinon (si le prénom est valide)

      firstNameError.innerHTML = ""; // Si le prénom est valide, supprimer le message d'erreur
    }
  });
}

function ifLastNameIsNotValid() {
  // Création de la fonction ifLastNameIsNotValid
  const lastName = document.getElementById("lastName"); // Récupération du nom
  lastName.addEventListener("change", (e) => {
    console.log(e); // Affichage du nom dans la console du navigateur
    // Ajouter un évènement change sur le nom pour vérifier si le nom est valide
    const regex = /^[A-Za-z]{3,25}$/; // Création de la regex pour le nom (3 caractères minimum et 25 caractères maximum)
    const lastNameError = document.getElementById("lastNameErrorMsg");
    if (regex.test(lastName.value) === false) {
      // Si le nom n'est pas valide (regex) alors afficher un message d'alerte
      // Si le nom n'est pas valide
      lastNameError.innerHTML = "Veuillez entrer un nom valide"; // Si le nom n'est pas valide, afficher un message d'erreur
    } else {
      // Sinon (si le nom est valide)

      lastNameError.innerHTML = ""; // Si le nom est valide, supprimer le message d'erreur
    }
  });
}

function ifAddressIsNotValid() {
  // Création de la fonction ifAdressIsNotValid pour vérifier si l'adresse est valide
  const address = document.getElementById("address"); // Récupération de l'adresse
  console.log(address); //

  address.addEventListener("change", (e) => {
    // Ajouter un évènement change sur l'adresse pour vérifier si l'adresse est valide
    console.log(e);
    // Ajouter un évènement change sur l'adresse pour vérifier si l'adresse est valide
    console.log(address); // Affichage de l'adresse
    const regex = /^[a-zA-Z0-9é\s\-\°]+$/; // Création de la regex pour l'adresse (2 caractères minimum) et (25 caractères maximum)
    const addressError = document.getElementById("addressErrorMsg");
    console.log(addressError);
    if (regex.test(address.value) === false) {
      // Si l'adresse n'est pas valide (regex) alors afficher un message d'alerte
      addressError.innerHTML = "Veuillez entrer une adresse valide";
    } else {
      // Sinon (si l'adresse est valide)

      addressError.innerHTML = ""; // Si l'adresse est valide, supprimer le message d'erreur
    }
  });
}

function ifCityIsNotValid() {
  // Création de la fonction ifCityIsNotValid pour vérifier si le nom de la ville est valide
  const city = document.getElementById("city"); // Récupération de la ville
  city.addEventListener("change", (e) => {
    console.log(e);
    const regex = /^[A-Za-z\-]{3,25}$/; // Création de la regex pour la ville (3 caractères minimum et 25 caractères maximum)
    const cityError = document.getElementById("cityErrorMsg");
    if (regex.test(city.value) === false) {
      // Si le nom de la ville n'est pas valide (regex), alors afficher un message d'alerte
      cityError.innerHTML = "Veuillez entrer le nom d'une ville valide";
    } else {
      // Sinon (si la ville est valide)

      cityError.innerHTML = ""; // Si la ville est valide, supprimer le message d'erreur
    }
  });
}

function ifEmailIsNotValid() {
  // Création de la fonction ifEmailIsNotValid
  const email = document.getElementById("email"); // Récupération de l'email
  email.addEventListener("change", (e) => {
    console.log(e); // Affichage de l'email
    // Ajouter un évènement change sur l'email pour vérifier si l'email est valide
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; // Création de la regex pour l'email (2 caractères minimum)
    // const regex = /^[\w-\.]+@([w-]+\.)+[\w-]{2,4}$/;  // Création de la regex pour vérifier si l'email est valide ou non
    const emailError = document.getElementById("emailErrorMsg"); // Récupération du message d'erreur
    if (regex.test(email.value) === false) {
      // Si l'email n'est pas valide (regex) alors afficher un message d'alerte
      emailError.innerHTML = "Veuillez entrer une adresse email valide"; // Affichage du message d'erreur
      console.log(email.value); // Affichage de l'email
    } else {
      // Sinon (si l'email est valide)
      emailError.innerHTML = ""; // Si l'email est valide, supprimer le message d'erreur
    }
  });
}

// Créer une condition pour valider ou non le formulaire en fonction des erreurs
// permettant de valider la commande et de l'envoyer vers le serveur
function ifFormIsValid() {
  if (
    firstNameIsNotValid() === false &&
    lastNameIsNotValid() === false &&
    addressIsNotValid() === false &&
    cityIsNotValid() == false &&
    emailIsNotValid() == false
  ) {
    // Si toutes les conditions sont vérifiées, alors envoyer le formulaire vers le serveur
    document.getElementById("order").submit();
    // Si toutes les conditions sont vérifiées, alors afficher un message de confirmation
    alert("Votre commande a été validée");
    document.getElementById("order").disabled = false; // Si toutes les conditions sont vérifiées, alors activer le bouton de soumission
  } else {
    // Sinon, désactiver le bouton de soumission
    document.getElementById("order").disabled = true; // Désactiver le bouton de soumission de commande
  
  }
}
