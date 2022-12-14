// Generated by https://quicktype.io

export interface Amic {
    [key: string]: AmicStation;
}

export interface AmicStation {
    address:           string;
    lat:               string;
    lng:               string;
    icons:             { [key: string]: Icon | null };
    services_img_data: { [key: string]: ServicesImgDatum };
}

export enum Icon {
    AdbluePNG = "adblue.png",
    The559Ef35B1485FSVG = "559ef35b1485f.svg",
    The559Ef36876F9FSVG = "559ef36876f9f.svg",
    The559Ef36F6A220SVG = "559ef36f6a220.svg",
    The559Ef376A139CSVG = "559ef376a139c.svg",
    The559Ef37Ce9DdcSVG = "559ef37ce9ddc.svg",
    The559Ef385E596BSVG = "559ef385e596b.svg",
}

export enum ServicesImgDatum {
    Empty = "",
    HotdogSVG = "hotdog.svg",
    The559Ef3D049F44SVG = "559ef3d049f44.svg",
    The559Ef3De194EdSVG = "559ef3de194ed.svg",
    The559Ef3F506C53SVG = "559ef3f506c53.svg",
    The559Ef3Fcd5590SVG = "559ef3fcd5590.svg",
    The559Ef40E2985CSVG = "559ef40e2985c.svg",
    The559Ef42A77E9ESVG = "559ef42a77e9e.svg",
    The559Ef42Fb61BdSVG = "559ef42fb61bd.svg",
    The559Ef46146DbbSVG = "559ef46146dbb.svg",
    The559Ef4728F362SVG = "559ef4728f362.svg",
    The559Ef47C079E8SVG = "559ef47c079e8.svg",
}

export interface Icons {
    "ДП Prem": Icon;
    "95 Prem": Icon;
}

export interface АЗС1504_ServicesImgData {
    Кіоск: string;
}
