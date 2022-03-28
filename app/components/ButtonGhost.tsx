import { Button, ChevronRightIcon, HStack, Text } from "native-base";
import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";
import React from "react";

type ButtonGhostProps = {
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  text: string | React.ReactNode;
  revertColors?: boolean;
  buttonColor: string;
} & IButtonProps;

const ButtonGhost: React.FC<ButtonGhostProps> = (props) => {
  return (
    <Button
      size="sm"
      borderRadius={12}
      variant="outline"
      _pressed={{
        background: props.buttonColor || "gray.500",
        borderColor: undefined,
        _text: { color: "gray.300", bg: "amber.400" },
      }}
      bg={props.revertColors ? "black" : "gray.300"}
      {...props}
    >
      <HStack>
        {props.iconBefore}
        {typeof props.text === "string" ? (
          <Text color={props.revertColors ? "gray.300" : "black"} fontSize={18}>
            {props.text}
          </Text>
        ) : (
          props.text
        )}
        {props.iconAfter}
      </HStack>
    </Button>
  );
};

export default ButtonGhost;
