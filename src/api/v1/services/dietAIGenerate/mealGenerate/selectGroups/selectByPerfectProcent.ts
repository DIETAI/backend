import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from ".";

export const selectByPerfectProcent = (cartesianGroups: ICartesianResult[]) => {
  const perfectProcentGroup: ISelectGroupInfo = {
    group: undefined,
    type: "perfectProcent",
    name: "najniższe odchylenie procentowe dla kcal i makroskładników",
    description:
      "Obliczanie ilości makroskładnika i porównanie do założeń przyjętych dla posiłku. Następnie wybranie zestawu w którym ilośc makroskładników i kcal spełnia założenia. Opcja najdokładniejsza, lecz może się okazać, że brakuje zestawów spełniających wymaganie.",
  };

  const selectedGroupsByPerfectProcent = cartesianGroups.filter(
    ({ missingProcentCount }) =>
      Math.abs(missingProcentCount.missingKcalProcent) <= 5 &&
      Math.abs(missingProcentCount.missingProteinProcent) <= 5 &&
      Math.abs(missingProcentCount.missingFatProcent) <= 5 &&
      Math.abs(missingProcentCount.missingCarbohydratesProcent) <= 5
  );

  if (selectedGroupsByPerfectProcent.length < 1) {
    return perfectProcentGroup;
  }

  const selectGroup = () => {
    const group = [...selectedGroupsByPerfectProcent].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingKcalProcent) -
        Math.abs(b.missingProcentCount.missingKcalProcent)
    )[0];

    return group;
  };

  return {
    ...perfectProcentGroup,
    group: selectGroup(),
  };
};
