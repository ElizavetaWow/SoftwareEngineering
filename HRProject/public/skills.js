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

function reload() {
  const tbody = document.querySelector("tbody");
  tbody.replaceChildren();
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
}

function send() {
  let name = document.getElementById('name').value;
  let description = document.getElementById('description').value;
  if (name && description) {
    fetch("/skills/create", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        description: description
      })
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.result);
        reload();
      });

  }
  else {
    alert("Ошибка создания");
  }
}