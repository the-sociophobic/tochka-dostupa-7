import Play from './Play'
import Show from './Show'
import Festival from './Festival'
import FestivalPlayRelation from './FestivalPlayRelation'
import FestivalPlayRelationType from './FestivalPlayRelationType'
import Sponsor from './Sponsor'
import SponsorPlayRelation from './SponsorPlayRelation'
import SponsorPlayRelationType from './SponsorPlayRelationType'
import Person from './Person'
import PersonPlayRelation from './PersonPlayRelation'
import PersonPlayRelationType from './PersonPlayRelationType'
import User from './User'
import TelegramUser from './TelegramUser'
import VkUser from './VkUser'
import InstUser from './InstUser'

import SpektCard from '../../Views/Cards/SpektCard'
import DefaultCard from '../../Views/Cards/DefaultCard'


const modelsDesc = [
  {
    label: 'Спект',
    name: 'Play',
    model: Play,
    Card: SpektCard,
  },
  {
    label: 'Показ Спекта',
    name: 'Show',
    model: Show,
    Card: DefaultCard,
  },
  {
    label: 'Фестиваль',
    name: 'Festival',
    model: Festival,
    Card: DefaultCard,
  },
  {
    label: 'Фестиваль + Спект',
    name: 'FestivalPlayRelation',
    model: FestivalPlayRelation,
    Card: DefaultCard,
  },
  {
    label: 'Фестиваль + Спект (название программы)',
    name: 'FestivalPlayRelationType',
    model: FestivalPlayRelationType,
    Card: DefaultCard,
  },
  {
    label: 'Спонсор',
    name: 'Sponsor',
    model: Sponsor,
    Card: DefaultCard,
  },
  {
    label: 'Спонсор + Спект',
    name: 'SponsorPlayRelation',
    model: SponsorPlayRelation,
    Card: DefaultCard,
  },
  {
    label: 'Спонсор + Спект (тип спонсорства)',
    name: 'SponsorPlayRelationType',
    model: SponsorPlayRelationType,
    Card: DefaultCard,
  },
  {
    label: 'Человек-участник',
    name: 'Person',
    model: Person,
    Card: DefaultCard,
  },
  {
    label: 'Человек + Спект',
    name: 'PersonPlayRelation',
    model: PersonPlayRelation,
    Card: DefaultCard,
  },
  {
    label: 'Человек + Спект (роль: режик / актёр и тд)',
    name: 'PersonPlayRelationType',
    model: PersonPlayRelationType,
    Card: DefaultCard,
  },
  {
    label: 'Пользователь сайта',
    name: 'User',
    model: User,
    Card: DefaultCard,
  },
  {
    label: 'Телеграмный акк',
    name: 'TelegramUser',
    model: TelegramUser,
    Card: DefaultCard,
  },
  {
    label: 'вк акк',
    name: 'VkUser',
    model: VkUser,
    Card: DefaultCard,
  },
  {
    label: 'инстовый акк',
    name: 'InstUser',
    model: InstUser,
    Card: DefaultCard,
  },
]
.map(model => ({
  ...model,
  model: model.model.attributes,
  name: model.name.toLowerCase()
}))


export default modelsDesc