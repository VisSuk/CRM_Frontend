export const getTaskCounts = (allTasks) => {
    
    const taskCounts = {
      "all":allTasks.length,
      "pending":allTasks.filter((item) =>  item.taskStatus == 'Pending' ).length,
      "inprogress":allTasks.filter((item) =>  item.taskStatus == 'In Progress' ).length,
      "completed":allTasks.filter((item) =>  item.taskStatus == 'Completed' ).length,
    }
    return taskCounts

  }