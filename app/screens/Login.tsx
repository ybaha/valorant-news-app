import { StatusBar } from "expo-status-bar";
import {
  Button,
  ChevronRightIcon,
  HStack,
  NativeBaseProvider,
  Text,
  Progress,
  Box,
  VStack,
  KeyboardAvoidingView,
  View,
  Pressable,
} from "native-base";
import ButtonGhost from "../components/ButtonGhost";
import FormInput from "../components/FormInput";
import ScreenLayout from "../components/Layout";
import useScreenStore from "../store/screen";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native";

export default function CreateAccount() {
  const setLoginScreen = useScreenStore((state) => state.setLoginScreen);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => console.log({ data });
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return (
    <ScreenLayout
      headerProps={{
        color: "gray.300",
        fontSize: 36,
        marginTop: 16,
      }}
      headerText="Login"
      spinners
    >
      <VStack
        style={{
          width: "100%",
          height: "90%",
        }}
      >
        {/* Inputs */}
        <VStack mt={32}>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: emailReg,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Email adress"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.email}
              ></FormInput>
            )}
            name="email"
          />
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 6,
              maxLength: 64,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.password}
              ></FormInput>
            )}
            name="password"
          />
        </VStack>

        {/* Buttons Bottom */}
        <KeyboardAvoidingView
          behavior="height"
          enabled={true}
          w="100%"
          flex={1}
          style={{
            flexDirection: "column-reverse",
          }}
        >
          <ButtonGhost
            text={"Login"}
            iconAfter={<ChevronRightIcon color="black" size="7" mr={-1} />}
            onPress={handleSubmit(onSubmit)}
          />
          <Box
            display="flex"
            mb={6}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text color={"gray.400"}>Don't have an account?</Text>
            <Pressable onPress={setLoginScreen} ml={3}>
              <Text color="gray.300" fontSize={15}>
                Sign up
              </Text>
            </Pressable>
          </Box>
        </KeyboardAvoidingView>
      </VStack>
    </ScreenLayout>
  );
}
