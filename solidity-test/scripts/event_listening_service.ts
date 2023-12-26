import { ethers } from "ethers";
import express from "express";
import http from "http";
import WebSocket from "ws";
import { abi as CONTRACT_ABI } from "../artifacts/contracts/NoahToken.sol/NoahToken.json";
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "";
const PROVIDER_URL = process.env.PROVIDER_URL || "";

if (!CONTRACT_ADDRESS || !PROVIDER_URL) {
  console.error(
    "Environment variables CONTRACT_ADDRESS and PROVIDER_URL must be set"
  );
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const clients = new Map<string, WebSocket>();

wss.on("connection", (ws) => {
  ws.on("message", (message: string) => {
    clients.set(message, ws);
  });

  ws.on("close", () => {
    for (const [address, clientWs] of clients.entries()) {
      if (clientWs === ws) {
        clients.delete(address);
        break;
      }
    }
  });
});

function notifyClients(from: string, to: string, amount: string) {
  [from, to].forEach((address) => {
    const client = clients.get(address);
    if (client) {
      client.send(JSON.stringify({ type: "transfer", from, to, amount }));
    }
  });
}

contract.on("Transfer", (from, to, amount, event) => {
  console.log("Transfer event:", event, from, to, amount.toString());
  notifyClients(from, to, amount.toString());
});

app.get("/api/balance/:address", async (req, res) => {
  const address = req.params.address;
  const filterTo = contract.filters.Transfer(null, address);
  const filterFrom = contract.filters.Transfer(address, null);

  try {
    const toEvents = await contract.queryFilter(filterTo);
    const fromEvents = await contract.queryFilter(filterFrom);

    let balance = BigInt(0);
    toEvents.forEach((event: any) => {
      balance += event.args.value;
    });
    fromEvents.forEach((event: any) => {
      balance -= event.args.value;
    });

    res.json({ balance: balance.toString() });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
