function sendBack() {
    const trs = document.querySelector("tbody").querySelectorAll("tr");
    var fetches = [];
    trs.forEach((tr) => {
        let input = tr.querySelector("input")
        if (input.checked) {
            let skillname = tr.querySelector("td").textContent

            fetches.push(fetch(`/skill?name=` + skillname)
                .then((response) => response.json())
                .then((data) => {
                    data = JSON.parse(data)
                    personid = document.querySelector("#person").value
                    fetch("/personskill/create", {
                        method: "post",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            personid: personid,
                            skillid: data.skillid,
                        })
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data.result);
                        });
                }))

        }
    })
    Promise.all(fetches).then(function () {
        
        window.open('', '_self').close();
        window.opener.location.reload();
    });



}
function closeWindow() {

    window.open('', '_self').close()
}