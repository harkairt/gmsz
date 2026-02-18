export interface Definition {
  term: string;
  definition: string;
  details?: string;
}

export interface PlanningStep {
  step: string;
  description: string;
}

export const alapfogalmak: Definition[] = [
  {
    term: "Entitás",
    definition: "Bármi, amiről gondolkodsz",
    details: "Ember, tárgy, projekt, ötlet – mindegy. Ha tudsz róla beszélni, az entitás. Bontható kisebbre, része valami nagyobbnak.",
  },
  {
    term: "Attribútum",
    definition: "Az entitás jellemzője",
    details: "Szín, méret, állapot, prioritás – bármi, ami leírja az entitást. A változás kulcsa: tudd, melyik attribútumra figyelsz.",
  },
  {
    term: "Aktivitás",
    definition: "Két entitás találkozásából születik",
    details: "Egyedül semmi nem történik. Kell két szereplő: ember + eszköz, gondolat + tett, te + a feladat.",
  },
  {
    term: "Relevancia",
    definition: "Hatással van rá, vagy nincs",
    details: "Ha A nem képes változtatni B-n, akkor nem relevánsak egymásnak. Szűrd ki a zajt – csak a lényeges kapcsolatokkal foglalkozz.",
  },
  {
    term: "Cél",
    definition: "Hova akarod eljuttatni az attribútumot",
    details: "Nem vágy, hanem konkrétum: melyik entitás, melyik jellemzője, milyen új értékre. A jó cél: 2R – Reális és Releváns.",
  },
  {
    term: "Feladat",
    definition: "Cél elérése érdekében végzett aktivitás",
    details: "A feladat az aktivitások láncolata, ahol minden lépés közelebb visz a célhoz. Entitástól entitásig, amíg el nem éred a kívánt állapotot.",
  },
];

export const sprintTervezes: PlanningStep[] = [
  {
    step: "Célmeghatározás",
    description: "Sprint goal definiálása - mit akarunk elérni a következő iterációban?",
  },
  {
    step: "Adatgyűjtés",
    description: "User testing eredmények, analytics adatok, stakeholder visszajelzések összegyűjtése.",
  },
  {
    step: "Elemzés",
    description: "Churn ratio vizsgálata, Product vision alignment.",
  },
  {
    step: "Minőségbiztosítás",
    description: "Product Owner konszenzus elérése tennivalókról, prioritási sorrendről",
  },
  {
    step: "Tevékenységek meghatározása",
    description: "Refinement, design review, feasibility check, kapacitástervezés.",
  },
  {
    step: "Erőforrások",
    description: "Feladatok hozzárendelése, csapattagok kijelölése, eszközök biztosítása.",
  },
  {
    step: "Controlling",
    description: "Daily standup, JIRA board frissítés, burndown chart követés.",
  },
  {
    step: "Véglegesítés",
    description: "Team commitment, sprint backlog lezárása, kickoff.",
  },
];

export const storyTervezes: PlanningStep[] = [
  {
    step: "Célmeghatározás",
    description: "User voice – a felhasználó szemszögéből fogalmazzuk meg a story célját.",
  },
  {
    step: "Adatgyűjtés & Elemzés",
    description: "Implementációs variánsok felderítése => trade-off-ok mérlegelése.",
  },
  {
    step: "Minőségbiztosítás",
    description: "A PO egyeztet a fejlesztőkkel.",
  },
  {
    step: "Tevékenységek meghatározása",
    description: "Subtask-ok definiálása, illetve azok életciklusának meghatározása.",
  },
  {
    step: "Erőforrások elosztása",
    description: "Feladatok kiosztása (assign) a csapattagok között.",
  },
  {
    step: "Controlling & Monitoring",
    description: "Daily standup status report, JIRA board naprakészen tartása.",
  },
  {
    step: "Minőségbiztosítás (jóváhagyás)",
    description: "Scrum team approval – a csapat jóváhagyja, hogy készen áll a fejlesztésre.",
  },
  {
    step: "Célpontosítás",
    description: "Acceptance criteria meghatározása → Definition of Done.",
  },
  {
    step: "Véglegesítés",
    description: "A story átkerül 'Ready for development' státuszba.",
  },
];

export const kockazatKezeles = {
  title: "Kockázatkezelés folyamata",
  steps: [
    "Terv elemzése - a célok és tevékenységek áttekintése",
    "Horizontális kockázatok listázása - párhuzamos folyamatok veszélyei",
    "Vertikális kockázatok listázása - függőségi lánc problémái",
    "Iteráció a kockázatok csökkentésére - priorizálás és kezelés",
    "Költség-haszon elemzés - mibe kerül a megelőzés vs. a bekövetkezés?",
    "Külön terv a nem integrálható kockázatokra - B terv készítése",
  ],
  matrix: {
    title: "Kockázatfeltáró mátrix",
    description: "Az entitások és attribútumok mátrixa segít azonosítani a potenciális kockázati pontokat.",
  },
};

export const homeContent = {
  title: "Gondolkodás módszertana",
  subtitle: "A SCRUM és szoftverfejlesztés kontextusában",
};
