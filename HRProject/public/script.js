fetch("/employees")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((employee) => {
            const cardTemplate = document.querySelector("template");
            const card = cardTemplate.content.cloneNode(true);

            card.querySelector("h4").innerText = employee.login;
            card.id = employee.personid;
            card.employee = employee.login;
    //         fetch("/skills").then((response) => response.json()).then((data) => {
    //             data.forEach((skill) => {
    //                 if(skill.personid==employee.personid)  {
                    
    //                 }
    //     });
    // });
            document.body.appendChild(card);
        });
    });

    function find(id, employee)
    {
        window.location.href='skills.html'
        fetch("/personskills/"+id)
        .then((response) => response.json())
        .then((data) => {
            var skills = [];
            data.forEach((skill) => {
                skills.push(skill);
            });
        const cardTemplate = document.querySelector("template");
        const card = cardTemplate.content.cloneNode(true);
        console.log(cardTemplate);
        card.querySelector("h2").innerText = employee.login;
        card.querySelector("br").innerText = skills.join(', ');
        document.body = card;
    });
    }
    