# Seleciona o SO/máquina virtual que tem os requisitos necessários para a minha aplicação
# Como se fosse uma VM
FROM node:12-alpine

# Fixa o fluxo de trabalho no diretório app dentro da Imagem
WORKDIR /app

# Cria um grupo (DEV), cria um Usuario (gabriel); add o usuario ao grupo (Comandos Linux)
# RUN addgroup dev && adduser -S -G gabriel dev
# * Rodar uma aplicação como root é uma falha de segurança!!!!!!!

# Mando a imagem usar o usuario Gabriel
# USER gabriel

# Copia os Arquivos para dentro do diretório app
COPY . .

# RUN: Instala alguma ferramenta que é necessária para a aplicação. porém não veio pelo FROM

# ENV Coloca as APIs utilizadas na aplicação

RUN npm install -g http-server

#
CMD ["http-server", ".", "-p", "3000"] 

# Define a porta
EXPOSE 3000