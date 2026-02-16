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
    definition: "Logikailag összetartozó adatok halmaza",
    details: "Bármi, amiről gondolkodunk. Az entitás lehet fizikai (ember, termék) vagy absztrakt (projekt, sprint).",
  },
  {
    term: "Attribútum",
    definition: "Valami valamilyen",
    details: "Az entitás tulajdonságai, amelyek leírják annak állapotát. Például egy Story attribútumai: prioritás, becslés, státusz.",
  },
  {
    term: "Aktivitás",
    definition: "Két entitás interakciójában aktivitás jön létre",
    details: "Az aktivitás mindig két entitás kölcsönhatásából származik. A fejlesztő és a kód interakciója aktivitást eredményez.",
  },
  {
    term: "Relevancia",
    definition: "Két entitás releváns, ha az egyik képes megváltoztatni a másik attribútumát",
    details: "A releváns kapcsolatok feltérképezése kulcsfontosságú a tervezésben és a kockázatelemzésben.",
  },
  {
    term: "Cél",
    definition: "Egy entitás attribútumának kívánt értéke",
    details: "A célnak 2R-nek kell lennie: Reális (elérhető) és Releváns (kapcsolódik a fő célhoz).",
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
    description: "ROI elemzés, implementációs variánsok vizsgálata, trade-off-ok mérlegelése.",
  },
  {
    step: "Minőségbiztosítás",
    description: "Product Owner konszenzus elérése, prioritások validálása.",
  },
  {
    step: "Tevékenységek",
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
    step: "User Voice",
    description: "A felhasználó szemszögéből fogalmazzuk meg: 'Mint [szerep], szeretném [cél], hogy [érték].'",
  },
  {
    step: "Churn Rate elemzés",
    description: "Mekkora a lemorzsolódás, ha nem oldjuk meg? Mi a költsége a nem-cselekvésnek?",
  },
  {
    step: "Subtask életciklus",
    description: "Feladatok lebontása, függőségek feltérképezése, párhuzamosítási lehetőségek.",
  },
  {
    step: "Acceptance Criteria",
    description: "Definition of Done kritériumok: mikor tekintjük késznek a story-t?",
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
  author: "Drégelyi Zoltán könyve alapján",
  presenter: {
    name: "[NÉV]",
    profession: "[SZAKMA]",
    role: "[MUNKAKÖR]",
  },
  intro: "Ez a prezentáció a gondolkodás módszertanának gyakorlati alkalmazását mutatja be a szoftverfejlesztés és agilis projektmenedzsment területén.",
};
