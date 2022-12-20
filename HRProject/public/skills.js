const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
console.log(`/personskills/{id}`);
fetch(`/personskills/{id}`)
        .then((response) => response.json())
        .then((data) => {
            var skills = [];
            data.forEach((skill) => {
                skills.push(skill);
            });
        document.querySelector("h4").innerText = employee.login;
        document.querySelector("h5").innerText = employee.login;//skills.join(', ')
    });