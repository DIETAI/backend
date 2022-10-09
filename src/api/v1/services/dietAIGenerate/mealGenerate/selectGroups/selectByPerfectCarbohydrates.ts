import { ICartesianResult } from "../cartesianDinners/cartesianDinners";
import { ISelectGroupInfo } from ".";

export const selectByCarbohydrates = (cartesianGroups: ICartesianResult[]) => {
  const carbohydratesPerfectProcentGroup: ISelectGroupInfo = {
    group: undefined,
    type: "perfectCarbohydrates",
    name: "dokładna ilość węglowodanów",
    description:
      "Wybranie zestawu w którym ilość węglowodanów spełnia założenia, lecz ilość innych makroskładników może być nieodpowiednia",
  };

  const selectedGroupsByCarbohydrates = cartesianGroups.filter(
    ({ missingProcentCount }) =>
      Math.abs(missingProcentCount.missingCarbohydratesProcent) <= 5
  );

  if (selectedGroupsByCarbohydrates.length < 1) {
    return carbohydratesPerfectProcentGroup;
  }

  const selectGroup = () => {
    const group = [...selectedGroupsByCarbohydrates].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingCarbohydratesProcent) -
        Math.abs(b.missingProcentCount.missingCarbohydratesProcent)
    )[0];

    return group;
  };

  return {
    ...carbohydratesPerfectProcentGroup,
    group: selectGroup(),
  };
};
