export interface OkkoStation {
    entity_type:     EntityType;
    pagination:      Pagination;
    selectedOptions: any[];
    collection:      Collection[];
}

export interface Collection {
    id:         number;
    attributes: CollectionAttributes;
}

export interface CollectionAttributes {
    pulls95_tip_oplati:     boolean | null;
    a95_evro_tip_oplati:    boolean | null;
    a92_evro_tip_oplati:    null;
    dp_evro_tip_oplati:     boolean | null;
    gas_tip_oplati:         boolean | null;
    pullsdiesel_tip_oplati: boolean | null;
    Cod_AZK:                number;
    Oblast:                 any[];
    Naselenyy_punkt:        string;
    Typ_naselenogo_punktu:  TypNaselenogoPunktu;
    Adresa:                 string;
    Typ_obektu:             TypObektu;
    fuel_type:              TypObektu[];
    restaurants:            any[] | TypObektu;
    car_services:           TypObektu[];
    car_washes:             TypObektu[];
    other_services:         TypObektu[];
    coordinates:            Coordinates;
    rozdilnyy_zbir:         TypObektu[];
    post_machines:          TypObektu[];
    notification:           string;
    type_azk:               number;
}

export enum TypNaselenogoPunktu {
    Empty = "",
    М = "м.",
    С = "с.",
    Смт = "смт.",
}

export interface TypObektu {
    id:         number;
    attributes: TypObektuAttributes;
}

export interface TypObektuAttributes {
    code: Code;
    name: Name;
}

export enum Code {
    A95Evro = "A95_EVRO",
    AvtomatychnaMyjka = "Avtomatychna_myjka",
    AvtomatychnaMyjkaDljaVantagyvok = "Avtomatychna_myjka_dlja_vantagyvok",
    Azs = "azs",
    Bankomat = "Bankomat",
    DPEvro = "DP_EVRO",
    Gas = "Gas",
    Glass = "Glass",
    IsMeiWei = "IsMeiWei",
    Ischarge = "Ischarge",
    Meest = "Meest",
    MijkaSelfService = "Mijka_SelfService",
    ObminValyt = "Obmin_valyt",
    PelenalnyStolyk = "Pelenalny_stolyk",
    Plastic = "Plastic",
    PostomatNovaPoshta = "Postomat_nova_poshta",
    Pulls95 = "Pulls95",
    PullsDiesel = "PullsDiesel",
    RestoranAljaMinut = "Restoran_Alja_minut",
    RestoranPastaMia = "Restoran_Pasta_mia",
    RuchnaMyjka = "Ruchna_myjka",
    SecondHand = "Second_hand",
    Shynomontag = "Shynomontag",
    Sto = "STO",
    SwappingWheel = "SwappingWheel",
    VacuumCleaner = "VacuumCleaner",
    Wastepaper = "Wastepaper",
}

export enum Name {
    A95Evro = "A95_EVRO",
    DPEvro = "DP_EVRO",
    Gas = "Gas",
    Pulls95 = "Pulls95",
    PullsDiesel = "Pulls_Diesel",
    АвтоматичнаМийка = "Автоматична мийка",
    АвтоматичнаМийкаДляВантажівок = "Автоматична мийка для вантажівок",
    Азк = "АЗК",
    Електрозарядка = "Електрозарядка",
    ЗбірМакулатури = "Збір макулатури",
    ЗбірОдягу = "Збір одягу",
    ЗбірПластику = "Збір пластику",
    ЗбірСкла = "Збір скла",
    МийкаСамообслуговування = "Мийка самообслуговування",
    МініВідділенняMeestExpress = "Міні-відділення Meest-Express",
    ОбмінВалют = "Обмін валют",
    ПеленальнийСтолик = "Пеленальний столик",
    Порохотяг = "Порохотяг",
    ПоштоматНоваПошта = "Поштомат Нова пошта",
    ПідкачкаШин = "Підкачка шин",
    РесторанALaMinute = "Ресторан A la minute",
    РесторанMeiWei = "Ресторан MeiWei",
    РесторанPastaMia = "Ресторан Pasta mia",
    РучнаМийка = "Ручна мийка",
    Сто = "СТО",
    ТерміналEasyPay = "Термінал EasyPay",
    Шиномонтаж = "Шиномонтаж",
}

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface EntityType {
    id:   number;
    type: string;
}

export interface Pagination {
    total:    number;
    perPage:  number;
    next:     null;
    previous: null;
}
