# Task Tracker CLI

Task Tracker built in Node.js from scratch for practice purposes

## Usages

The Task Tracker allows you to:

- Add, Update, and Delete tasks
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

# Listing all task filtered by status
> task-cli list done
> task-cli list todo
> task-cli list in-progress
```

**Project Idea from roadmap.sh**
