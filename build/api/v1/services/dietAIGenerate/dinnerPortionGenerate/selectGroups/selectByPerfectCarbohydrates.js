"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectByCarbohydrates = void 0;
const selectByCarbohydrates = (cartesianGroups) => {
    const carbohydratesPerfectProcentGroup = {
        group: undefined,
        type: "perfectCarbohydrates",
        name: "dokładna ilość węglowodanów",
        description: "Wybranie zestawu w którym ilość węglowodanów spełnia założenia, lecz ilość innych makroskładników może być nieodpowiednia",
    };
    const selectedGroupsByCarbohydrates = cartesianGroups.filter(({ missingProcentCount }) => Math.abs(missingProcentCount.missingCarbohydratesProcent) <= 5);
    if (selectedGroupsByCarbohydrates.length < 1) {
        return carbohydratesPerfectProcentGroup;
    }
    const selectGroup = () => {
        const group = [...selectedGroupsByCarbohydrates].sort((a, b) => Math.abs(a.missingProcentCount.missingCarbohydratesProcent) -
            Math.abs(b.missingProcentCount.missingCarbohydratesProcent))[0];
        return group;
    };
    return Object.assign(Object.assign({}, carbohydratesPerfectProcentGroup), { group: selectGroup() });
};
exports.selectByCarbohydrates = selectByCarbohydrates;
