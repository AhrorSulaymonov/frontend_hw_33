import styled from "styled-components";

export const TeachersPageWrapper = styled.div`
  padding: 30px;

  .title-side {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const TeacherCreateWrapper = styled.div`
  padding: 30px;

  & form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;
