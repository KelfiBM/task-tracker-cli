#! /usr/bin/env node

import { Orchestrator } from './orchestrator';
import { TaskRepository } from './task/task.repository';
import { TaskService } from './task/task.service';
import { Validator } from './validation/validator';

const args = process.argv.slice(2);
const orchestrator = new Orchestrator(
  new TaskService(new TaskRepository()),
  new Validator()
);

orchestrator.runCommand(args).catch((err) => {
  console.error(err);
});
