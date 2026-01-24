import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


//--------------COMMON--------------------------
//FETCH USER STATS
export const getUserStatsApi = async(id, reqHeader) => {
    console.log(reqHeader)
    return await commonApi("GET", `${serverUrl}/getUserTaskCounts/${id}`, null, reqHeader)
}

//FETCH LOGS
export const getLogsApi = async(reqHeader) => {
    return await commonApi("GET", `${serverUrl}/task-logs`, {}, reqHeader)
}

//----------------USER------------------------
//REGISTER API
export const handleRegisterApi = async (reqBody) => {
    console.log("Inside register API")
    return await commonApi('POST', `${serverUrl}/register`, reqBody)
}

//LOGIN API
export const handleLoginApi = async (reqBody) => {
    console.log("Inside login API")
    return await commonApi('POST', `${serverUrl}/login`, reqBody)
}

//FETCH USER TASKS
export const getUserTasksApi = async (searchKey, reqHeader) => {
  const url = searchKey
    ? `${serverUrl}/getTasks?search=${searchKey}`
    : `${serverUrl}/getTasks`
  return await commonApi("GET", url, "", reqHeader)
}

//FETCH SINGLE TASK
export const getOneTaskApi = async (id, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getTask/${id}`, {}, reqHeader)
}

//DELETE USER TASK
export const deleteTaskApi = async (id, reqHeader) => {
    console.log("Inside delete user task")
    return await commonApi('DELETE', `${serverUrl}/deleteTask/${id}`, {}, reqHeader)
}

//ADD TASK
export const addTaskApi = async (reqBody, reqHeader) => {
    console.log("Inside add user task")
    return await commonApi('POST', `${serverUrl}/addTask`, reqBody, reqHeader)
}

//EDIT TASK API
export const editTaskApi = async(id, reqBody, reqHeader) => {
    console.log(reqHeader)
    return await commonApi('PUT', `${serverUrl}/updateTask/${id}`, reqBody, reqHeader)
}

//Fetch USER LOGS
export const getUserLogsApi = async(reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getLogs`, {}, reqHeader)
}


// export const getUserStatsApi = async(id, reqHeader){
//     return await commonApi("GET", `${serverUrl}/getUserTaskCounts/${id}`, {}, reqHeader)
// }


//----------------ADMIN SIDE----------------------------
//fetch admin stats
export const getAdminStatsApi = async(reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getAdminStats`, {}, reqHeader)
}

//get all users
export const getAllUsersApi = async(reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getAllUsers`, {}, reqHeader)
}

//create new user
export const createUserApi = async(reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/addUser`, reqBody, reqHeader)
}

//edit user
export const editUserApi = async (id, reqBody, reqHeader) => {
    return await commonApi('PUT', `${serverUrl}/updateUser/${id}`, reqBody, reqHeader)
}

//get all tasks
export const getAllTasksApi = async(searchKey, reqHeader) => {
    const url = searchKey ? `${serverUrl}/getAllTasks?search=${searchKey}` : `${serverUrl}/getAllTasks`
    return await commonApi('GET', url, {}, reqHeader)
}

//get all logs
export const getAllLogsApi = async(reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getAllLogs`, {}, reqHeader)
}

//get one user detail
export const getOneUserDetailApi = async(id, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getOneUser/${id}`, {}, reqHeader)
}

//get one user's tasks
export const getOneUserTasksApi = async(id, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getOneUserTasks/${id}`, {}, reqHeader)
}

//get one user's logs
export const getOneUserLogsApi = async(id, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getUserLogs/${id}`, {}, reqHeader)
}

//get one user task details
export const getOneUserTaskDetailsApi = async(taskID, reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getTaskDetails/${taskID}`, {}, reqHeader)
}

//get recent users
export const getRecentUsersApi = async(reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getRecentUsers`, {}, reqHeader)
}

//get recent tasks
export const getRecentTasksApi = async(reqHeader) => {
    return await commonApi('GET', `${serverUrl}/getRecentTasks`, {}, reqHeader)
}