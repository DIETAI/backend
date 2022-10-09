import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from ".";

export const selectByMissingProcent = (cartesianGroups: ICartesianResult[]) => {
  const minMissingProcentGroup: ISelectGroupInfo = {
    group: undefined,
    type: "missingProcentSum",
    name: "najmniejsza suma brakujących procentów dla wszystkich makroskładników",
    description:
      "Obliczanie ilości makroskładnika i porównanie do założeń przyjętych dla posiłku. Następnie wybranie zestawu w którym suma ilości brakujących makraskładników jest najmniejsza",
  };

  const selectGroup = () => {
    const group = [...cartesianGroups].sort(
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
