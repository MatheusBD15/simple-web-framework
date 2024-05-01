import { Router } from "./web/router.mjs";
import { Server } from "./web/server.mjs";

const router = new Router();

router.get("/echo/", async (req) => {
  const { path } = req;
  const stringToEcho = path.replace("/echo/", "");

  req.text(stringToEcho);
});

router.post("/healthcheck", async (req) => {
  req.json({
    status: "ok",
  });
});

router.get("/", async (req) => {
  req.ok();
});

const server = new Server(router);

server.listen(4221);
