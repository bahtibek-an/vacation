import {Box} from "@mui/system";
import React, {useState} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
    BlueButton,
    GrayButton,
    VCardDescription,
    VCardTitle,
} from "../../styled";
import {toastError, toastLoading, toastSuccess} from "../../toast/toast";
import {useUserContext} from "../../context/UserContext";
import {UserRole} from "../../axios/UserAPI";
import {deleteVacation, followToVacation, unFollowToVacation} from "../../axios/VacationApi";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import ConfirmModal from "../ConfirmModal/ConfirmModal.tsx";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

interface IVacationCardProps {
    id: number;
    image: string;
    title: string;
    description: string;
    price: number;
    start_date: string;
    end_date: string;
    isFollowing: boolean;
    followers_count: number;
    fetchData: () => Promise<void>;
}

const VacationCard: React.FC<IVacationCardProps> = ({
                                                        id,
                                                        image,
                                                        title,
                                                        description,
                                                        price,
                                                        start_date,
                                                        end_date,
                                                        isFollowing,
                                                        fetchData,
                                                        followers_count
                                                    }) => {
    const userContext = useUserContext();
    const navigate = useNavigate();
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
    const isAdmin = userContext.user?.role == UserRole.ADMIN;

    const handleFollow = async () => {
        const toastId = toastLoading("Loading...");
        try {
            await followToVacation(id);
            await fetchData();
            toastSuccess("Success", toastId);
        } catch (error) {
            if (error instanceof AxiosError) {
                toastError(error.response?.data.message, toastId);
            }
        }
    };

    const handleUnFollow = async () => {
        const toastId = toastLoading("Loading...");
        try {
            await unFollowToVacation(id);
            await fetchData();
            toastSuccess("Success", toastId);
        } catch (error) {
            if (error instanceof AxiosError) {
                toastError(error.response?.data.message, toastId);
            }
        }
    };

    const openConfirmModal = async () => {
        setIsOpenConfirmModal(true);
    }

    const handleDelete = async () => {
        const toastId = toastLoading("Loading...");
        try {
            await deleteVacation(id);
            await fetchData();
            setIsOpenConfirmModal(false);
            toastSuccess("Vacation successfully deleted", toastId);
        } catch (error) {
            if (error instanceof AxiosError) {
                toastError(error.response?.data.message, toastId);
            }
        }
    }

    const handleEdit = () => {
        navigate(`/edit-vacation/${id}`);
    };

    return (
        <>
            <ConfirmModal
                isOpen={isOpenConfirmModal}
                onClose={() => setIsOpenConfirmModal(false)}
                handleDelete={handleDelete}
            />
            <Box
                sx={{
                    position: "relative",
                    maxWidth: "360px",
                    borderRadius: "12px",
                    alignItems: "center",
                    backgroundColor: "#fff",
                    boxShadow: "0px 2px 2px gray",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Box
                    sx={{
                        position: "relative",
                        borderRadius: "12px 12px 0 0",
                        overflow: "hidden",
                        height: "240px",
                        width: "100%"
                    }}
                >
                    <img
                        src={image}
                        alt={title}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            background: "rgba(0, 0, 0, .25)",
                        }}
                    ></Box>
                    <VCardTitle
                        sx={{
                            position: "absolute",
                            width: "100%",
                            zIndex: 2,
                            padding: "20px 0",
                        }}
                    >
                        {title}
                    </VCardTitle>
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: 2,
                    }}
                >
                    {isAdmin ? (
                        <Box
                            sx={{
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    borderRadius: "50px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-center",
                                    color: "gray",
                                    pr: "10px",
                                    cursor: "pointer",
                                    padding: "2px 5px",
                                    fontSize: '12px'
                                }}
                                onClick={() => handleEdit()}
                            >
                                <EditIcon
                                    sx={{
                                        fontSize: "20px"
                                    }}
                                />
                                EDIT
                            </Box>
                            <Box
                                sx={{
                                    backgroundColor: "#fff",
                                    borderRadius: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-center",
                                    color: "gray",
                                    cursor: "pointer",
                                    padding: "2px 5px",
                                    fontSize: '12px',
                                    marginLeft: "10px",
                                }}
                                onClick={() => openConfirmModal()}
                            >
                                <DeleteIcon
                                    sx={{
                                        color: "",
                                        fontSize: "20px"
                                    }}
                                />
                                DELETE
                            </Box>
                        </Box>
                    ) : null}
                </Box>
                <Box
                    sx={{
                        padding: "22px"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box
                            sx={{
                                padding: "4px 8px",
                                backgroundColor: "#EAEDF0",
                                borderRadius: "8px",
                                color: "#63676C",
                                fontSize: "14px",
                                fontWeight: 400,
                            }}
                        >
                            {start_date} - {end_date}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}
                        >
                            <GroupAddIcon
                                sx={{
                                    fontSize: "20px"
                                }}
                            /> {followers_count}
                        </Box>
                    </Box>
                    <VCardDescription
                        sx={{
                            width: "100%",
                            height: "155px",
                            overflowWrap: "break-word",
                            marginTop: "10px"
                        }}
                    >{description}</VCardDescription>

                    <Box
                        sx={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            marginRight: "auto",
                            paddingLeft: "12px",
                            marginTop: "40px",
                            marginBottom: "5px"
                        }}
                    >
                        {price} $
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "start",
                            justifyContent: "space-between",
                            marginTop: "10px",
                        }}
                    >
                        {!isFollowing ? (
                            <BlueButton
                                onClick={() => handleFollow()}
                                sx={{
                                    fontSize: "16px",
                                }}
                            >Follow</BlueButton>
                        ) : (
                            <GrayButton
                                sx={{
                                    fontSize: "16px",
                                }}
                                onClick={() => handleUnFollow()}
                            >Unfollow</GrayButton>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default VacationCard;
