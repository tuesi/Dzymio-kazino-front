export class ConvertCurrencies {
    static getMakseider(value: number) {
        return Math.floor(value / 10000);
    }

    static getPiniginis(value: number) {

        let M = this.getMakseider(value);
        return Math.floor(((value - (M * 10000)) / 100));
    }

    static getZetonas(value: number) {
        let M = this.getMakseider(value);
        let P = this.getPiniginis(value);
        return Math.floor((value - ((P * 100) + (M * 10000))));
    }

    static convertToZetonai(makseideriai: number, piniginiai: number, zetonai: number) {
        let all = 0;
        all = zetonai;
        all += (piniginiai * 100);
        all += (makseideriai * 10000);
        return all;
    }
}
