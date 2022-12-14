fetch("/projects/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((project) => {
      const tbody = document.querySelector("tbody");
      const template = document.querySelector('#projectrow');

      const clone = template.content.cloneNode(true);
      let td = clone.querySelectorAll("td");
      td[0].textContent = project.name;
      td[1].textContent = new Date(project.start_date).toLocaleDateString("ru-RU");
      td[2].textContent = new Date(project.end_date).toLocaleDateString("ru-RU");
      tbody.appendChild(clone);
    });
  });

function errorDecorator(func) {
  console.log("декоратор работает")
  try{
    return func;
  } catch (err) {
    alert(err);
  }
  
}

function send() {
  let name = document.querySelector('input[name="name"]').value
  let start_date = document.querySelector('input[name="start_date"]').value
  let end_date = document.querySelector('input[name="end_date"]').value

  if (name || start_date || end_date) {
    fetch("/projects/find", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        start_date: start_date,
        end_date: end_date
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const tbody = document.querySelector("tbody");
        tbody.replaceChildren();
        data = JSON.parse(data)
          data.forEach((project) => {
            const tbody = document.querySelector("tbody");
            const template = document.querySelector('#projectrow');
            const clone = template.content.cloneNode(true);
            let td = clone.querySelectorAll("td");
            td[0].textContent = project.name;
            td[1].textContent = new Date(project.start_date).toLocaleDateString("ru-RU");
            td[2].textContent = new Date(project.end_date).toLocaleDateString("ru-RU");
            tbody.appendChild(clone);
          });

      });
  }
  else {
    const tbody = document.querySelector("tbody");
    tbody.replaceChildren();
    fetch("/projects/all")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((project) => {
          const tbody = document.querySelector("tbody");
          const template = document.querySelector('#projectrow');

          const clone = template.content.cloneNode(true);
          let td = clone.querySelectorAll("td");
          td[0].textContent = project.name;
          td[1].textContent = new Date(project.start_date).toLocaleDateString("ru-RU");
          td[2].textContent = new Date(project.end_date).toLocaleDateString("ru-RU");
          tbody.appendChild(clone);
        });
      });
  }
}

function add() {
  let name = document.querySelector('input[name="name"]').value
  let start_date = document.querySelector('input[name="start_date"]').value
  let end_date = document.querySelector('input[name="end_date"]').value

  if (name && start_date && end_date) {
    fetch("/projects/create", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        start_date: start_date,
        end_date: end_date
      })
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.result);
      });
  }
  else {
    alert("Заполните поля формы");
  }
}

function clearFields() {
  document.querySelector('input[name="name"]').value = ""
  document.querySelector('input[name="start_date"]').value = ""
  document.querySelector('input[name="end_date"]').value = ""
}