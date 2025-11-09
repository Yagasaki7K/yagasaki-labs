// -----------------------------
// CONFIGURAÇÃO
// -----------------------------
const MYSQL_HOST = "128.201.228.211";
const MYSQL_USER = "sintonia";
const MYSQL_PASS = "sintonia22";
const MYSQL_DB = "sintonia";

const GAMESERVER_IP = "128.201.228.211";
const GAMESERVER_PORT = 30120;
const NUMERO_DA_SOMA = 20;
const NUMERO_DA_MULTIPLICACAO = 2;
const COR_SERVER_OFF = "#F00";
const COR_SERVER_ON = "#009900";

// -----------------------------
// DEPENDÊNCIAS
// -----------------------------
import mysql from "mysql2/promise";
import net from "net";
import { serve } from "bun";

// -----------------------------
// FUNÇÃO PARA TESTAR CONEXÃO TCP (GameServer)
// -----------------------------
async function isGameServerOnline(host, port, timeout = 1000) {
	return new Promise((resolve) => {
		const socket = new net.Socket();
		const onError = () => {
			socket.destroy();
			resolve(false);
		};

		socket.setTimeout(timeout);
		socket.once("error", onError);
		socket.once("timeout", onError);

		socket.connect(port, host, () => {
			socket.end();
			resolve(true);
		});
	});
}

// -----------------------------
// FUNÇÃO PARA OBTER TOTAL DE PLAYERS ONLINE
// -----------------------------
async function getTotalOnline() {
	const connection = await mysql.createConnection({
		host: MYSQL_HOST,
		user: MYSQL_USER,
		password: MYSQL_PASS,
		database: MYSQL_DB,
	});

	const [rows] = await connection.execute(
		"SELECT COUNT(*) AS total FROM characters WHERE online = 1;"
	);
	await connection.end();
	return rows[0].total;
}

// -----------------------------
// SERVIDOR WEB BUN.JS
// -----------------------------
serve({
	port: 3000,
	async fetch() {
		try {
			const online = await isGameServerOnline(GAMESERVER_IP, GAMESERVER_PORT);
			let result;

			if (online) {
				const playersOnline = await getTotalOnline();
				const soma = playersOnline + NUMERO_DA_SOMA;
				const totalFinal = soma * NUMERO_DA_MULTIPLICACAO;
				result = `<font color="${COR_SERVER_ON}">${totalFinal}</font>`;
			} else {
				result = `<font color="${COR_SERVER_OFF}">0</font>`;
			}

			return new Response(`PLAYERS ON: ${result}`, {
				headers: { "Content-Type": "text/html; charset=utf-8" },
			});
		} catch (error) {
			console.error(error);
			return new Response("Erro interno do servidor", { status: 500 });
		}
	},
});

console.log("✅ Servidor rodando em http://localhost:3000");
