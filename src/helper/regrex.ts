export const REGREX = {
    getRegrexNumberRange(start: number, end: number): RegExp {
        if (start) {
            return new RegExp(`[${start}-${end}]`);
        }
        
        return new RegExp(`[${0}-${end}]`);
    },
};