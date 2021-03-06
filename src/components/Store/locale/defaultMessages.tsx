interface Messages {
  [key: string]: (string | JSX.Element)[] | undefined | any
}

const defaultMessages: Messages = {
  AccessPoint: ["Точка доступа", "Access point"],
  
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

  Error404: {
    line1: ['Ой, кажется', 'Wow, looks like'],
    line2: ['такой страницы', 'this page'],
    line3: ['не существует', `doesn't exist`],
    return: ['Вернуться на главную', 'Back to homepage'],
  },

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
        Средняя Подьяческая 2,<br />
        офис 302
      </>,
      <>
        191023, Saint-Petersbourg,<br />
        Srednyaya Pod'yacheskaya 2,<br />
        office number 302
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
    keyvisual: {
      name: [<>Международный летний<br />фестиваль искусств</>, <>International summer<br />festival of arts</>],
      dates: ['8-26 июля 2021', 'June 8-26 2021'],
      tickets: ['билеты в продаже', 'tickets on sale'],
    },
    subscribe: {
      newsletter: ['рассылка', 'newsletter'],
      desc: ['ненавязчиво расскажем о важном на фестивале и в современном театре', 'learn everything about contemporary theatre'],
      placeholder: ['Ваш email', 'Your email'],
      submit: ['подписаться', 'subscribe'],
      submitLoading: ['подписываем', 'subscribing'],
      submitDone: ['готово!', 'done!'],
      submitError: ['ошибка((', 'error(('],
      // submitWrong: ['ошибка((', 'error(('],
    },
    festivalPass: {
      1: ['абонемент', 'season ticket'],
      2: ['абонемент', 'season ticket'],
      desc: ['Единый билет на события фестиваля', 'Single ticket for festival events'],
      price: ['6 000 рублей', '6 000 roubles'],
      buy: ['купить', 'buy'],
    },
    Laba: {
      name: ['Лаборатория', 'Laboratory'],
      datetime: ['Ивангород / 5-11 июня 2021', 'Ivangorod / 5-11 June 2021'],
    }
  },

  Program: {
    name: ['программа', 'program'],
    full: ['Вся программа', 'Full program'],
    more: ['Подробнее', 'More details'],

    pages: {
      Main: {
        name: ["Основная", "Main"],
      },
      Open: {
        name: ["Свободная", "Flow"],
      },
      Educational: {
        name: ["Просветительская", "Educational"],
      },
      Friends: {
        name: ["Проекты наших друзей", "Our friends projects"],
      },
    },

    readText: ["Читать текст", "Read text"],
    hideText: ["Назад", "Back"],
    startAt: ["Начало в", "Start at"],
  },
  Schedule: {
    name: ["Расписание", "Schedule"],

    filter: ['Фильтр', 'Filter'],
    eventType: ['Тип события', 'Event type'],
    dates: ['Даты', 'Dates'],
    download: ['Скачать расписание в pdf', 'Download schedule as pdf'],
    downloadDesc: ['Отфильтруйте только интересующие вас события и скачайте их в формате pdf', 'Filter events you are interested in and download as pdf'],
    cleanFilter: ['Очистить фильтр', 'Clear filter'],
    loadPrev: ['Загрузить предыдущие', 'Load older events'],
    apply: ['Применить', 'Apply'],
    msk: ['мск', '(GMT+3)'],
    register: ['Регистрация', 'Register'],
    buy: ['Купить билет', 'Buy ticket'],
    nothing: ['Событий в выбранный промежуток нет', 'No events during this dates'],
    pdfFileName: ['Точка доступа расписание за', 'Access point 2021 schedule for'],
    festivalPassDesc: ['Единый выгодный способ попасть на события фестиваля', 'Best way to visit all festival events'],
    a: ['', ''],
  },
  Festival: {
    name: ['Фестиваль', 'Festival'],

    pages: {
      About: {
        name: ["О Фестивале", "About"],
        
        pages: {
          Projects: {
            name: ["Проекты Фестиваля", "Projects"],
          },
          Reviews: {
            name: ["Отзывы и публикации", "Reviews & publications"],
          },    
        }
      },
      QandA: {
        name: ["Вопрос-Ответ", "Q&A"],
      },
      Accreditation: {
        name: ["Аккредитация", "Accreditation"],
        details: ['Скачать реквизиты', 'Download details'],
        presskit: ['Пресс-кит', 'Press-kit']
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
  Volunteers: {
    name: ["Волонтёры", "Volunteers"],
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
    credits: ['Создание проекта', 'Credits'],
    sponsor: ['При поддержке', 'Sponsor'],
    howToOnline: ['Как это будет онлайн?', 'Tickets'],
    howToOffline: ['Как это будет офлайн?', 'Tickets'],
    instructions: ['Инструкция для зрителей', 'Instructions'],
    performanceTeam: ['Команда проекта', 'Project team'],
    buy: ['Расписание', 'Tickets'],
    buyAnchor: ['Билеты и расписание', 'Tickets & schedule'],
    showAllShows: ['Показать ещё...', 'More shows...'],
    FestivalPass: {
      desc: [<>Скидка 35% на все билеты<br />по промокоду</>, <>35% discount with<br />promocode</>],
      more: ['Подробнее', 'Learn more'],
      tooltip: ['промокод скопирован', 'promocode copied'],
      noReturns: ['Вернуть билет, купленный по промокоду, можно только при отмене мероприятия, в случае болезни зрителя и в случаях, предусмотренных законом', 'You can return a ticket purchased using a promotional code only if the event is canceled and in cases provided for by law']
    }
  },

  DatePicker: {
    day: ['день', 'day'],
    month: ['месяц', 'month'],
    year: ['год', 'year'],
  }
}


export default defaultMessages