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
        fetch(`/employee?id=` + id)
            .then((response) => response.json())
            .then((data) => {
                data = JSON.parse(data)
                fetch(`/grade?id=` + data.grade_gradeid)
                    .then((response) => response.json())
                    .then((data) => {
                        data = JSON.parse(data)
                        const body = document.querySelector("#grade");
                        const template = document.querySelector('#graderes');
                        const clone = template.content.cloneNode(true);
                        clone.querySelector("p").innerText = data.name;
                        body.appendChild(clone);
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

