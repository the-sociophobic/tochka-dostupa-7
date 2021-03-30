const plays = [
  {
    name: ["Игрушки Люшера. Психотерапевтическая утопия", "Lusher Toys"],
    makers: [["Артём Арсенян", "Artyom Arsenyan"], ["Коля Филиппов", "Nick Filippov"], ["Филипп Вулах", "Filipp Vulakh"], ["Ольга Аршанская", "Olga Arshanskaya"], ["Леф Васильев", "Lef Vasilyev"]],
    shortDesc: [
      "Краткое описание в две-три строки. Краткое описание в две-три строки. Краткое описание в две-три строки. А может быть и в четыре строки, если вообще не понятно что это такое",
      "Short desc, 2-3 lines blah blah blah СВОБОДУ ПОЛИТЗАКЛЮЧËННЫМ"
    ],
    offline: true,
    online: true,
    age: 18,
    cover: "https://sun9-27.userapi.com/impf/pTfeNZgqsvqoWdJl5rvbGIJ1uhgLOL6GkvTLYQ/lrj6gocSr8E.jpg?size=1174x712&quality=96&sign=9e4e041ec0e1f0037e52e848f6cea2cb&type=album"
  },
  {
    name: ["Пожалуйста, дальше (Гамлет)", "Please continue (Hamlet"],
    makers: [["Илья Мощицкий", "Ilya Moschitsky"], ["Антон Томилин", "Anton Tomilin"]],
    shortDesc: [
      "a a a a a",
      "0 o 0 o 0"
    ],
    offline: true,
    online: true,
    age: 16,
    cover: "https://sun9-72.userapi.com/impf/q9M4iZesQriML4OC8_fHowIInjlzy-IM0kDYRQ/lin_ihJTt2E.jpg?size=1174x712&quality=96&sign=88113f9774c002b06b05c492e6111bbc&type=album"
  },
  {
    name: ["Игрушки Люшера. Психотерапевтическая утопия", "Lusher Toys"],
    makers: [["Артём Арсенян", "Artyom Arsenyan"], ["Коля Филиппов", "Nick Filippov"], ["Филипп Вулах", "Filipp Vulakh"], ["Ольга Аршанская", "Olga Arshanskaya"], ["Леф Васильев", "Lef Vasilyev"]],
    shortDesc: [
      "Краткое описание в две-три строки. Краткое описание в две-три строки. Краткое описание в две-три строки. А может быть и в четыре строки, если вообще не понятно что это такое",
      "Short desc, 2-3 lines blah blah blah СВОБОДУ ПОЛИТЗАКЛЮЧËННЫМ"
    ],
    offline: true,
    online: true,
    age: 18,
    cover: "https://sun9-27.userapi.com/impf/pTfeNZgqsvqoWdJl5rvbGIJ1uhgLOL6GkvTLYQ/lrj6gocSr8E.jpg?size=1174x712&quality=96&sign=9e4e041ec0e1f0037e52e848f6cea2cb&type=album"
  },
].map(item => ({
  ...item,
  link: `/spekt/${item.name[1].replace(/ /g, '-').replace(/\(|\)/g, '')}`,
  makers: item.makers.map(maker => ({
    name: [maker[0].split(' ')[0], maker[1].split(' ')[0]],
    surname: [maker[0].split(' ')[1], maker[1].split(' ')[1]],
    link: `/person/${maker[1].replace(/ /g, '-')}`
  }))
}))


export default plays