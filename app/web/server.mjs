import net from "net";
import { Req } from "./req.mjs";

export class Server {
  constructor(router) {
    this.router = router;

    this.netServer = net.createServer((socket) => {
      socket.on("close", async () => {
        socket.end();
      });
      socket.on("data", async (data) => {
        const req = new Req(socket, data);

        await this.router.invoke(req);
      });
    });
  }

  listen(port) {
    console.log(`listening on port ${port}`);
    this.netServer.listen(port, "localhost");
  }
}
