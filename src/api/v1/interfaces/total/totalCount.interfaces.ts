export interface IMacrohydrate {
  gram: number;
  kcal: number;
}

export interface IMicrohydrate {
  amount?: number;
  unit?: 'mg' | 'uq' | 'j.';
}

export interface ITotal {
  //macrohydrates
  protein: IMacrohydrate;
  fat: IMacrohydrate;
  carbohydrates: IMacrohydrate;
  digestableCarbohydrates: IMacrohydrate;
  fiber: IMacrohydrate;
  animalProtein?: IMacrohydrate;
  vegetableProtein?: IMacrohydrate;
  carbohydrateExchangers: number;
  proteinFatExchangers: number;
  kcal: number;
  //fattyAcids
  saturatedFattyAcids?: number;
  pollyunsaturatedFattyAcids?: number;
  pollyunsaturatedFattyAcidsOmega3?: number;
  pollyunsaturatedFattyAcidsOmega6?: number;
  monounsaturatedFattyAcids?: number;
  //vitamins
  vitaminA?: IMicrohydrate;
  vitaminB1?: IMicrohydrate;
  vitaminB2?: IMicrohydrate;
  vitaminB5?: IMicrohydrate;
  vitaminB6?: IMicrohydrate;
  vitaminB12?: IMicrohydrate;
  biotin?: IMicrohydrate;
  folicAcid?: IMicrohydrate;
  vitaminC?: IMicrohydrate;
  vitaminD?: IMicrohydrate;
  vitaminE?: IMicrohydrate;
  vitaminPP?: IMicrohydrate;
  vitaminK?: IMicrohydrate;
  //minerals
  zinc?: IMicrohydrate;
  phosphorus?: IMicrohydrate;
  magnesium?: IMicrohydrate;
  copper?: IMicrohydrate;
  potassium?: IMicrohydrate;
  selenium?: IMicrohydrate;
  sodium?: IMicrohydrate;
  calcium?: IMicrohydrate;
  iron?: IMicrohydrate;
}
