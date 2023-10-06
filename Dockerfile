FROM madnificent/ember:5.2.0 as builder

LABEL maintainer="erika.pauwels@gmail.com"

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM semtech/static-file-service:0.2.0

ENV EMBER_PRIMARY_THEME "bbw"
ENV EMBER_ROOT_TITLE "BBW"
COPY nginx/compression.conf /config/compression.conf
COPY --from=builder /app/dist /data
