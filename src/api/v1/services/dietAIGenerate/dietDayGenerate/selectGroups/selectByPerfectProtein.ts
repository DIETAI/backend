import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from ".";

export const selectByProtein = (cartesianGroups: ICartesianResult[]) => {
  const proteinPerfectProcentGroup: ISelectGroupInfo = {
    group: undefined,
    type: "perfectProtein",
    name: "dokładna ilość białka",
    description:
      "Wybranie zestawu w którym ilość białka spełnia założenia, lecz ilość innych makroskładników może być nieodpowiednia",
  };

  const selectedGroupsByProtein = cartesianGroups.filter(
    ({ missingProcentCount }) =>
      Math.abs(missingProcentCount.missingProteinProcent) <= 5
  );

  if (selectedGroupsByProtein.length < 1) {
    return proteinPerfectProcentGroup;
  }

  const selectGroup = () => {
    const group = [...selectedGroupsByProtein].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingProteinProcent) -
        Math.abs(b.missingProcentCount.missingProteinProcent)
    )[0];

    return group;
  };

  return {
    ...proteinPerfectProcentGroup,
    group: selectGroup(),
  };
};
