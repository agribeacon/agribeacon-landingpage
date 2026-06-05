import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { IncomingMessage } from "http";
import chatHandler from "./api/chat";
import heroVideoHandler from "./api/hero-video";

const readRequestBody = (req: IncomingMessage) =>
  new Promise<unknown>((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });

const localChatApiPlugin = (): Plugin => ({
  name: "local-chat-api",
  configureServer(server) {
    server.middlewares.use("/api/chat", async (req, res) => {
      try {
        const body = await readRequestBody(req);

        await chatHandler(
          {
            method: req.method,
            body,
          },
          {
            setHeader(name, value) {
              res.setHeader(name, value);
            },
            status(code) {
              res.statusCode = code;
              return {
                json(payload) {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(payload));
                },
              };
            },
          },
        );
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid chat request" }));
      }
    });
  },
});

const localHeroVideoPlugin = (): Plugin => ({
  name: "local-hero-video-api",
  configureServer(server) {
    server.middlewares.use("/api/hero-video", async (_req, res) => {
      try {
        await heroVideoHandler(_req, {
          setHeader(name: string, value: string) { res.setHeader(name, value); },
          status(code: number) {
            res.statusCode = code;
            return {
              json(payload: unknown) {
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(payload));
              },
            };
          },
        });
      } catch {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Failed to generate video URL" }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  process.env.OPENCODE_GO_API_KEY ||= env.OPENCODE_GO_API_KEY;
  process.env.OPENCODE_GO_MODEL ||= env.OPENCODE_GO_MODEL;
  process.env.AWS_ACCESS_KEY_ID ||= env.AWS_ACCESS_KEY_ID;
  process.env.AWS_SECRET_ACCESS_KEY ||= env.AWS_SECRET_ACCESS_KEY;

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [localChatApiPlugin(), localHeroVideoPlugin(), react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
