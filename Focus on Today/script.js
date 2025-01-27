const checkBoxList = document.querySelectorAll('.circle-checkbox')
const inputList = document.querySelectorAll('.firstGoal')
const error = document.querySelector('.warning')
const progressValue = document.querySelector('.progress-complete')
const completedValue = document.querySelector('.progress-complete span')
const progressLabel = document.querySelector('.progress-label')


let labelValue = ['Raise the bar by completing your goals!',
    'Well begin is half done!', 'Just a step away keep going!',
    'Whoa! You just completed all the goals, time to chill 😎']

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        goal: "",
        completed: false
    },
    second: {
        goal: "",
        completed: false
    },
    third: {
        goal: "",
        completed: false
    }
}
let completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length
progressValue.style.maxWidth = `${completedGoals / 3 * 100}%`
progressValue.firstElementChild.innerText = `${completedGoals}/3 Completed`
completedValue.style.visibility = "visible"
progressLabel.innerText = labelValue[completedGoals]


checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
        let checkinputFields = [...inputList].every((input) => {
            return input.value
        })
        if (checkinputFields) {
            checkbox.parentElement.classList.toggle('completed')
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoals = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.maxWidth = `${completedGoals / 3 * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoals}/3 Completed`
            progressLabel.innerText = labelValue[completedGoals]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else {
            error.parentElement.classList.add('show-warning')
        }
    })
})
inputList.forEach((input) => {
    input.value = allGoals[input.id].goal;

    if (allGoals[input.id].completed) {
        input.parentElement.classList.add('completed')
    }

    input.addEventListener('focus', () => {
        error.parentElement.classList.remove('show-warning')
    })
    input.addEventListener('input', (e) => {
        if (allGoals[input.id].completed) {
            input.value = allGoals[input.id].goal
            return
        }
        allGoals[input.id].goal = input.value
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})