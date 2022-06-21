export interface Upg {
    countData:        number;
    countUpdate:      number;
    resultCode:       number;
    maxServerVersion: number;
    maxDataVersion:   number;
    data:             Datum[];
    update:           any[];
}

export interface Datum {
    id:                  number;
    Active:              boolean;
    VersionId:           number;
    Latitude:            string;
    Longitude:           string;
    FullName:            string;
    ShortName:           string;
    Address:             string;
    Region:              string;
    LastPriceUpdateDate: string;
    ServicesAsArray:     ServicesAsArray[];
    FuelsAsArray:        FuelsAsArray[];
}

export interface FuelsAsArray {
    id:    number;
    Title: string;
    Price: string;
}

export interface ServicesAsArray {
    id:    number;
    Title: Title;
}

export enum Title {
    VIVOCafe = "VIVO-cafe",
    Wc = "WC",
    WiFi = "Wi-Fi",
    Їжа = "Їжа",
    Кава = "Кава",
    Магазин = "Магазин",
    ПідкачкаШин = "Підкачка шин",
    Сто = "СТО",
    ТерміналEasyPay = "Термінал EasyPay",
}

export const UpgFuels = {
    A92: 3,
    A95: 2,
    upg95: 9,
    DIESEL: 5,
    upgDP: 1,
    LPG: 4
}
