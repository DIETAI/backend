//interfaces
import { ICartesianResult } from '../cartesianDinners/cartesianDinners';
// import { IGroup } from "./automaticEstablishment/selectByCorrectEstablishmentProcent";

//select functions
import { selectByPerfectProcent } from './selectByPerfectProcent';
import { selectByMissingProcentPerfectKcal } from './selectByMinMissingProcentPerfectKcal';
import { selectByMissingProcent } from './selectByMinMissingProcent';
import { selectBy2MacroPerfect } from './selectBy2MacroPerfectProcent';
import { selectByLess10Procent } from './selectByLess10Procent';
import { selectByProtein } from './selectByPerfectProtein';
import { selectByFat } from './selectByPerfectFat';
import { selectByCarbohydrates } from './selectByPerfectCarbohydrates';
import { selectByPerfectKcal } from './selectByPerfectKcal';
import { selectByEstablishmentMacroPercentageRange } from './selectByEstablishmentMacroPercentageRange';

// import { TMealEstablishment } from "../../components/form/FormInfoPopup";

//select automatic establishment functions
// import { selectByCorrectEstablishmentProcent } from "./automaticEstablishment/selectByCorrectEstablishmentProcent";
// import { selectByCorrect2EstablishmentProcent } from "./automaticEstablishment/selectBy2CorrectEstablishmentProcent";
// import { selectByCorrect1EstablishmentProcent } from "./automaticEstablishment/selectBy1CorrectEstablishmentProcent";
// import { selectByCorrectKcalEstablishmentProcent } from "./automaticEstablishment/selectByCorrectKcalEstablishmentProcent";
// import { selectByInCorrectKcalEstablishmentProcent } from "./automaticEstablishment/selectByIncorrectEstablishmentProcent";

export interface ISelectGroupInfo {
  group?: ICartesianResult;
  type: string;
  name: string;
  description: string;
}

export interface ISelectMainGroupInfo {
  group: ICartesianResult;
  type: string;
  name: string;
  description: string;
}

// export interface IMainGroup extends ISelectGroupInfo {
//   group: IGroup;
// }

export const selectGroups = (
  cartesianGroups: ICartesianResult[]
  // mealEstablishment: DietDays["meals"][0]["establishments"]
) => {
  const perfectProcent = selectByPerfectProcent(cartesianGroups);
  const macroPercentageRange =
    selectByEstablishmentMacroPercentageRange(cartesianGroups);
  const minMissingProcentPerfectKcal =
    selectByMissingProcentPerfectKcal(cartesianGroups);
  const minMissingProcent = selectByMissingProcent(cartesianGroups);
  const twoMacroPerfectProcent = selectBy2MacroPerfect(cartesianGroups);
  const less10MacroProcent = selectByLess10Procent(cartesianGroups);
  const proteinPerfectProcent = selectByProtein(cartesianGroups);
  const fatPerfectProcent = selectByFat(cartesianGroups);
  const carbohydratesPerfectProcent = selectByCarbohydrates(cartesianGroups);
  const perfectKcal = selectByPerfectKcal(cartesianGroups);

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
    main: selectMainGroup() as ISelectMainGroupInfo,
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

export type ISelectedGroups = ReturnType<typeof selectGroups>;
