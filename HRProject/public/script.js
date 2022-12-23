fetch("/employees/all")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((employee) => {
            fetch(`/personemployee/emp?id=` + employee.personid)
                .then((response) => response.json())
                .then((data) => {
                    data = JSON.parse(data)
                    fetch(`/person?id=` + data.person_personid)
                        .then((response) => response.json())
                        .then((data) => {
                            data = JSON.parse(data)
                            const tbody = document.querySelector("#employees");
                            const template = document.querySelector('#employeeCard');
                            const clone = template.content.cloneNode(true);

                            clone.querySelector("p").innerText = data.name;
                            clone.querySelector(".col").id = employee.personid.toString();

                            tbody.appendChild(clone);
                        });

                }).catch(error => {
                });

        });
    });

function openProfile(id) {
    window.open(`http://localhost:9000/profile?id=` + id,"_self")
}