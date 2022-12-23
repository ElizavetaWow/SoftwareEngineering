const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let personId = 100
fetch(`/personemployee/emp?id=` + id)
    .then((response) => response.json())
    .then((data) => {
        data = JSON.parse(data)
        personId = data.person_personid
    }).then(() => {
        fetch(`/person?id=` + personId)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data)
                let td = document.querySelector("#name").querySelectorAll("td");
                td[2].textContent = data.name
                td = document.querySelector("#email").querySelectorAll("td");
                td[1].textContent = data.email
                td = document.querySelector("#workphonenumber").querySelectorAll("td");
                td[1].textContent = data.workphonenumber
                td = document.querySelector("#personalphonenumber").querySelectorAll("td");
                td[1].textContent = data.personalphonenumber
                td = document.querySelector("#comment").querySelectorAll("td");
                td[1].textContent = data.comment

            });
        fetch(`/employee?id=` + id)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data)
                fetch(`/grade?id=` + data.grade_gradeid)
                    .then((response) => response.json())
                    .then((data) => {
                        data = JSON.parse(data)
                        let td = document.querySelector("#grade").querySelectorAll("td");
                        td[1].textContent = data.name
                    })
            });
        fetch(`/personskill/${personId}`)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data)
                data.forEach((skill) => {
                    const body = document.querySelector("#skills").querySelector("ul");
                    const template = document.querySelector('#skill');
                    const clone = template.content.cloneNode(true);
                    clone.querySelector("li").innerText = skill.name;
                    clone.querySelector("li").title = skill.description;
                    body.appendChild(clone);
                });
            });
        fetch(`/projectrecord/person?id=` + id)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data)
                data.forEach(async (projectrecord) => {
                    const tbody = document.querySelector("#projects").querySelector("tbody");
                    const template = document.querySelector('#projectrow');

                    const clone = template.content.cloneNode(true);
                    let td = clone.querySelectorAll("td");
                    td[1].textContent = new Date(projectrecord.start_date).toLocaleDateString("ru-RU");
                    td[2].textContent = new Date(projectrecord.end_date).toLocaleDateString("ru-RU");
                    td[3].textContent = projectrecord.hoursperweek;
                    let projectResult = await fetch(`/project?id=` + projectrecord.project_projectid)
                        .then((response) => { return response.json() })
                    td[0].textContent = JSON.parse(projectResult).name
                    tbody.appendChild(clone)

                });


            });
        fetch(`/leave/person?id=` + id)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data)

                data.forEach(async (leave) => {
                    const tbody = document.querySelector("#leaves").querySelector("tbody");
                    const template = document.querySelector('#leaverow');
                    const clone = template.content.cloneNode(true);
                    let td = clone.querySelectorAll("td");
                    let isvacationText = ""
                    if (leave.isvacation) isvacationText = "Отпуск"
                    else isvacationText = "Больничный";
                    td[0].textContent = isvacationText;
                    td[1].textContent = new Date(leave.start_date).toLocaleDateString("ru-RU");
                    td[2].textContent = new Date(leave.end_date).toLocaleDateString("ru-RU");


                    tbody.appendChild(clone)

                });


            });
    })

function addSkill() {
    fetch("/skills/all")
        .then((response) => response.json())
        .then((data) => {
            var newWin = window.open('http://localhost:9000/dialog', 'Выбор', 'width=600,height=400');
            newWin.onload = function () {
                let inp = newWin.document.querySelector("#person")
                inp.value = personId
                let h1 = newWin.document.querySelector("h1")
                h1.textContent = "Навыки"
                let tr = document.createElement('tr');
                let th0 = document.createElement('th');
                th0.textContent = "Выбрано";
                let th1 = document.createElement('th');
                th1.textContent = "Название";
                let th2 = document.createElement('th');
                th2.textContent = "Описание";
                tr.appendChild(th0);
                tr.appendChild(th1);
                tr.appendChild(th2);
                let thead = newWin.document.querySelector("thead");
                thead.appendChild(tr);
                
                data.forEach((skill) => {
                    const tbody = newWin.document.querySelector("tbody");
                    let tr = document.createElement('tr');
                    const chb = newWin.document.querySelector("#chb").content.cloneNode(true);
                    
                    let td1 = document.createElement('td');
                    td1.textContent = skill.name;
                    let td2 = document.createElement('td');
                    td2.textContent = skill.description;
                    tr.appendChild(chb);
                    tr.appendChild(td1);
                    tr.appendChild(td2);

                    tbody.appendChild(tr);

                });
            }
        });
        

}
