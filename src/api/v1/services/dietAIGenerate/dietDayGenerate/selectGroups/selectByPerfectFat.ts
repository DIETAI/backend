import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from ".";

export const selectByFat = (cartesianGroups: ICartesianResult[]) => {
  const fatPerfectProcentGroup: ISelectGroupInfo = {
    group: undefined,
    type: "perfectFat",
    name: "dokładna ilość tłuszczów",
    description:
      "Wybranie zestawu w którym ilość tłuszczów spełnia założenia, lecz ilość innych makroskładników może być nieodpowiednia",
  };

  const selectedGroupsByFat = cartesianGroups.filter(
    ({ missingProcentCount }) =>
      Math.abs(missingProcentCount.missingFatProcent) <= 5
  );

  if (selectedGroupsByFat.length < 1) {
    return fatPerfectProcentGroup;
  }

  const selectGroup = () => {
    const group = [...selectedGroupsByFat].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingFatProcent) -
        Math.abs(b.missingProcentCount.missingFatProcent)
    )[0];

    return group;
  };

  return {
    ...fatPerfectProcentGroup,
    group: selectGroup(),
  };
};
