import { getToken } from "../utils/EncStorage";
import { add, getAllTask } from "../api/taskApi";


export const processAddTask = async (TaskName: string, Description: string, Type: string, Deadline: Date, EnableNoti: boolean, Priority: number, NotiOnDeadline: number, Price: number, Currency: string) => {
    const UserId = JSON.parse(await getToken('userInfo') || '').UserId;
    if (UserId) {
        
        const response = await add(UserId, TaskName, Description, Type, Deadline, EnableNoti, Priority, NotiOnDeadline, Price, Type == "To do" ? '' : Currency);
        return response.status;
    }
    return 404;
}

export const getUserTask = async () => {
    const UserId = JSON.parse(await getToken('userInfo') || '').UserId;
    if (UserId) {
        const response = await getAllTask(UserId);
        return response.data;
    }
    return 404;
}