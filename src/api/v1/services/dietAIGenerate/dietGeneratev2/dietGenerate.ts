import { IDietMealDocument } from '../../../interfaces/diet/dietMeal.interfaces';

type GenerateMealsSettings =
  | 'changeAmountAddedMeals'
  | 'saveAddedMeals'
  | 'newMeals';

interface IDietGenerateArgs {
  days: string[]; //days id
  mealsToGenerate: {
    uid: string;
    type: IDietMealDocument['type'];
  }[];
  generateMealsSettings: GenerateMealsSettings;
}

export const generateDiet = async ({
  days,
  mealsToGenerate,
  generateMealsSettings,
}: IDietGenerateArgs) => {
  // 1. Rekomendacja wszystkich posiłków (brak powtarzania w diecie) => system rekomendacji w python
  // 1) Przekazanie wszystkich dni
  // 2) Wybranie np wszystkich śniadań => jeśli znajdują się w mealsToGenerate
  // 3) Przygotowanie wszystkich dań w diecie
  // 4) Wybranie posiłku jeśli się nie powtarza
  //iterowanie po śniadaniach, obiadach itd..
  //w jednym czasie można stosować 2 opcje rekomendacji i wybrać lepsze danie
  //1 opcja rekomendacji => zastosowanie jeśli brak posiłku lub ilość np. śniadań jest większa od 2
  //   for (meal in mealsToGenerate.length) {
  //   }
  //   //2 opcja rekomendacji
  //   for (day in days) {
  //   }
  //przykład w js
  // 2. Generowanie wartości => system w RUST
  // 3. Wysłanie wygenerowanych dni
};
