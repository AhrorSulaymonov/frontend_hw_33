import React, { FC } from "react";
import { ButtonWrapper, LinkWrapper } from "./Btn.styles";
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = (props) => {
  // type prop uchun default qiymatni "button" qilib belgilaymiz
  const { children, title, onClick, href, type = "button" } = props;

  return !href ? (
    // ButtonWrapper ga to'g'ri type ni uzatamiz
    <ButtonWrapper onClick={onClick} type={type}>
      {children || title}
    </ButtonWrapper>
  ) : (
    <LinkWrapper href={href}>{children || title}</LinkWrapper>
  );
};

export default Button;
