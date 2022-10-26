import { ICartesianResult } from '../cartesianDinners/cartesianDinners';
import { ISelectGroupInfo } from '.';

export const selectByEstablishmentMacroPercentageRange = (
  cartesianGroups: ICartesianResult[]
) => {
  const perfectMacroPercentageRange: ISelectGroupInfo = {
    group: undefined,
    type: 'perfectMacroPercentageRange',
    name: 'dopasowanie makroskładników do przedziału założeń',
    description: 'Dopasowanie makroskładników do przedziału założeń',
  };

  const selectGroupsByMacroPercentageRange = cartesianGroups.filter(
    ({ missingProcentCount }) =>
      missingProcentCount.proteinPerfectPercentageRange &&
      missingProcentCount.fatPerfectPercentageRange &&
      missingProcentCount.carbohydratesPerfectPercentageRange
  );

  if (selectGroupsByMacroPercentageRange.length < 1) {
    return perfectMacroPercentageRange;
  }

  const selectGroup = () => {
    const group = [...selectGroupsByMacroPercentageRange].sort(
      (a, b) =>
        Math.abs(a.missingProcentCount.missingKcalProcent) -
        Math.abs(b.missingProcentCount.missingKcalProcent)
    )[0];

    return group;
  };

  return {
    ...perfectMacroPercentageRange,
    group: selectGroup(),
  };
};
