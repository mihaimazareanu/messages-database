import { IMessage } from "../messages/page";

const MessageComponent = ({ message }: { message: IMessage }) => {
  const localTime = new Date(parseInt(message.timestamp)).toLocaleTimeString();
  return (
    <div
      key={message._id}
      className="flex m-1.5 gap-4 font-fontType borde-none rounded-xl bg-secondary text-primary p-4"
    >
      <div>{localTime}</div>
      <div>{message.text}</div>
    </div>
  );
};

export default MessageComponent;
