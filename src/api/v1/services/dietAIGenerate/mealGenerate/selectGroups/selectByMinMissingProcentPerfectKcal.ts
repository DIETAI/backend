import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from ".";

export const selectByMissingProcentPerfectKcal = (
  cartesianGroups: ICartesianResult[]
) => {
  const minMissingProcentGroup: ISelectGroupInfo = {
    group: undefined,
    type: "missingProcentSumPerfectKcal",
    name: "najmniejsza suma brakujących procentów dla wszystkich makroskładników i odpowiednią ilością kcal",
    description:
      "Obliczanie ilości makroskładnika i porównanie do założeń przyjętych dla posiłku. Następnie wybranie zestawu w którym suma ilości brakujących makraskładników jest najmniejsza",
  };

  const selectedGroupsByPerfectKcal = cartesianGroups.filter(
    ({ missingProcentCount }) =>
      Math.abs(missingProcentCount.missingKcalProcent) <= 1
  );

  if (selectedGroupsByPerfectKcal.length < 1) {
    return minMissingProcentGroup;
  }

  const selectGroup = () => {
    const group = [...selectedGroupsByPerfectKcal].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingAllMacroProcentSum) -
        Math.abs(b.missingProcentCount.missingAllMacroProcentSum)
    )[0];

    return group;
  };

  return {
    ...minMissingProcentGroup,
    group: selectGroup(),
  };
};
