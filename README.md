# 3Mop Frontend

Esta aplicação é o frontend de um gerenciador de contatos.

## Requisitos

Antes de tudo, recomenda-se que o [backend](https://github.com/brGuirra/3mop-backend) já esteja sendo executado localmente
em sua máquina.

Além disso, para executar essa aplicação é necesário ter instalado a versão
LTS do Node.js. A instalação do node pode ser feita seguindo passo à passo
na [documentação](https://nodejs.org/en/download) para o seu sistema operacional.

## Instruções para uso

Após clonar e accessar a pasta com o repositório em sem computador,o primeiro
passo é criar um arquivo com as variáveis de ambiente da aplicação.

Em um máquina com Unix/Linux, rode o comando:

```bash
cp ./.env.example .env.local
```

Em uma máquina com Windows, rode o comando:

```bash
copy .\.env.example .env.local
```

Em seguida deve ser feita a instalação das dependências com o comando:

```bash
npm install
```

Por fim, para executar a aplicação é preciso rodar o commando abaixo.
O site ficará disponível em `http://localhost:5173`.

```bash
npm run dev
```
