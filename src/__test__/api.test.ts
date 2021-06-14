import TaskHelper from '../helpers/TaskHelper';
import * as mongoose from 'mongoose';

// env setup
require('dotenv').config()

describe('TaskHelper', () => {
  beforeAll(async () => {
    const databaseUri: string = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.jnmms.mongodb.net/${process.env.DATABASE_NAME_TEST}?retryWrites=true&w=majority`;

    await mongoose.connect(databaseUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
  }, 120000) // The connection to external db can take long time

  it('should return a number', async () => {
    let result = await TaskHelper.getTotalTasks();
    expect(typeof(result)).toBe('number');
  })
});