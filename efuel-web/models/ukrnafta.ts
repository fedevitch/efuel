export interface UkrnaftaStation {
    id:          string;
    area_id:     string;
    addr:        string;
    brand:       Brand;
    a95e:        string;
    a95:         string;
    a92:         string;
    a90:         string;
    a80:         string;
    dt:          string;
    dte:         string;
    gas:         string;
    a92e:        string;
    e95s:        string;
    lat:         string;
    lon:         string;
    region_id:   string;
    region_name: RegionName;
    image:       string;
    services:    string[];
}

export enum Brand {
    Anp = "ANP",
    Rubіx = "Rubіx",
    SentosaOіl = "Sentosa Oіl",
    Авіас = "АВІАС",
    АвіасПлюс = "АВІАС ПЛЮС",
    Знп = "ЗНП",
    Мавекс = "МАВЕКС",
    ПетролГарант = "Петрол Гарант",
    Укрнафта = "УКРНАФТА",
    Укртатнафта = "УКРТАТНАФТА",
    Элин = "ЭЛИН",
    ЮКОНСервіс = "ЮКОН Сервіс",
    Юкон = "ЮКОН",
}

export enum RegionName {
    ІваноФранківська = "Івано-Франківська",
    Волинська = "Волинська",
    Вінницька = "Вінницька",
    Дніпропетровська = "Дніпропетровська",
    Донецька = "Донецька",
    Житомирська = "Житомирська",
    Закарпатська = "Закарпатська",
    Запорізька = "Запорізька",
    Київська = "Київська",
    Кіровоградська = "Кіровоградська",
    Луганська = "Луганська",
    Львівська = "Львівська",
    Миколаївська = "Миколаївська",
    Одеська = "Одеська",
    Полтавська = "Полтавська",
    Рівненська = "Рівненська",
    Сумська = "Сумська",
    Тернопільська = "Тернопільська",
    Харківська = "Харківська",
    Херсонська = "Херсонська",
    Хмельницька = "Хмельницька",
    Черкаська = "Черкаська",
    Чернівецька = "Чернівецька",
    Чернігівська = "Чернігівська",
}