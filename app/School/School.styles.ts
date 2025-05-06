import styled from "styled-components";

export const SchoolEditWrapper = styled.div`
  padding: 30px;

  h1 {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 600px; // Kengroq forma uchun
  }

  label {
    margin-bottom: -10px; // Input bilan oraliqni kamaytirish
    font-size: 0.9em;
    color: #555;
  }
`;
