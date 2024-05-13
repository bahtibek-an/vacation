import { Box } from "@mui/system";
import React from "react";
import {
  BlueButton,
  Description,
  FormBox,
  Input,
  Label,
  Text,
  WhiteButton,
} from "../../styled";
import { useNavigate } from "react-router-dom";

interface InputData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ICard {
  text: string;
  firstname: boolean;
  lastname: boolean;
  email: boolean;
  password: boolean;
  data: InputData;
  isSubmitted: boolean;
  setData: React.Dispatch<React.SetStateAction<InputData>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const Auth: React.FC<ICard> = ({
  text,
  firstname,
  lastname,
  email,
  password,
  setData,
  data,
  handleSubmit,
  isSubmitted,
}) => {
  const navigate = useNavigate();

  // Handler to update the data state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "378px",
          backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box>
          <Description>{text}</Description>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              marginTop: firstname ? "30px" : "54px",
            }}
          >
            {firstname && (
              <FormBox>
                <Label>First Name</Label>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={data.firstName}
                  onChange={handleChange}
                />
              </FormBox>
            )}
            {lastname && (
              <FormBox>
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={data.lastName}
                  onChange={handleChange}
                />
              </FormBox>
            )}
            {email && (
              <FormBox>
                <Label>Email</Label>
                <Input
                  name="email"
                  placeholder="Your email address"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                />
              </FormBox>
            )}
            {password && (
              <FormBox>
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                />
              </FormBox>
            )}
          </Box>

          <Box
            sx={{
              width: "338px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "40px",
            }}
          >
            <BlueButton disabled={isSubmitted} type="submit">
              {firstname ? "Register" : "Login"}
            </BlueButton>

            <Text
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "10px 0"
              }}
            >
              {firstname
                ? "Already have an account ?"
                : "Don’t have an account ?"}
            </Text>

            <WhiteButton
              onClick={() => navigate(firstname ? "/login" : "/register")}
              type="button"
            >
              {firstname ? "Login" : "Register"}
            </WhiteButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Auth;
