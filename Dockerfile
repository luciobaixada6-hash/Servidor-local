# Especifica versao de sistema operacional  de base 
FROM node:20-alpine

# Define a pasta onde o codigo vai ser executado
WORKDIR /app

# Copia os arquivos pakege.json e package-lock.json para a pasta /app
COPY package*.json ./

# Instala as dependências 
RUN npm install

# Copia o Código-fonte para a pasta /app
COPY . .

# informar a porta que a aplicação vai rodar 
EXPOSE 8080

# Comando para executar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]