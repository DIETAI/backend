"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectGroups = void 0;
// import { IGroup } from "./automaticEstablishment/selectByCorrectEstablishmentProcent";
//select functions
const selectByPerfectProcent_1 = require("./selectByPerfectProcent");
const selectByMinMissingProcentPerfectKcal_1 = require("./selectByMinMissingProcentPerfectKcal");
const selectByMinMissingProcent_1 = require("./selectByMinMissingProcent");
const selectBy2MacroPerfectProcent_1 = require("./selectBy2MacroPerfectProcent");
const selectByLess10Procent_1 = require("./selectByLess10Procent");
const selectByPerfectProtein_1 = require("./selectByPerfectProtein");
const selectByPerfectFat_1 = require("./selectByPerfectFat");
const selectByPerfectCarbohydrates_1 = require("./selectByPerfectCarbohydrates");
const selectByPerfectKcal_1 = require("./selectByPerfectKcal");
const selectByEstablishmentMacroPercentageRange_1 = require("./selectByEstablishmentMacroPercentageRange");
// export interface IMainGroup extends ISelectGroupInfo {
//   group: IGroup;
// }
const selectGroups = (cartesianGroups
// mealEstablishment: DietDays["meals"][0]["establishments"]
) => {
    const perfectProcent = (0, selectByPerfectProcent_1.selectByPerfectProcent)(cartesianGroups);
    const macroPercentageRange = (0, selectByEstablishmentMacroPercentageRange_1.selectByEstablishmentMacroPercentageRange)(cartesianGroups);
    const minMissingProcentPerfectKcal = (0, selectByMinMissingProcentPerfectKcal_1.selectByMissingProcentPerfectKcal)(cartesianGroups);
    const minMissingProcent = (0, selectByMinMissingProcent_1.selectByMissingProcent)(cartesianGroups);
    const twoMacroPerfectProcent = (0, selectBy2MacroPerfectProcent_1.selectBy2MacroPerfect)(cartesianGroups);
    const less10MacroProcent = (0, selectByLess10Procent_1.selectByLess10Procent)(cartesianGroups);
    const proteinPerfectProcent = (0, selectByPerfectProtein_1.selectByProtein)(cartesianGroups);
    const fatPerfectProcent = (0, selectByPerfectFat_1.selectByFat)(cartesianGroups);
    const carbohydratesPerfectProcent = (0, selectByPerfectCarbohydrates_1.selectByCarbohydrates)(cartesianGroups);
    const perfectKcal = (0, selectByPerfectKcal_1.selectByPerfectKcal)(cartesianGroups);
    const selectMainGroup = () => {
        // if (mealEstablishment?.automaticEstablishment) {
        //   const correctEstablishmentProcent = selectByCorrectEstablishmentProcent(
        //     cartesianGroups,
        //     mealEstablishment
        //   );
        //   const correct2EstablishmentProcent = selectByCorrect2EstablishmentProcent(
        //     cartesianGroups,
        //     mealEstablishment
        //   );
        //   const correct1EstablishmentProcent = selectByCorrect1EstablishmentProcent(
        //     cartesianGroups,
        //     mealEstablishment
        //   );
        //   const correctKcalEstablishmentProcent =
        //     selectByCorrectKcalEstablishmentProcent(
        //       cartesianGroups,
        //       mealEstablishment
        //     );
        //   const inCorrectKcalEstablishmentProcent =
        //     selectByCorrectKcalEstablishmentProcent(
        //       cartesianGroups,
        //       mealEstablishment
        //     );
        //   if (correctEstablishmentProcent.group) {
        //     return correctEstablishmentProcent;
        //   }
        //   if (correct2EstablishmentProcent.group) {
        //     return correct2EstablishmentProcent;
        //   }
        //   if (correct1EstablishmentProcent.group) {
        //     return correct1EstablishmentProcent;
        //   }
        //   if (correctKcalEstablishmentProcent.group) {
        //     return correctKcalEstablishmentProcent;
        //   }
        //   return inCorrectKcalEstablishmentProcent;
        // }
        //main procent
        if (perfectProcent.group) {
            return perfectProcent;
        }
        if (macroPercentageRange.group) {
            return macroPercentageRange;
        }
        if (minMissingProcentPerfectKcal.group) {
            return minMissingProcentPerfectKcal;
        }
        if (perfectKcal.group) {
            return perfectKcal;
        }
        if (twoMacroPerfectProcent.group) {
            return twoMacroPerfectProcent;
        }
        if (less10MacroProcent.group) {
            return less10MacroProcent;
        }
        return minMissingProcent;
    };
    return {
        main: selectMainGroup(),
        macroPercentageRange,
        perfectProcent,
        minMissingProcentPerfectKcal,
        twoMacroPerfectProcent,
        less10MacroProcent,
        proteinPerfectProcent,
        fatPerfectProcent,
        carbohydratesPerfectProcent,
    };
};
exports.selectGroups = selectGroups;
