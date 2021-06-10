import { format } from 'date-fns'
import subHours from 'date-fns/subHours'

import {
  Days,
  Spekt,
  Place,
  Show,
  MappedShow,
} from './Types'


const parseMappedDays = async (spekts: Spekt[]) =>
  new Promise<Days>((res, rej) => {
    let mappedDays: Days = {}

    spekts
      ?.map((spekt: Spekt): MappedShow[] | undefined =>
        spekt?.ticketsAndSchedule?.tickets
          .map((place: Place): MappedShow[] | undefined =>
            place?.tickets
              .map((show: Show): MappedShow => {
                let datetime = show.datetime
                let dateObj = datetime === '' ? new Date() : new Date(datetime)
                
                if (datetime === '')
                  console.log(spekt, show)

                if (dateObj !== null && format(dateObj, 'HH') !== show.datetime.slice(11, 13)) {
                  dateObj = subHours(dateObj, 3)
                  datetime = format(dateObj, 'yyyy-MM-ddTHH:mm')
                }

                return ({
                  ...show,
                  link: spekt.link,
                  name: spekt.name,
                  persons: spekt.persons,
                  datetime: datetime,
                  dateObj: dateObj,
                  program: spekt.program,
                  offline: show.offline || (!show.online && !show.offline),
                  age: spekt.age,
                  shortDesc: spekt.shortDesc,
                  stage: place.venue,
                  stageEn: place.venueEn,
                  length: spekt.length,
                })
              }))
          .reduce((a: MappedShow[] | undefined, b: MappedShow[] | undefined): MappedShow[] | undefined =>
            [...(a || []), ...(b || [])])
      )
      ?.reduce((a: MappedShow[] | undefined, b: MappedShow[] | undefined): MappedShow[] | undefined =>
        [...(a || []), ...(b || [])])
      ?.filter((show: MappedShow) =>
        show.datetime.length > 0)
      ?.forEach((show: MappedShow) => {
        const day = show.datetime.split('T')[0]
        
        mappedDays.hasOwnProperty(day) ?
          mappedDays[day]?.push(show)
          :
          mappedDays[day] = [show]
      })
        
    mappedDays = Object.keys(mappedDays)
      .sort()
      .map((dayKey: string): {[key: string]: MappedShow[] | undefined} => ({[dayKey]: mappedDays[dayKey]}))
      ?.reduce((a, b) => ({...a, ...b}), {})

    res(mappedDays)
    rej({})
  })

const parseSpekts = ((spekts: Spekt[]) =>
  spekts
    ?.map((spekt: Spekt) => ({
      ...spekt,
      online: spekt.online || spekt.ticketsAndSchedule?.tickets
        ?.some((stage: Place) =>
          stage.tickets
            ?.some((show: Show) => show.online)),
      offline: spekt.offline || spekt.ticketsAndSchedule?.tickets
        ?.some((stage: Place) =>
          stage.tickets
            ?.some((show: Show) => !show.online)),
    })
  ))

const replaceSpekts = (contentfulData: any) => ({
  ...contentfulData,
  spekts: parseSpekts(contentfulData.spekts),
  homepages: [{
    ...contentfulData.homepages[0],
    main: parseSpekts(contentfulData.homepages[0].main),
    open: parseSpekts(contentfulData.homepages[0].open),
    educational: parseSpekts(contentfulData.homepages[0].educational),
  }]
})

const parseData = async (contentfulData: any) => ({
  ...replaceSpekts(contentfulData),
  mappedDays: await parseMappedDays(contentfulData.spekts),
})


export default parseData