let userCash = 10
let machineCash = 100

// Lets say it costs a dollar to spin the slot machine
const colors = ['black', 'white', 'green', 'yellow']
let slots = []

const chooseRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

const spinSlotMachine = () => {
  const slot1 = 'green'
  const slot2 = 'green'
  const slot3 = 'green'
  const slot4 = 'green'
  if (slot1 === slot2 === slot3 === slot4) {
    userCash --
    machineCash ++
    userCash = userCash + machineCash
  } else {
    userCash --
    machineCash ++
  }

  slots = [slot1, slot2, slot3, slot4]
  console.log(slots)
}

while (userCash > 0) {
  spinSlotMachine()
  console.log(userCash)
  console.log(machineCash)
}
