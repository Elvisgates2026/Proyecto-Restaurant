const DEFAULT_DISHES = [
  { id: "cuy-frito", name: "Cuy frito al estilo Cumbe", price: 48, description: "Cuy crocante, papas nativas, ensalada y ají de la casa.", category: "Fondos", label: "Para compartir", tag: "Favorito", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85" },
  { id: "caldo-verde", name: "Caldo verde cajamarquino", price: 18, description: "Papas, quesillo, huevo y un bouquet de hierbas andinas.", category: "Fondos", label: "Receta familiar", tag: "Tradicional", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" },
  { id: "humitas", name: "Humitas de choclo", price: 14, description: "Maíz tierno, queso mantecoso y un toque dulce, envuelto en panca.", category: "Entradas", label: "Vegetariano", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85" },
  { id: "chochoca", name: "Sopa de chochoca", price: 20, description: "Maíz molido, cecina, col y hierbas aromáticas de la sierra.", category: "Entradas", label: "Reconfortante", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=85" },
  { id: "chicharron", name: "Chicharrón con mote", price: 29, description: "Chicharrón de panceta, mote serrano, cebolla y hierbabuena.", category: "Fondos", label: "El más pedido", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=85" },
  { id: "frito", name: "Frito cajamarquino", price: 26, description: "Papa dorada, aderezo de ají panca, arroz y ensalada criolla.", category: "Fondos", label: "Sabor de casa", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85" },
  { id: "cecina", name: "Cecina shilpida", price: 32, description: "Cecina ahumada, papa, huevo y salsa de ají amarillo.", category: "Fondos", label: "De la sierra", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" },
  { id: "pachamanca", name: "Pachamanca de la casa", price: 42, description: "Carnes maceradas, habas, papa y camote cocidos en aromas andinos.", category: "Fondos", label: "Solo fines de semana", image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85" },
  { id: "tamales", name: "Tamales cajamarquinos", price: 13, description: "Masa de maíz, pollo, aceituna y ají, envuelta a mano.", category: "Entradas", label: "Entrada", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=85" },
  { id: "manjar", name: "Manjar blanco artesanal", price: 12, description: "Manjar de leche cajamarquina, galleta de vainilla y frutas.", category: "Dulces & bebidas", label: "Dulce tradicional", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=85" },
  { id: "torta", name: "Torta de chocolate y café", price: 15, description: "Bizcocho húmedo, cacao y café de altura con crema fresca.", category: "Dulces & bebidas", label: "Para cerrar bonito", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85" },
  { id: "caldo-cabeza", name: "Caldo de cabeza", price: 22, description: "Caldo sustancioso con papa, mote, hierbabuena y ají.", category: "Fondos", label: "Tradición norteña", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" },
  { id: "chicha", name: "Chicha morada de la casa", price: 9, description: "Maíz morado, piña, canela y clavo, servida bien fría.", category: "Dulces & bebidas", label: "Sin alcohol", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85" },
  { id: "cafe", name: "Café de altura", price: 8, description: "Café cajamarquino tostado en casa, con notas de chocolate.", category: "Dulces & bebidas", label: "Orgánico", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85" },
  { id: "emoliente", name: "Emoliente andino", price: 7, description: "Mezcla caliente de cebada, linaza, hierbas y miel de abeja.", category: "Dulces & bebidas", label: "Digestivo", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85" }
];

const DISHES_KEY = "esquina-cumbe-dishes";
const SITE_KEY = "esquina-cumbe-site";
const DEFAULT_SITE = {
  name: "La Esquina",
  subtitle: "de Cajamarca",
  eyebrow: "Cocina de altura · Cajamarca, Perú",
  heroTitle: "El sabor de nuestra tierra, servido en tu mesa.",
  heroText: "Recetas que nacen en los Andes y llegan a tu corazón. Ingredientes locales, fuego lento y la calidez de una familia cajamarquina.",
  historyEyebrow: "Una mesa con historia",
  historyTitle: "De la chacra a tu corazón",
  historyText: "En La Esquina de Cajamarca honramos los sabores de nuestra tierra. Trabajamos con productores locales para conservar la esencia, el aroma y la alegría de nuestra región.",
  menuTitle: "Un viaje por Cajamarca",
  menuText: "Clásicos de siempre y sabores que te sorprenderán.",
  address: "Av. La Paz 1230, Cajamarca",
  schedule: "Mar - Dom · 12:00 - 22:00",
  phone: "(076) 123 456",
  whatsapp: "51918460139",
  email: "hola@laesquinadecajamarca.pe"
};
function getDishes() {
  const saved = localStorage.getItem(DISHES_KEY);
  return saved ? JSON.parse(saved) : DEFAULT_DISHES;
}
function saveDishes(dishes) { localStorage.setItem(DISHES_KEY, JSON.stringify(dishes)); }
function getSite() {
  const saved = localStorage.getItem(SITE_KEY);
  return saved ? { ...DEFAULT_SITE, ...JSON.parse(saved) } : { ...DEFAULT_SITE };
}
function saveSite(site) { localStorage.setItem(SITE_KEY, JSON.stringify(site)); }
