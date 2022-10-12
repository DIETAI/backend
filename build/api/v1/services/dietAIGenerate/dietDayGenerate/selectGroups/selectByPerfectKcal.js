"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectByPerfectKcal = void 0;
const selectByPerfectKcal = (cartesianGroups) => {
    const kcalPerfectProcentGroup = {
        group: undefined,
        type: "perfectKcal",
        name: "dokładna ilość kcal",
        description: "Wybranie zestawu w którym ilość kcal jest najbardziej przybliżona do założeń",
    };
    const selectGroup = () => {
        const group = [...cartesianGroups].sort((a, b) => Math.abs(a.missingProcentCount.missingKcal) -
            Math.abs(b.missingProcentCount.missingKcal))[0];
        return group;
    };
    return Object.assign(Object.assign({}, kcalPerfectProcentGroup), { group: selectGroup() });
};
exports.selectByPerfectKcal = selectByPerfectKcal;
