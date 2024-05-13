import {Box, Container} from "@mui/system";
import {Description} from "../../styled";
import {useUserContext} from "../../context/UserContext";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {UserRole, logout} from "../../axios/UserAPI";

const Header = () => {
    const userContext = useUserContext();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
            localStorage.removeItem("accessToken");
            userContext.setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    const isLogin = !!userContext.user;
    const isAdmin = userContext.user?.role === UserRole.ADMIN;


    return (
        <AppBar
            position="static"
            sx={{
                width: "100%",
                height: "80px",
                display: "flex",
                alignItems: "start",
                justifyContent: "center",
                backgroundColor: "#fff",
                border: "1px solid",
                borderColor: "#EAEDF0",
            }}
        >
            <Container maxWidth="xl" sx={{height: "100%"}}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            borderBottomRightRadius: "20px",
                            borderBottomLeftRadius: "20px",
                            border: "1px solid",
                            borderColor: "#EAEDF0",
                            borderTop: "0",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#388FF3",
                                borderRadius: "10px",
                                padding: "5px 15px"
                            }}
                        >
                            <Description
                                sx={{
                                    color: "#fff",
                                    fontSize: "25px",
                                    fontWeight: "bold",
                                }}
                            >
                                Vacations
                            </Description>
                        </Box>
                    </Box>

                    <Toolbar
                        sx={{
                            alignSelf: "left",
                            marginLeft: "auto"
                        }}
                    >
                        {isLogin && (
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{
                                    flexGrow: 1,
                                    color: "#000000"
                                }}
                            >
                                {`${userContext.user?.firstName} ${userContext.user?.lastName}`}
                            </Typography>
                        )}
                        {isLogin ? (
                            <>
                                {isAdmin && (
                                    <>
                                        <Button onClick={() => navigate("/report")} variant="contained"
                                                sx={{marginLeft: "15px"}}>Report</Button>
                                        <Button onClick={() => navigate("/add-vacation")} variant="contained"
                                                sx={{marginLeft: "15px"}}>Add a vacation</Button>
                                    </>
                                )}
                                <Button onClick={handleLogout} variant="contained" color="error"
                                        sx={{marginLeft: "15px"}}>Logout</Button>
                            </>
                        ) : (
                            <Box>
                                <Button variant="contained" color="inherit"
                                        onClick={() => navigate("/login")}>Login</Button>
                                <Button sx={{marginLeft: "10px"}} variant="contained"
                                        onClick={() => navigate("/register")}>Register</Button>
                            </Box>
                        )}
                    </Toolbar>
                </Box>
            </Container>
        </AppBar>
    );
};

export default Header;
