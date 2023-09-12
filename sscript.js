let form = document.forms.todo
let input = form.querySelector('input')
let cont = document.querySelector('.container')
let todos = []
let ids = []

form.onsubmit = (e) => {
    e.preventDefault();
    
    let task = {
        id: Math.random(),
        isDone: false,
        task: input.value,
        time: new Date().getHours() + ":" + new Date().getMinutes()
    }

    if(input.value.length !== 0) {
        todos.push(task)
        reload(todos, cont)
        input.style.border = '2px solid blue'
    } else {
        input.style.border = '2px solid red'
    }

}

function reload(arr, place) {
    place.innerHTML = ""
    for(let item of arr) {
        let item_div = document.createElement('div')
        let div_top = document.createElement('div')
        let span_top = document.createElement('span')
        let span_time = document.createElement('span')
        let delete_btn = document.createElement('button')
        let edit_btn = document.createElement('button')

        item_div.classList.add('item')
        div_top.classList.add('top')
        span_time.classList.add('time')
        
        span_top.innerHTML = item.task
        span_time.innerHTML = item.time
        delete_btn.innerHTML = "x"
        edit_btn.innerHTML = "edit"
    
        place.append(item_div)
        div_top.append(span_top, edit_btn, delete_btn)
        item_div.append(div_top, span_time)   
        
        delete_btn.onclick = () => {
            todos = todos.filter(el => el.id !== item.id)
            item_div.classList.add('active')
            setTimeout(() => {
                item_div.style.display = 'none'
            }, 250)
        }

        span_top.onclick = () => {
            item.isDone = !item.isDone
            span_top.classList.add('spanTop')
            span_top.onclick = () => {
                item.isDone = !item.isDone
                span_top.classList.remove('spanTop')
                reload(todos, cont)
            }
        }

        edit_btn.onclick = () => {
            ids = ids.filter(el => el !== el)
            ids.push(item.id)
            openModal(todos, ids)
        }
    }
}

let reg = /^[a-zA-Z]+$/;


function openModal(arr, pops){
    for(let item of arr){
        for(let id of pops){
            if(item.id === id){
                let main = document.createElement('div')
                let text = document.createElement('h1')
                let inputt = document.createElement('input')
                let inptime = document.createElement('input')
                let divBtn = document.createElement('div')
                let confirm = document.createElement('button')
                let cancel = document.createElement('button')
                let divok = document.createElement('div')
        
                main.classList.add('main')
                text.classList.add('text')
                inputt.classList.add('inptt')
                divBtn.classList.add('divBtn')
                confirm.classList.add('buttonss')
                cancel.classList.add('buttonss')
                divok.classList.add('divok')
                inptime.classList.add('inptt')
        
                text.innerHTML = 'На что заменить?'
                confirm.innerHTML = 'Confirm'
                cancel.innerHTML = 'Cancel'
        
                inputt.type = 'text'
                inputt.placeholder = item.task
                inptime.type = 'time'
        
                main.append(text, divok)
                divok.append(inputt, inptime, divBtn)
                divBtn.append(confirm, cancel)
                cont.append(main)

                confirm.onclick = () => {
                    if(inputt.value === '' || inptime.value === '' || reg.test(inputt.value) === false){
                        inputt.style.border = '2px solid red'
                        inptime.style.border = '2px solid red'
                    } else if(inptime.value.slice(0, 2) <= new Date().getHours()){
                        main.remove()
                        item.task = inputt.value
                        item.time = inptime.value
                        reload(todos, cont)
                    } else {
                        alert('Время не может быть будущем!')
                    }
                }
                cancel.onclick = () => {
                    main.remove()
                }

            }
        }
    }   
}
