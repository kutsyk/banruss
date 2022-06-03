FROM alpine:3.14

RUN wget https://github.com/Arriven/db1000n/releases/download/v0.8.7/db1000n_0.8.7_linux_386.tar.gz

RUN tar -zxvf db1000n_0.8.7_linux_386.tar.gz

RUN chmod +x ./db1000n

ENTRYPOINT ["./db1000n"]
