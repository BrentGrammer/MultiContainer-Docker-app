FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
# build the assets which are placed in app/build
RUN npm run build

FROM nginx
EXPOSE 3000
# copy your default.conf file to the default nginx folder and overwrite the existing default.conf file that came with the image
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# copy the prod assets from the builder image above into the nginx image default folder for assets
COPY --from=builder /app/build /usr/share/nginx/html