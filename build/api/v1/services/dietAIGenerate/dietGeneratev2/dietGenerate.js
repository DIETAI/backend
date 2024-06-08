"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDiet = void 0;
const generateDiet = ({ days, mealsToGenerate, generateMealsSettings, }) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.generateDiet = generateDiet;
