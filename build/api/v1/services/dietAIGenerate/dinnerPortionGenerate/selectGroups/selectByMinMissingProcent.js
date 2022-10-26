"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectByMissingProcent = void 0;
const selectByMissingProcent = (cartesianGroups) => {
    const minMissingProcentGroup = {
        group: undefined,
        type: "missingProcentSum",
        name: "najmniejsza suma brakujących procentów dla wszystkich makroskładników",
        description: "Obliczanie ilości makroskładnika i porównanie do założeń przyjętych dla posiłku. Następnie wybranie zestawu w którym suma ilości brakujących makraskładników jest najmniejsza",
    };
    const selectGroup = () => {
        const group = [...cartesianGroups].sort((a, b) => Math.abs(a.missingProcentCount.missingAllMacroProcentSum) -
            Math.abs(b.missingProcentCount.missingAllMacroProcentSum))[0];
        return group;
    };
    return Object.assign(Object.assign({}, minMissingProcentGroup), { group: selectGroup() });
};
exports.selectByMissingProcent = selectByMissingProcent;
