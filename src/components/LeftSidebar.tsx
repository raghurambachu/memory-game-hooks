import styled from "@emotion/styled";
import { appConfig } from "../appConfig";

const {
  uiLabels: {
    leftSidebar: { title, para1, para2 },
  },
} = appConfig;

const LeftSidebarWrapper = styled.aside`
  margin-top: 12rem;
  color: var(--text-grey);
  line-height: 1.7;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 2rem 4.5rem;
  font-smooth: always;
  .title {
    color: var(--text-black);
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .description {
    margin-bottom: 1.6rem;
    text-align: justify;
    user-select: none;
  }
`;

const LeftSidebar = () => {
  return (
    <LeftSidebarWrapper className="left-sidebar">
      <h3 className="title">{title}</h3>
      <p className="description">{para1}</p>
      <p className="description">{para2}</p>
    </LeftSidebarWrapper>
  );
};

export default LeftSidebar;
