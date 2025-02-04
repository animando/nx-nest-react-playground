# nx/nest/next playground

This is a project for the purpose of 'trying out' various things. It's a collection of small PoCs and so isn't a showcase of 'production-hardened' code or even normal development practices.

In putting it together, my focus has been quite narrow and I've deliberately not focussed on things outside of that focus.

## In scope

- nx monorepo
- next FE application
- Graphql backend
- toying with various page/query caching mechanisms
- microservices built with nestjs
- RabbitMQ exchanges/queues of various patterns (competing consumer, pub/sub, rpc)
- little play with BullMQ
- virtual table using tanstack's react-table and react-virtual libraries
- infinite scroll
- Postgres/PrismORM
- websockets
- kubernetes deployment
- securing front-end and backend with clerk
- building bespoke nx executors for docker build and kubernetes deployment
- porting the FE to a vite application

## Out of scope

- unit testing - these are just rapidly prototyped, throwaway PoCs
- e2e testing
- CI/CD deployment
- UI design

## Other notes

Initially, I used the out-of-the box RabbitMQ integration, but found this to be limiting when seeking to implement different patterns. Then I discovered [https://github.com/golevelup/nestjs](@golevelup)'s rabbitmq module, which provided these advanced capabilities with bespoke decorators.

In [another](https://github.com/animando/nx-nest-electron-vite-playground) playground project of mine, I prototyped using a NestJS application in the 'backend' (so to speak) main process of an ElectronJS application. I used what I learned from the golevelup rabbitmq library implemention to write my own method decorators for the [Websocket](https://github.com/animando/nx-nest-electron-vite-playground/blob/main/libs/nestjs-websocket/src/lib/ws.module.ts) and [IPC](https://github.com/animando/nx-nest-electron-vite-playground/blob/main/libs/nestjs-ipc/src/lib/ipc.module.ts) communication message handling.
