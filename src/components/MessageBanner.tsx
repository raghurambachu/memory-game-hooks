import styled from "@emotion/styled";
import tick from "../assets/images/tick.svg";
import { IMessageBannerState } from "../interfaces";

const MessageBannerWrapper = styled.div`
  margin-top: 2.5rem;
  background: var(--base-green);
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  border-radius: 4px;
  .message {
    margin-left: 0.7rem;
    color: var(--text-base-green);
  }
`;

const MessageBannerIcons = {
  success: tick,
  error: tick, // no significance, as there is no error situation
};

interface IMessageBanner {
  messageBannerState: IMessageBannerState;
}

const MessageBanner = ({ messageBannerState }: IMessageBanner) => {
  const { type, message } = messageBannerState;
  return (
    <MessageBannerWrapper>
      <img
        src={MessageBannerIcons[type as keyof typeof MessageBannerIcons]}
        alt={message}
      />
      <span className="message">{message} </span>
    </MessageBannerWrapper>
  );
};

export default MessageBanner;
