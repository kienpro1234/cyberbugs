import { notification } from "antd";
export const notifiFuntion = (type, message) => {
    notification[type]({
        message: message,
    })
}