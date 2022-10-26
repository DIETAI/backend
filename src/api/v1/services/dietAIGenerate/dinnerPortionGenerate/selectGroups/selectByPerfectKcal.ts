import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from ".";

export const selectByPerfectKcal = (cartesianGroups: ICartesianResult[]) => {
  const kcalPerfectProcentGroup: ISelectGroupInfo = {
    group: undefined,
    type: "perfectKcal",
    name: "dokładna ilość kcal",
    description:
      "Wybranie zestawu w którym ilość kcal jest najbardziej przybliżona do założeń",
  };

  const selectGroup = () => {
    const group = [...cartesianGroups].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingKcal) -
        Math.abs(b.missingProcentCount.missingKcal)
    )[0];

    return group;
  };

  return {
    ...kcalPerfectProcentGroup,
    group: selectGroup(),
  };
};
