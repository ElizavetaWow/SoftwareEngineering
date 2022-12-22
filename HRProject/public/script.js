fetch("/employees/all")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((employee) => {
            const cardTemplate = document.querySelector("template");
            const card = cardTemplate.content.cloneNode(true);

            card.querySelector("h4").innerText = employee.login;
            card.querySelector(".card").id = employee.personid.toString();
            card.id = employee.personid.toString();
            card.employee = employee.login;
            document.body.appendChild(card);
        });
    });

    function openProfile(id) {
        window.open(`http://localhost:9000/profile?id=`+id)
    }