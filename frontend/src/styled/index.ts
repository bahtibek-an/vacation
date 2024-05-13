import { styled } from "@mui/system";

export const Title = styled("h1")(() => ({
  fontSize: "1.4993rem",
  fontWeight: 600,
  letterSpacing: "0.18px",
}));

export const Main = styled("div")(() => ({
  maxWidth: "1440px",
  maxHeight: "300px",
  width: "100%",
  height: "100%",
  backgroundColor: "#000",
}));

export const Description = styled("p")(() => ({
  fontWeight: "bold",
  fontSize: "24px",
  lineHeight: 1.429,
  letterSpacing: "0.55px",
  fontFamily: "sans-serif",
  color: "black",
}));

export const VCardTitle = styled("p")(() => ({
  left: "20px",
  bottom: "20px",
  fontSize: "18px",
  color: "#fff",
  height: "46px",
  fontWeight: "bold"
}))


export const VCardDescription = styled("p")(() => ({
  fontSize: "16px",
  color: "gray",
  fontFamily: "sans-serif",
  textAlign: "justify",
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: "8",
  overflow: "hidden",
  textOverflow: "ellipsis",
  // lineBreak: "anywhere"
}))

export const Text = styled("p")(() => ({
    color: "gray"

}))

export const Input = styled("input")(() => ({
  maxWidth: "338px",
  width: "100%",
  height: "44px",
  borderRadius: "8px",
  border: "0px",
  backgroundColor: "#F0F3F7",
  paddingLeft: "10px",
}));
export const AddInput = styled("input")(() => ({
  maxWidth: "466px",
  width: "100%",
  height: "44px",
  borderRadius: "8px",
  border: "0px",
  backgroundColor: "#F0F3F7",
  paddingLeft: "10px",
}));

export const AddArea = styled("textarea")(() => ({
  maxWidth: "466px",
  width: "100%",
  maxHeight: "100px",
  height: "100%",
  borderRadius: "8px",
  border: "0px",
  backgroundColor: "#F0F3F7",
  padding: "10px",
  resize: "none"
}));


export const Label = styled("p")(() => ({
  fontFamily: "sans-serif",
  width: "336px",
  height: "20px",
  color: "#63676C",
}));

export const FormBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  gap: "8px",
  width: "338px",
  height: "72px",
}));

export const AddFormBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  gap: "8px",
  maxWidth: "466px",
  width: "100%",
  height: "72px",
}));

export const AddAreaBox = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  justifyContent: "start",
  gap: "8px",
  maxWidth: "466px",
  width: "100%",
  height: "100px",
}));

export const BlueButton = styled("button")(() => ({
  width: "338px",
  height: "44px",
  borderRadius: "8px",
  backgroundColor: "#388FF3",
  color: "#fff",
  border: "0px",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  cursor: "pointer"
}));

export const GrayButton = styled("button")(() => ({
  width: "338px",
  height: "44px",
  borderRadius: "8px",
  backgroundColor: "gray",
  color: "#000",
  border: "0px",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  cursor: "pointer"
}));

export const BorderBlurBtn = styled("button")(() => ({
  width: "338px",
  height: "44px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: "#388FF3",
  border: "1px solid",
  borderColor: "#388FF3",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  cursor: "pointer"
}));

export const WhiteButton = styled("button")(() => ({
  width: "338px",
  height: "44px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: "#388FF3",
  border: "1px solid",
  borderColor: "#388FF3",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  cursor: "pointer"
}));

export const PageButton = styled("button")(() => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: "#63676C",
  border: "1px solid",
  borderColor: "#63676C",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));


export const DisableBtn = styled("button")(() => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  backgroundColor: "#fff",
  color: "#388FF3",
  border: "0px",
  fontWeight: "bold",
  fontFamily: "sans-serif",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));


