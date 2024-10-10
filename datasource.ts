import { DataSourceOptions } from 'typeorm/data-source';
import { DataSource } from 'typeorm';
import config from './ormconfig';

export default new DataSource(config as DataSourceOptions);
