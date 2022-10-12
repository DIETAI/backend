"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectByLess10Procent = void 0;
const selectByLess10Procent = (cartesianGroups) => {
    const less10ProcentMacroGroup = {
        group: undefined,
        type: "less10procent",
        name: "akceptowane 10 procentowe odchylenie dla kcal i makroskładników",
        description: "Wybranie zestawu w którym odchylenie makroskładników i kcal nie przekracza 10 procent",
    };
    const selectedGroupsByLess10Procent = cartesianGroups.filter(({ missingProcentCount }) => Math.abs(missingProcentCount.missingKcalProcent) <= 10 &&
        Math.abs(missingProcentCount.missingProteinProcent) <= 10 &&
        Math.abs(missingProcentCount.missingFatProcent) <= 10 &&
        Math.abs(missingProcentCount.missingCarbohydratesProcent) <= 10);
    if (selectedGroupsByLess10Procent.length < 1) {
        return less10ProcentMacroGroup;
    }
    const selectGroup = () => {
        const group = [...selectedGroupsByLess10Procent].sort((a, b) => Math.abs(a.missingProcentCount.missingKcalProcent) -
            Math.abs(b.missingProcentCount.missingKcalProcent))[0];
        return group;
    };
    return Object.assign(Object.assign({}, less10ProcentMacroGroup), { group: selectGroup() });
};
exports.selectByLess10Procent = selectByLess10Procent;
