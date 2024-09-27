# MONIX

Backend feito com auxílio do Supabase que é um BaaS (backend as a service).
Foi utilizado essa metodologia, para facilitar o desenvolvimento, visto que boa parte do backend foi desenvolvido pelos alunos que tinha pouca experiência. Posteriormente, o backend foi incrementado pelo desenvolvedor do app.

## Diretrizes AWS

O código backend é hospedado na AWS, no serviço EC2 com IP fixo configurado (Elastic IP).  
Nessa máquina, temos o Node rodando a aplicação (porta 80).
Existe um webhook no Github que se comunica com a instância EC2, atualizando a máquina sempre que é feito push na branch main.
O webhook dispara o arquivo deploy.sh que está na instância, fazendo todo o processo de rebuild.
Para que o webhook funcione na AWS, na instância tem um arquivo chamado server.js que monitora o hook (porta 443).
Existe o arquivo .env na instância que define essas portas, assim como as credenciais do Supabase.
Os scripts de deploy e server são gerenciados pela biblioteca pm2.

## Como rodar localmente

1. Abra o git bash no diretório desejado
2. Faça o clone do repositório: `git clone https://github.com/diegosottani/monix-backend.git`
3. Agora navegue até o repositório: `cd monix-backend/`
4. Instale as depedências usando o seguinte: `npm install`
5. Examinar o arquivo .env.template para saber quais variáveis de ambiente são necessárias para o projeto.
6. Crie um arquivo .env na root do diretório e atribua valores às variáveis, tais valores podem ser obtidos no painel do Supabase.
7. Rode o projeto: `npm start`

## Como se cadastrar

1. Digite no postman (ou qualquer outro software que teste endpoints): `http://localhost:porta_que_escolheu/signup`
2. No body da requisição passe email e password:

```json
{
  "email": "johndoe@gmail.com",
  "password": "password_of_your_choice"
}
```

3. Vá até o email que mandou na requisição e clique em "Confirm your mail"

## Como logar e usar as demais rotas

1. Digite no postman (ou qualquer outro software que teste endpoints): `http://localhost:porta_que_escolheu/login`
2. No body da requisição passe email e password que usou para fazer o cadastro

```json
{
  "email": "johndoe@gmail.com",
  "password": "password_of_your_choice"
}
```

3. Será retornado o objeto session, copie o valor de `access_token`
4. Nas demais rotas que precisam de autorização, opte por `Bearer Token` e passe o valor obtido do `access token`

## Autores:

### Supervisor

- Diego Sottani

### Squad - 01:

- Gabriel Vinicius
- Giovanna Cunha
- Iale Almeida
- Julia Lira
- Lorenzo Leão
- Luís Manoel
- Nicholas Bergqvist
- Rafael Figueirôa

### Squad - 02:

- Ana Caroline
- Antony Marcos
- Artur Inocêncio
- Brenno Freitas
- Carlos Sérgio
- Júlia Rocha
- Pedro Tavares
- Sidney Lima

### Squad - 03:

- Pedro Motta
- Carlos Gabriel
- Cauã Coutinho
- Gabriel Lins
- Thiego Joaquim
- Yuri Cavalcanti
- Thiago Lemos
- Samuel Kainã

### Squad - 04:

- Andrey Kaiky Reis Ferreira
- Carlos Guilherme
- Davi Marcelo
- Devid Silva
- Edson Silva
- Maria Clara
