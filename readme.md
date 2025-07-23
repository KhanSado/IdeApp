# 📖 Ide - App de Gestão Eclesiástica

[![Firebase](https://img.shields.io/badge/Firebase-Backend-yellow)](https://firebase.google.com/)
[![Angular](https://img.shields.io/badge/Angular-Frontend-red)](https://angular.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Ide** é um aplicativo desenvolvido em **Angular** com backend baseado no **Firebase (Firestore + Auth)**. Seu objetivo é facilitar a **gestão de cultos**, com funcionalidades como:

- 📌 Registro da quantidade de **presentes** e **visitas**
- 🔐 Autenticação segura com Firebase Authentication
- ☁️ Armazenamento e sincronização de dados em tempo real com Firestore

---

## 🚀 Funcionalidades

- ✅ Cadastro e login de usuários com Firebase Auth  
- ✅ Registro de cultos com data, quantidade de presentes e visitantes  
- ✅ Listagem e edição dos cultos cadastrados  
- ✅ Armazenamento em tempo real com Firestore  
- ✅ Interface responsiva com Angular  

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia      | Função                                 |
|-----------------|----------------------------------------|
| Angular         | Framework web frontend (SPA)           |
| Firebase Auth   | Gerenciamento de autenticação          |
| Firestore       | Base de dados NoSQL em tempo real      |
| TypeScript      | Linguagem principal da aplicação       |
| HTML/CSS        | Estrutura e estilo da aplicação        |

---

## 🔐 Autenticação

A autenticação de usuários é feita via **Firebase Authentication**, utilizando e-mail e senha. O controle de acesso a determinadas rotas é feito com guards.

---


## ▶️ Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/bersoncrios/Ide.git
   cd Ide
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Copie as credenciais para o arquivo `src/environments/environment.ts`

4. Rode a aplicação:
   ```bash
   ng serve
   ```

---

## 🧪 Testes

(Se aplicável) Os testes unitários podem ser executados com:

```bash
ng test
```

---

## 📄 Licença

Distribuído sob a licença MIT. Veja [`LICENSE`](LICENSE) para mais informações.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma *issue* ou *pull request*.

---

## 📬 Contato

Desenvolvido por **[Guilherme Berson](https://github.com/bersoncrios)**  
📧 Email: guilhermeberson001@gmail.com

---

> "Ide por todo o mundo e pregai o evangelho a toda criatura." – *Marcos 16:15*
