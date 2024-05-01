export class Router {
  constructor() {
    this.routes = {
      GET: {},
      POST: {},
      DELETE: {},
      PUT: {},
    };
  }

  invoke(req) {
    const { method, socket, path } = req;
    const pathToInvoke = Object.keys(this.routes[method]).find((r) =>
      path.includes(r)
    );

    if (!pathToInvoke) {
      socket.write("HTTP/1.1 404 NOT FOUND\r\n\r\n");
      socket.end();
    } else {
      return this.routes[method][pathToInvoke](req);
    }
  }

  get(route, callback) {
    this.routes.GET[route] = callback;
  }
  post(route, callback) {
    this.routes.POST[route] = callback;
  }
  delete(route, callback) {
    this.routes.DELETE[route] = callback;
  }
  put(route, callback) {
    this.routes.PUT[route] = callback;
  }
}
