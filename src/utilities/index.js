const smoothScroll = (to) => {
  const href = "#" + to; // '#projects'
  const offsetTop =
    document.querySelector(href)?.offsetTop - 60 ||
    document.querySelector(href)?.scrollTop - 60;

  // console.log({ href, offsetTop });

  window.scroll({
    top: offsetTop || 0,
    behavior: "smooth",
  });
};

function debounce(cb, delay, fn) {
  let timeoutId;
  return function (...args) {
    fn();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function isIntersecting(el_id) {
  const element = document.getElementById(el_id);
  const scrollTop_el = element?.offsetTop || element?.scrollTop || 0;
  // const height_el = element?.clientHeight || 0; // element a la moitié
  // const height_window = window.innerHeight;
  const window_scrollTop = document.documentElement.scrollTop;

  // console.log(scrollTop_el);
  // console.log(height_el);
  // console.log(height_window);
  // console.log(window_scrollTop);

  if (scrollTop_el - 150 < window_scrollTop) {
    // console.log("active", element);
    // console.log(scrollTop_el, window_scrollTop, element);
    return true;
  }

  return false;
}

function calculTotal(baskets = []) {
  const price = baskets.reduce((total, product) => {
    total += product.prixTotal * product.quantite;
    return total;
  }, 0);

  return +price.toFixed(2);
}

/*cette fonction extrait du tableau passé en parametre les objets et fait la somme des prix.
ici supplements contient des objets String qu'on doit parser pour extraire le prix_supplement*/
function calculTotalSupplements(supplements = []) {
  const price = supplements.reduce((total, supplement) => {
    total += JSON.parse(supplement).prix_supplement;
    return total;
  }, 0);
  return +price.toFixed(2);
}
/*cette fonction est identique à calculTotalSupplements,
  mais ici supplements contient des objets déjà parsés*/
function calculTotalSupplements_2(supplements = []) {
  const price = supplements.reduce((total, supplement) => {
    total += supplement.prix_supplement;
    return total;
  }, 0);
  return +price.toFixed(2);
}

function calculPrixProduitAvecQuantite(product) {
  return +(product.quantite * product.prixTotal).toFixed(2);
}

function splitPrix(prix = 0.0, splitOn = ".", joinWith = "€") {
  return parseFloat(prix).toFixed(2).toString().split(splitOn).join(joinWith);
}

function getNombresArticles(baskets = []) {
  return baskets.reduce((total, product) => total + product.quantite, 0);
}

function getPrixAvecHT(prixTTC, TVA) {
  /* const montantHT = prixTTC * (1 - TVA / 100); */
  //const prixTTC = prixHT + montantTva;
  const montantHT = prixTTC * ( 100 / (100+TVA))
  return +montantHT.toFixed(2);
}

export {
  isIntersecting,
  debounce,
  smoothScroll,
  calculTotal,
  splitPrix,
  getNombresArticles,
  calculPrixProduitAvecQuantite,
  getPrixAvecHT,
  calculTotalSupplements,
  calculTotalSupplements_2,
};
