fetch("/employees")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((employee) => {
            const cardTemplate = document.querySelector("template");
            const card = cardTemplate.content.cloneNode(true);

            card.querySelector("h4").innerText = employee.login;
            card.querySelector("p").innerText = employee.login;

            document.body.appendChild(card);
        });
    });