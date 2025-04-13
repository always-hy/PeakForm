# How to Run RabbitMQ

## Prerequisites
- Have Docker installed

## To run RabbitMQ as a container:
```bash
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

## To stop and remove the container after usage:
```bash
docker stop rabbitmq
docker rm rabbitmq
```

---

_Last updated: 13 April, 11:21 by Hok Layheng_