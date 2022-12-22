const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
fetch(`/personskill/${id}`)
        .then((response) => response.json())
        .then((data) => {
            var skills = [];
            data = JSON.parse(data)
            data.forEach((skill) => {
                skills.push(skill);
                const body = document.querySelector("body");
                const template = document.querySelector('#skilltp');
                const clone = template.content.cloneNode(true);
                clone.querySelector("h4").innerText = skill.name;
                clone.querySelector("h5").innerText = skill.description;
                body.appendChild(clone);
            });
    }); 