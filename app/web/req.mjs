const lineTerminator = "\r\n";
const end = lineTerminator + lineTerminator;
const okResponse = "HTTP/1.1 200 OK";

export class Req {
  constructor(socket, data) {
    const [startLine, ...rest] = String(data).split(lineTerminator);
    const [method, path] = startLine.split(" ");

    const headers = rest.reduce((acc, line) => {
      const [k, v] = line.split(": ", 2);
      acc[k] = v;
      return acc;
    }, {});

    this.socket = socket;
    this.method = method;
    this.headers = headers;
    this.path = path;
  }

  ok() {
    this.socket.write("HTTP/1.1 200 OK\r\n\r\n");
    this.socket.end();
  }

  text(text) {
    const response =
      `${okResponse}${lineTerminator}` +
      `Content-Type: text/plain${lineTerminator}` +
      `Content-Length: ${text.length}` +
      end +
      text;

    this.socket.write(response);
    this.socket.end();
  }

  json(data) {
    const responseJson = JSON.stringify(data);
    const response =
      `${okResponse}${lineTerminator}` +
      `Content-Type: application/json${lineTerminator}` +
      `Content-Length: ${responseJson.length}` +
      end +
      responseJson;

    this.socket.write(response);
    this.socket.end();
  }
}
