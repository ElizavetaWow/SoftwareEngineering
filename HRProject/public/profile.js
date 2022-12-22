const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
let personId = 100
fetch(`/personemployee/emp?id=`+id)
        .then((response) => response.json())
        .then((data) => {
            data = JSON.parse(data)
            personId = data.person_personid
    }).then(()=>{
        fetch(`/personskill/${personId}`)
        .then((response) => response.json())
        .then((data) => {
            var skills = [];
            data = JSON.parse(data)
            data.forEach((skill) => {
                skills.push(skill);
                const body = document.querySelector("#skills").querySelector("ul");
                const template = document.querySelector('#skill');
                const clone = template.content.cloneNode(true);
                clone.querySelector("li").innerText = skill.name;
                clone.querySelector("li").title = skill.description;
                body.appendChild(clone);
            });
    }); 
    })

