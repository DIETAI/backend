"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectByMissingProcentPerfectKcal = void 0;
const selectByMissingProcentPerfectKcal = (cartesianGroups) => {
    const minMissingProcentGroup = {
        group: undefined,
        type: "missingProcentSumPerfectKcal",
        name: "najmniejsza suma brakujących procentów dla wszystkich makroskładników i odpowiednią ilością kcal",
        description: "Obliczanie ilości makroskładnika i porównanie do założeń przyjętych dla posiłku. Następnie wybranie zestawu w którym suma ilości brakujących makraskładników jest najmniejsza",
    };
    const selectedGroupsByPerfectKcal = cartesianGroups.filter(({ missingProcentCount }) => Math.abs(missingProcentCount.missingKcalProcent) <= 1);
    if (selectedGroupsByPerfectKcal.length < 1) {
        return minMissingProcentGroup;
    }
    const selectGroup = () => {
        const group = [...selectedGroupsByPerfectKcal].sort((a, b) => Math.abs(a.missingProcentCount.missingAllMacroProcentSum) -
            Math.abs(b.missingProcentCount.missingAllMacroProcentSum))[0];
        return group;
    };
    return Object.assign(Object.assign({}, minMissingProcentGroup), { group: selectGroup() });
};
exports.selectByMissingProcentPerfectKcal = selectByMissingProcentPerfectKcal;
