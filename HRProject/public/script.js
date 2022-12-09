fetch("/employees")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((employee) => {
            const cardTemplate = document.querySelector("template");
            const card = cardTemplate.content.cloneNode(true);

            card.querySelector("h4").innerText = employee.login;
            card.id = employee.personid;
    //         fetch("/skills").then((response) => response.json()).then((data) => {
    //             data.forEach((skill) => {
    //                 if(skill.personid==employee.personid)  {
                    
    //                 }
    //     });
    // });
            document.body.appendChild(card);
        });
    });