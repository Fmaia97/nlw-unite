let participantes = [
    {
      name: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscricao: new Date(2024, 4, 1, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 0),
    },
    {
      name: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date(2024, 1, 2, 19, 23),
      dataCheckIn: new Date(2024, 1, 5, 20, 20),
    },
    {
      name: "Ana Silva",
      email: "ana@gmail.com",
      dataInscricao: new Date(2024, 0, 15, 14, 45),
      dataCheckIn: new Date(2024, 0, 18, 16, 30),
    },
    {
      name: "Pedro Souza",
      email: "pedro@gmail.com",
      dataInscricao: new Date(2024, 3, 10, 10, 10),
      dataCheckIn: new Date(2024, 3, 13, 12, 15),
    },
    {
      name: "Julia Lima",
      email: "julia@gmail.com",
      dataInscricao: new Date(2024, 4, 5, 15, 50),
      dataCheckIn: new Date(2024, 4, 8, 18, 40),
    },
    {
      name: "Lucas Santos",
      email: "lucas@gmail.com",
      dataInscricao: new Date(2024, 5, 20, 11, 30),
      dataCheckIn: new Date(2024, 5, 23, 14, 20),
    },
    {
      name: "Maria Oliveira",
      email: "maria@gmail.com",
      dataInscricao: new Date(2024, 6, 3, 17, 10),
      dataCheckIn: new Date(2024, 6, 6, 19, 55),
    },
    {
      name: "Rafaela Costa",
      email: "rafaela@gmail.com",
      dataInscricao: new Date(2024, 7, 12, 12, 40),
      dataCheckIn: new Date(2024, 7, 15, 15, 30),
    },
    {
      name: "Fernando Rocha",
      email: "fernando@gmail.com",
      dataInscricao: new Date(2024, 8, 8, 10, 20),
      dataCheckIn: new Date(2024, 8, 11, 12, 10),
    },
    {
      name: "Carla Dias",
      email: "carla@gmail.com",
      dataInscricao: new Date(2024, 9, 25, 14, 15),
      dataCheckIn: new Date(2024, 9, 28, 17, 0),
    }
  ];

const criarNovoParticipante = (participante) => {

  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao);

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn);

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
     data-email="${participante.email}"
     onClick=fazerCheckIn(event)
     >
     Confirmar Checkin
     </button>`
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.name}
      </strong>
      <br />
      <small>
      ${participante.email}
      </small>
    </td>
    <td>
      ${dataInscricao}
    </td>
    <td>
      ${dataCheckIn}
    </td>
  </tr>`
  }

const atualizarLista = (participantes) => {
  let output = "";
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante);
  
  document
  .querySelector('tbody')
  .innerHTML = output;}
}

atualizarLista(participantes);

const adicionarParticipantes = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  const participante = {
  name: formData.get('name'),
  email: formData.get('email'),
  dataInscricao: new Date(),
  dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
    )

  if(participanteExiste) {
    alert("E-mail ja cadastrado!")
    return;
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes);

  event.target.querySelector('[name="name"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = "Tem certeza que deseja fazer o Chek-in?"

  if(confirm(mensagemConfirmacao) == false){
    return;
  }


  const email = event.target.dataset.email;

  const participante = participantes.find(
    (p) => p.email == email)
  participante.dataCheckIn = new Date();
  atualizarLista(participantes);
}