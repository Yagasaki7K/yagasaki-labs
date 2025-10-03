import { createPool } from 'mysql2/promise';
import config from './config.js';

const mysql = createPool({
    host: config.sql.host,
    user: config.sql.user,
    password: config.sql.password,
    database: config.sql.database,
    port: config.sql.port,
    connectionLimit: 10 // Adicionado para melhor gerenciamento de conexões
});

mysql.on('error', (err) => {
    console.error('Erro na conexão com MySQL:', err);
});

export default mysql;