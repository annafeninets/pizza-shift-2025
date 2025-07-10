export type CatalogResponse = {
  success: boolean,
  catalog: Pizza[]
}

export type Pizza = {
  id: string,
  name: string,
  ingredients: Ingredient[],
  toppings: Ingredient[],
  description: string,
  sizes: Ingredient[],
  doughs: Ingredient[],
  calories: number,
  protein: string,
  totalFat: string,
  carbohydrates: string,
  sodium: string,
  allergens: string[],
  isVegetarian: boolean,
  isGlutenFree: boolean,
  isNew: boolean,
  isHit: boolean,
  img: string
}

export type Ingredient = {
  type: string,
  price: number,
  img?: string
}

export const IngredientsDic: Record<string, string> = {
  'MOZZARELLA': 'моцарелла',
  'PEPERONI': 'пепперони',
  'GREEN_PEPPER': 'зеленый перец',
  'MUSHROOMS': 'шампиньоны',
  'PINEAPPLE': 'ананас',
  'BACON': 'бекон',
  'SHRIMPS': 'креветки',
  'HAM': 'ветчина',
  'CHICKEN_FILLET': 'куриное филе',
  'ONION': 'лук',
  'BASIL': 'базилик',
  'CHILE': 'чили',
  'CHEDDAR': 'чеддер',
  'MEATBALLS': 'тефтели',
  'PICKLE': 'маринованные огурцы',
  'TOMATO': 'помидор',
  'FETA': 'фета',
  'PARMESAN': 'пармезан'
}
