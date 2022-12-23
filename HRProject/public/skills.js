fetch("/skills/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((project) => {
      const tbody = document.querySelector("tbody");
      const template = document.querySelector('#projectrow');

      const clone = template.content.cloneNode(true);
      let td = clone.querySelectorAll("td");
      td[0].textContent = project.name;
      td[1].textContent = project.description;
      tbody.appendChild(clone);
    });
  });

function send() {
  console.log('start');
    let name = document.getElementById('name').value;
    let start_date = document.getElementById('start_date').value;
  if (name && start_date) {
    fetch("/skills/create", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: start_date
      })
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.result);
      });
      console.log('if');
  }
  else {
    alert("Ошибка создания");
  }
}