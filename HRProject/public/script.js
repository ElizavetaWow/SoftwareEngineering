fetch("/employees")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((employee) => {
            const cardTemplate = document.querySelector("template");
            const card = cardTemplate.content.cloneNode(true);

            card.querySelector("h4").innerText = employee.login;
            card.querySelector(".card").id = employee.personid.toString();
            //card.querySelector("h5").innerText = 'aaaaa';
            card.id = employee.personid.toString();
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
    