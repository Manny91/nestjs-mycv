import { DataSourceOptions } from 'typeorm/data-source';

const dataSourceOptions: Partial<DataSourceOptions> = {
  synchronize: false,
  migrations: [__dirname + '/migrations/*.ts'],
  //   migrationsTableName: 'migrations',
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['**/*.entity.js'],
    });
    break;
  case 'test':
    Object.assign(dataSourceOptions, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true,
      dropSchema: true,
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('env unknown');
}
export default dataSourceOptions;
