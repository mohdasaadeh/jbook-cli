import { Command } from "commander";
import path from "path";
import serve from "@mohdajbook/local-api";

const isProxy = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(filename));

    try {
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        isProxy
      );

      console.log(
        `Opened file ${filename} and listening to port ${options.port}...`
      );
    } catch (error) {
      console.log(error);
    }
  });
