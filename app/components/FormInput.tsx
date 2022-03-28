import { IInputProps, Input } from "native-base";
import React from "react";

type InputProps = IInputProps;

const FormInput: React.FC<InputProps & { error?: boolean }> = (props) => {
  return (
    <Input
      color={"gray.300"}
      py={3}
      px={6}
      fontSize={15}
      borderRadius={12}
      bg={"gray.900"}
      borderColor={props.error ? "red.600" : "gray.500"}
      my={2}
      _focus={{ borderColor: props.error ? "red.500" : "gray.300" }}
      {...props}
    ></Input>
  );
};

export default FormInput;
