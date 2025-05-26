import { getToken } from "../utils/EncStorage";
import { add, deleteTask, getAllTask, update } from "../api/taskApi";


export const processAddTask = async (TaskName: string, Description: string, Type: string, Deadline: Date, EnableNoti: boolean, Priority: number, NotiOnDeadline: number, Price: number, Currency: string) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {

        const response = await add(UserId, TaskName, Description, Type, Deadline, EnableNoti, Priority, NotiOnDeadline, Price, Type == "To do" ? '' : Currency);
        return response.status;
    }
    return 404;
}
export const processUpdateTask = async (TaskId: string, TaskName: string, Description: string, Type: string, Deadline: Date, Done: Date, EnableNoti: boolean, Priority: number, NotiOnDeadline: number, Price: number, Currency: string) => {
    const response = await update(TaskId, TaskName, Description, Type, Deadline, Done, EnableNoti, Priority, NotiOnDeadline, Price, Type == "To do" ? '' : Currency);
    return response.status;
}

export const processDeleteTask = async (TaskId: string) => {
    const response = await deleteTask(TaskId);
    return response.status;
}


export const getUserTask = async () => {
    const UserId = JSON.parse(await getToken('userInfo') || '').id;
    if (UserId) {
        const response = await getAllTask(UserId);
        return response.data;
    }
    return 404;
}