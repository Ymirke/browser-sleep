function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const sleepInput = document.getElementById('sleep-time')
const sleepInTimer = document.getElementById('sleep-in-timer')
const sleepIn = document.getElementById('sleep-in')

class TimeController {
  timers = []
  timeLeft

  setTimeLeft(timeLeft) {
    this.timeLeft = timeLeft
  }

  getTimeLeft() {
    return Math.ceil(
      (timers[0]._idleStart + timers[0]._idleTimeout - Date.now()) / 1000,
    )
  }

  setTimers(ms) {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach((tab) => {
        const id = tab.id

        chrome.scripting.executeScript({
          target: { allFrames: true, tabId: id },
          args: [ms],
          func: (ms) => {
            const video = document.querySelectorAll('video')
            const audio = document.querySelectorAll('audio')

            const allElements = [...video, ...audio]

            const timers = allElements.map((node) => {
              setTimeout(() => node.pause(), ms)
            })

            this.timers = timers
          },
        })
      })
    })
  }

  clearTimers() {
    this.timers.forEach((timer) => clearTimeout(timer))
  }
}

const timeController = new TimeController()

const options = [
  { ms: 3000, label: '3 seconds' },
  { ms: 300000, label: '5 minutes' },
  { ms: 420000, label: '7 minutes' },
  { ms: 600000, label: '10 minutes' },
  { ms: 900000, label: '15 minutes' },
  { ms: 1200000, label: '20 minutes' },
  { ms: 1800000, label: '30 minutes' },
  { ms: 2700000, label: '45 minutes' },
  { ms: 3600000, label: '60 minutes' },
]

function addOptions() {
  const optionsSection = document.getElementById('sleep-options')

  options.forEach((option) => {
    const button = document.createElement('button')
    button.textContent = option.label
    button.classList.add('sleep-option')

    optionsSection.appendChild(button)
    button.addEventListener('click', () => {
      console.log(`Sleeping in ${option.ms}`);
      timeController.setTimers(option.ms)
    })
  })
}
addOptions()
