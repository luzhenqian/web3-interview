import { ethers } from "ethers";
import express from "express";
import http from "http";
import WebSocket from "ws";
import { abi } from "../artifacts/contracts/NoahToken.sol/NoahToken.json";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const CONTRACT_ABI = abi;
const PROVIDER_URL = process.env.PROVIDER_URL!;

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients: Map<string, WebSocket> = new Map();

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (message: string) => {
    clients.set(message, ws);
  });

  ws.on("close", () => {
    for (const [address, clientWs] of clients) {
      if (clientWs === ws) {
        clients.delete(address);
        break;
      }
    }
  });
});

contract.on(
  "Transfer",
  (from: string, to: string, amount: BigInt, event: Event) => {
    console.log("Transfer event:", event, from, to, amount.toString());

    const fromClient = clients.get(from);
    const toClient = clients.get(to);

    if (fromClient) {
      fromClient.send(
        JSON.stringify({
          type: "transfer",
          from,
          to,
          amount: amount.toString(),
        })
      );
    }

    if (toClient) {
      toClient.send(
        JSON.stringify({
          type: "transfer",
          from,
          to,
          amount: amount.toString(),
        })
      );
    }
  }
);

app.get(
  "/api/balance/:address",
  async (req: express.Request, res: express.Response) => {
    // 使用日志获取地址的余额，而不是直接调用合约的balanceOf方法
    const address = req.params.address;

    const filterTo = contract.filters.Transfer(null, address);
    const filterFrom = contract.filters.Transfer(address, null);

    try {
      const toEvents = await contract.queryFilter(filterTo);
      const fromEvents = await contract.queryFilter(filterFrom);

      // 计算余额
      let balance: BigInt = BigInt(0);
      toEvents.forEach((event: any) => {
        balance = balance + event.args.value;
      });
      fromEvents.forEach((event: any) => {
        // @ts-ignore
        balance = BigInt(balance - event.args.value);
      });

      return res.json({
        balance: balance.toString(),
      });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
);

// 启动服务器
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
