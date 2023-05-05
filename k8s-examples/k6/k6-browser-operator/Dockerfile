FROM grafana/k6:0.43.1

USER root

RUN apk update && apk add --no-cache chromium

ENV K6_BROWSER_ENABLED=true

USER 12345

WORKDIR /home/k6

COPY --from=redboxoss/scuttle:latest scuttle /bin/scuttle

ENTRYPOINT ["scuttle", "k6"]
