import {juggler} from '@loopback/repository';

export function createCompanyDataSource(companyId: string): juggler.DataSource {
  return new juggler.DataSource({
    name: `company_${companyId}`,
    connector: 'mysql',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: `company_${companyId}`,
  });
}
