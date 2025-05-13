import mysql from 'mysql2/promise';

export async function createCompanyDatabase(companyId: string) {
  const dbName = `company_${companyId}`;
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await connection.end();
}
