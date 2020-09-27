import { Modal } from "antd";

export const errorModal = (title: string, content: string) => {
    Modal.error({
        title,
        content,
    });
};