import React from "react";
import { useAppDispatch } from "./useAppSelector";

export const useSocket = () => {
    // const {} = useAppDispatch()
    const ws = React.useRef(new WebSocket("ws://localhost:8000/ws?token=" + localStorage.getItem('Token')))

    ws.current.onopen = () => {
        console.log("Соединение установлено.");
    };
    ws.current.onerror = (event) => {
        console.log("WebSocket error received: ", event);
    }
    ws.current.onmessage = (data) => {
        const mess = JSON.parse(data.data);
        console.log(mess);
        //   dispatch({ type: "POST_MESSAGE", payload: { data: mess } })
    }
    function handleSendMess(data: any) {
        ws.current.send(JSON.stringify(data))
    }
}