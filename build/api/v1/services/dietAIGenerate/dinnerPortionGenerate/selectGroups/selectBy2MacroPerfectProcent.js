"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBy2MacroPerfect = void 0;
const selectBy2MacroPerfect = (cartesianGroups) => {
    const twoMacroPerfectGroup = {
        group: undefined,
        type: 'twoMacroPerfectGroup',
        name: 'najmniejsza suma brakujących procentów dla 2 makroskładników',
        description: 'Obliczanie ilości makroskładnika i porównanie do założeń przyjętych dla posiłku. Następnie wybranie zestawu w którym suma ilości brakujących makraskładników jest najmniejsza',
    };
    const mapGroupsByTwoMacroPerfectProcent = cartesianGroups.map((group) => {
        const macroItems = [
            Math.abs(group.missingProcentCount.missingProteinProcent),
            Math.abs(group.missingProcentCount.missingFatProcent),
            Math.abs(group.missingProcentCount.missingCarbohydratesProcent),
        ];
        const macroItemsBoolean = macroItems.map((item) => item <= 5);
        const filterItems = macroItemsBoolean.filter((item) => item === true);
        if (filterItems.length === 2) {
            return Object.assign(Object.assign({}, group), { macro2PerfectGroup: true });
        }
        return Object.assign(Object.assign({}, group), { macro2PerfectGroup: false });
    });
    const selectedGroupsByTwoMacroPerfectProcent = mapGroupsByTwoMacroPerfectProcent.filter(({ macro2PerfectGroup }) => macro2PerfectGroup === true);
    if (selectedGroupsByTwoMacroPerfectProcent.length < 1) {
        return twoMacroPerfectGroup;
    }
    const selectGroup = () => {
        const group = [...selectedGroupsByTwoMacroPerfectProcent].sort((a, b) => Math.abs(a.missingProcentCount.missingKcalProcent) -
            Math.abs(b.missingProcentCount.missingKcalProcent))[0];
        return group;
    };
    return Object.assign(Object.assign({}, twoMacroPerfectGroup), { group: selectGroup() });
};
exports.selectBy2MacroPerfect = selectBy2MacroPerfect;
