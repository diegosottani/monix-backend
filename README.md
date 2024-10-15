# MONIX

Backend feito com auxílio do Supabase que é um BaaS (backend as a service).
Essa metodologia foi utilizada para facilitar o desenvolvimento, visto que boa parte do backend foi desenvolvido pelos alunos que tinham pouca experiência. Posteriormente, o backend foi incrementado pelo desenvolvedor do app.

## Deploy

Esse código backend é hospedado na AWS, no serviço EC2 com IP fixo configurado (Elastic IP).  
Nessa máquina, temos o Nginx lidando com o proxy reverso, fazendo os redirecionamentos necessários:

- https://app.monixbr.com/ que é o backend em si para ser chamado no app, contém todas as rotas do supabase
- https://app.monixbr.com/deploy para realizar o deploy do backend, ou seja, atualizar este código no EC2

Esses serviços estão configurados cada um em uma pasta, sendo monix-backend e monix-deploy, respectivamente.
É utilizado o pm2 para rodar os serviços, o nome de cada serviço é o mesmo nome da pasta:

```bash
pm2 list
pm2 logs
```

#### Acessar pasta do nginx com configurações de proxy

```bash
sudo nano /etc/nginx/conf.d/app.monixbr.com.conf
```

#### Após qualquer alteração no nginx, é necessário reiniciá-lo

```bash
sudo systemctl restart nginx
```

Ao fazer push na branch main, é acionada uma Github Action para se comunicar com a instância EC2, atualizando o repostório do servidor.  
A Action dispara uma requisição HTTP na instância, na rota /deploy.  
Essa rota acessa o deploy.js que está na instância, fazendo todo o processo de rebuild.  
Para que o deploy rode na AWS, temos uma "Actions secrets and variables" com uma secret definida nas configurações do repositório.  
Os scripts de deploy e o servidor rodando Node fulltime são gerenciados pela biblioteca pm2 instalada na instância.

## Como rodar localmente

1. Abra o git bash no diretório desejado
2. Faça o clone do repositório: `git clone https://github.com/diegosottani/monix-backend.git`
3. Agora navegue até o repositório: `cd monix-backend`
4. Troque para a branch de desenvolvimento: `git checkout dev`
5. Instale as depedências usando o seguinte: `npm install`
6. Examinar o arquivo .env.template para saber quais variáveis de ambiente são necessárias para o projeto.
7. Crie um arquivo .env na root do diretório e atribua valores às variáveis, tais valores podem ser obtidos no painel do Supabase.
8. Rode o projeto: `npm run start`

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
