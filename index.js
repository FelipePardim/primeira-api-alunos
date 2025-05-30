import express from "express";

const PORTA = 3000;

const servidor = express();
servidor.use(express.json());

let alunos = [
 {
  "nome": "Jeremias",
  "idade": 33,
  "curso": "Gastronomia",
  "id": 1
 },
 {
  "nome": "Jeremias II",
  "idade": 33,
  "curso": "Gastronomia",
  "id": 2
 },
 {
  "nome": "Jeremias III",
  "idade": 33,
  "curso": "Gastronomia",
  "id": 3
 },
]

let ultimoId = alunos.length;

servidor.get("/alunos", (req, res) => {
 res.send(alunos);
})


servidor.get("/alunos/:id", (req, res) => {
 const indexAluno = alunos.findIndex(aluno => aluno.id === Number(req.params.id));

 if (indexAluno == -1) {
  res.sendStatus(404);
 } else {
  res.send(alunos[indexAluno])
 }
})

servidor.post("/alunos", (req, res) => {
 ultimoId++;
 req.body.id = ultimoId;
 alunos.push(req.body);

 res.send(req.body);
})

servidor.patch("/alunos/:id", (req, res) => {
 const indexAluno = alunos.findIndex(aluno => aluno.id === Number(req.params.id));

 if (indexAluno == -1) {
  res.sendStatus(404);
 } else {
  req.body.id = alunos[indexAluno].id;
  alunos[indexAluno] = req.body;

  res.send(alunos[indexAluno]);
 }
})

servidor.delete("/alunos/:id", (req, res) => {
 const indexAluno = alunos.findIndex(aluno => aluno.id === Number(req.params.id));

 if (indexAluno == -1) {
  res.sendStatus(404);
 } else {
  alunos.splice(indexAluno, 10);

  res.sendStatus(200);
 }
})

servidor.listen(PORTA, () => console.log("Ok Funcionando na porta nova: ", PORTA))