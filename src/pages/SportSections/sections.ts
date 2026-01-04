import whiteBasketshieldImg from "../../images/white-basketshield.jpg";
import cheerlidingImg from "../../images/cheerliding.png";
import footballGatesImg from "../../images/футбольшие_ворота_аватар.jpg";

export interface ISection {
    image: string;
    title: string;
    description: string;
}

export interface ISectionDescription extends ISection {
    trainerPhone: string;
    trainerName: string;
    age: string;
    lessonArr: string[];
}

export interface ISectionParent extends ISection {
    child: ISectionDescription[];
    adult: ISectionDescription[];
}

export type ISectionsList = ISectionParent[];

const adultSigma: ISectionDescription = {
    image: footballGatesImg,
    title: "ФК Сигма",
    description: `Футбол — командный вид спорта, в котором целью является забить мяч в ворота соперника
    ногами или другими частями тела (кроме рук) большее количество раз, чем команда соперника. В настоящее
    время самый популярный и массовый вид спорта в мире`,
    age: "7 - 18 лет",
    lessonArr: [
        "Пн: 14:00 - 16:00",
        "Ср: 17:00 - 19:00",
        "Пт: 16:00 - 18:00"
    ],
    trainerName: "Иванов Иван Иванович",
    trainerPhone: "8-912-315-90-71"
};

const childJunior: ISectionDescription = {
    image: footballGatesImg,
    title: "ФК Сигма",
    description: `Футбол — командный вид спорта, в котором целью является забить мяч в ворота соперника
    ногами или другими частями тела (кроме рук) большее количество раз, чем команда соперника. В настоящее
    время самый популярный и массовый вид спорта в мире`,
    age: "7 - 18 лет",
    lessonArr: [
        "Пн: 14:00 - 16:00",
        "Ср: 17:00 - 19:00",
        "Пт: 16:00 - 18:00"
    ],
    trainerName: "Иванов Иван Иванович",
    trainerPhone: "8-912-315-90-71"
};

const basketball: ISectionParent = {
    image: whiteBasketshieldImg,
    title: "Баскетбол",
    description: `Баскетбол - это зрелищный и динамичный вид спорта,
    который позволяет улучшить координацию движений, выносливость и силу.
    Наша спортивная секция предоставляет возможность заняться баскетболом в
    командном формате, что позволяет развить такие навыки, как взаимодействие и
    командный дух. В нашей секции мы работаем со спортсменами всех возрастов и
    уровней подготовки, начиная с начинающих и заканчивая профессионалами. Наш
    тренерский состав помогает каждому участнику максимально эффективно использовать
    свой потенциал и достигнуть новых высот в баскетбольной карьере.`,
    adult: [],
    child: []
};

const cheerleading: ISectionParent = {
    image: cheerlidingImg,
    title: "Черлидинг",
    description: `Черлидинг - это командный вид спорта, который объединяет в себе
    элементы танца, акробатики и гимнастики. Наша секция черлидинга поможет вам
    развить гибкость, координацию и силу, а также научит вас работать в команде и
    поддерживать свою команду на матчах и соревнованиях. Мы принимаем в нашей секции
    девочек и молодых женщин всех возрастов и уровней подготовки, начиная с начинающих
    и заканчивая профессионалами. Наш тренерский состав является опытными профессионалами
    в своей области и помогает каждому участнику развиваться и достигать своих спортивных целей.`,
    child: [],
    adult: []
};

const volleyball: ISectionParent = {
    image: footballGatesImg,
    title: "Воллейбол",
    description: `Воллейбол - это командный вид спорта, который объединяет в себе
    элементы танца, акробатики и гимнастики. Наша секция черлидинга поможет вам
    развить гибкость, координацию и силу, а также научит вас работать в команде и
    поддерживать свою команду на матчах и соревнованиях. Мы принимаем в нашей секции
    девочек и молодых женщин всех возрастов и уровней подготовки, начиная с начинающих
    и заканчивая профессионалами. Наш тренерский состав является опытными профессионалами
    в своей области и помогает каждому участнику развиваться и достигать своих спортивных целей.`,
    child: [],
    adult: []
};

const football: ISectionParent = {
    image: footballGatesImg,
    title: "Футбол",
    description: `Футбол — командный вид спорта, в котором целью является забить мяч в ворота соперника
    ногами или другими частями тела (кроме рук) большее количество раз, чем команда соперника. В настоящее
    время самый популярный и массовый вид спорта в мире`,
    child: [childJunior],
    adult: [adultSigma]
};

const SECTION_LIST: ISectionsList = [
    basketball, cheerleading, football, volleyball
];

export function getSectionList(): ISectionsList {
    return SECTION_LIST;
}

export function getSelectedSportSectionList(sport: string, age: string): ISectionDescription[] | undefined {
    const sportSections = SECTION_LIST.find((value) => value.title === sport);
    if (!sportSections) return undefined;
    if (age === "child") return sportSections.child;
    else if (age === "adult") return sportSections.adult;
    else return undefined;
}
