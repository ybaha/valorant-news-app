import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  ChevronRightIcon,
  Text,
  Box,
  VStack,
  KeyboardAvoidingView,
  Pressable,
} from "native-base";
import { Controller, useForm } from "react-hook-form";
import ButtonGhost from "../components/ButtonGhost";
import FormInput from "../components/FormInput";
import ScreenLayout from "../components/Layout";
import useAuthStore from "../store/auth";
import useScreenStore from "../store/screen";
import { auth } from "../utils/firebaseConfig";

export default function CreateAccount() {
  const setLoginScreen = useScreenStore((state) => state.setLoginScreen);
  // TODO: might be a problem
  const { loading, setLoading } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (errors.username || errors.email || errors.password) return;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
    } catch (e) {
      console.log("Error creating user!");
    } finally {
      setLoading(false);
    }
  };

  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const usernameReg = /^[a-z0-9_]*$/;

  return (
    <ScreenLayout
      headerProps={{
        color: "gray.300",
        fontSize: 36,
        marginTop: 16,
      }}
      headerText="Create Account"
      spinners
    >
      <VStack
        style={{
          width: "100%",
          height: "90%",
        }}
      >
        <VStack mt={32}>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 3,
              maxLength: 24,
              pattern: usernameReg,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={!!errors.username}
              ></FormInput>
            )}
            name="username"
          />
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
            text={"Create Account"}
            iconAfter={<ChevronRightIcon color="black" size="7" mr={-1} />}
            onPress={handleSubmit(onSubmit)}
            isLoading={loading}
          />
          <Box
            display="flex"
            mb={6}
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text color={"gray.400"}>Already have an account?</Text>
            <Pressable onPress={setLoginScreen} ml={3}>
              <Text color={"gray.300"} fontSize={15}>
                Login
              </Text>
            </Pressable>
          </Box>
        </KeyboardAvoidingView>
      </VStack>
    </ScreenLayout>
  );
}
