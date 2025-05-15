# Task Tracker CLI

A Task Tracker built in Node.js from scratch for practice purposes.

Requirements found in https://roadmap.sh/projects/task-tracker

## Installation

- Open a Terminal in the main project's folder. (Where the package.json is stored)
- run: `npm install -g`
- Start using it by running the available commands

##
- Open a Terminal in the main project's folder. (Where the package.json is stored)
- run: `npm uninstall -g`

## Usages

The Task Tracker allows you to:

- Add, update, and delete tasks
- Mark a task as in progress or done
- List all tasks
- List all tasks that are done
- List all tasks that are not done
- List all tasks that are in progress

## Available Commands

- task-cli add \<description>
- task-cli update \<id> \<description>
- task-cli delete \<id>
- task-cli mark-in-progress \<id>
- task-cli mark-done \<id>
- task-cli list [todo | in-progress | done]
- task-cli help

## Example

```
# Creating a new task
> task-cli add "Buy groceries"
# Output: Task added with ID: 1

# Updating task description
> task-cli update 1 "Buy groceries and cook dinner"

# Deleting task
> task-cli delete 1

# Updating task status
> task-cli mark-in-progress 1
> task-cli mark-done 1

# Listing all tasks
> task-cli list

# Listing all tasks filtered by status
> task-cli list done
> task-cli list todo
> task-cli list in-progress
```

**Project Idea from roadmap.sh**
