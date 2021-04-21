interface Messages {
  [key: string]: (string | JSX.Element)[] | undefined | any
}

const defaultMessages: Messages = {
  AccessPoint: ["Точка Доступа", "Access Point"],
  
  locale: {
    rus: ["Rus", "Rus"],
    eng: ["Eng", "Eng"],
  },
  login: ["Вход", "Login"],

  online: ["Онлайн", "Online"],
  offline: ["Оффлайн", "Offline"],

  Vkontakte: ['Вконтакте', 'Vkontakte'],
  Facebook: ['Фейсбук', 'Facebook'],
  Instagram: ['Инстаграм', 'Instagram'],
  Youtube: ['Ютьюб', 'Youtube'],

  User: {
    
    pages: {
      Tickets: {
        name: ["Мои события", "My events"],
      },
      Admin: {
        name: ["Админка", "Admin"],
      },
      Settings: {
        name: ["Настройки", "Settings"],
      },
      logout: ["Выход", "Log out"],
    }
  },

  Footer: {
    media: ['медиа', 'media'],

    address: [
      <>
        191023, Санкт-Петербург,<br />
        Малая Садовая ул., д. 6,<br />
        офис 30-1
      </>,
      <>
        191023, Saint-Petersbourg,<br />
        Malaya Sadovaya st., 6,<br />
        office number 30-1
      </>
    ],

    disclaimer: [
      <>
        Публикация о проекте «New Technologies and Innovation in Theatre» (Новые Технологии и Инновации в Театре) подготовлена при финансовой поддержке Программы приграничного сотрудничества «Россия-Эстония» на период 2014—2020 годов. Содержание данной публикации является исключительной ответственностью АНКПО «Литературное Агентство Петербурга» и ни в коей мере не является отражением позиции стран-участниц Программы и Европейского Союза.
        <br /><br />
        Подробнее о программе: Сайт программы / Европейская политика соседства / Министерство экономического развития РФ / Министерство экономики Эстонии 
      </>,
      <>
        The publication about the project «New Technologies and Innovation in Theater» was prepared with the financial support of the «Russia-Estonia» Cross-Border Cooperation Program for the period 2014-2020. The content of this publication is the sole responsibility of autonomous non-profit cultural educational organization «Литературное Агентство Петербурга» and in no way reflects the position of the countries participating in the Program and the European Union.
        <br /><br />
        More information about the program: Program website / European Neighborhood Policy / Ministry of Economic Development of the Russian Federation / Ministry of Economy of Estonia
      </>
    ],
  },

  Home: {
    info: [
      "Международный Летний фестиваль искусств «Точка доступа» — крупнейший форум сайт-специфического и иммерсивного искусства в России, он проводится в Петербурге с 2015 года. «Точка доступа» всегда исследует новые территории театра и предлагает зрителю новый опыт восприятия и коммуникации с пространством. Резиденты и гости «Точки доступа» — российские и зарубежные режиссеры — осваивают локации, обычно ничего общего с театром не имеющие, и одновременно знакомят зрителей с прогрессивным, смелым и актуальным искусством.",
      "The Access Point International Summer Festival of Arts is the largest forum of site-specific and immersive art in Russia; it has been held in St. Petersburg since 2015. The Access Point is always exploring new territories of the theater and offers the viewer a new experience of perception and communication with the space. Residents and guests of «Access Point» - Russian and foreign directors - explore locations that usually have nothing to do with the theater, and at the same time acquaint viewers with progressive, bold and contemporary art."
    ],
  },

  Program: {
    name: ['Программа', 'Program'],
    full: ['Вся программа', 'Full program'],

    pages: {
      Main: {
        name: ["Основная", "Main"],
      },
      Open: {
        name: ["Свободная", "Open"],
      },
      Educational: {
        name: ["Образовательная", "Educational"],
      },
    },

    readText: ["Читать текст", "Read text"],
    hideText: ["Свернуть", "Hide"],
  },
  Schedule: {
    name: ["Расписание", "Schedule"],

    filter: ['Фильтр', 'Filter'],
    eventType: ['Тип события', 'Event type'],
    dates: ['Даты', 'Dates'],
    download: ['Скачать расписание в pdf', 'Download schedule as pdf'],
    downloadDesc: ['Отфильтруйте только интересующие вас события и скачайте их в формате pdf', 'Filter events you are interested in and download as pdf'],
    cleanFilter: ['Отчистить фильтр', 'Clear filter'],
    loadPrev: ['Загрузить предыдущие', 'Load older events'],
    apply: ['Применить', 'Apply'],
    msk: ['мск', 'moscow-time'],
    register: ['Регистрация', 'Register'],
    buy: ['Купить билет', 'Buy ticket'],
    a: ['', ''],
  },
  Festival: {
    name: ['Фестиваль', 'Festival'],

    pages: {
      About: {
        name: ["О Фестивале", "About"],
      },
      QandA: {
        name: ["Вопрос-Ответ", "Q&A"],
      },
      Accreditation: {
        name: ["Аккредитация", "Accreditation"],
      },
      Projects: {
        name: ["Проекты Фестиваля", "Projects"],
      },
      Archive: {
        name: ["Архив", "Archive"],
        site: ["Сайт", "Site"],
        booklet: ["Буклет", "Booklet"],
      },
      Contacts: {
        name: ["Контакты", "Contacts"],
      },
    },
  },

  Privacy: {
    name: ["Политика конфиденциальности", "Privacy"],
  },
  Details: {
    name: ["Реквизиты", "Details"],
  },

  
  Login: {
    name: ["Вход", "Login"],
    main: {
      h2: ["Личный кабинет", "Your Account"],

    }
  },

  Spekt: {
    length: ['Продолжительность', 'Length'],
    stage: ['Локация / платформа', 'Stage / location'],
    sponsor: ['При поддержке', 'Sponsor'],
    howToOnline: ['Как это будет онлайн?', 'Tickets'],
    howToOffline: ['Как это будет офлайн?', 'Tickets'],
    instructions: ['Инструкция для зрителей', 'Instructions'],
    buy: ['Купить билет', 'Tickets'],
  },

  DatePicker: {
    day: ['день', 'day'],
    month: ['месяц', 'month'],
    year: ['год', 'year'],
  }
}


export default defaultMessages