import {Box} from "@mui/system";
import {Typography, Button} from "@mui/material";
import Modal from '@mui/material/Modal';
import React from "react";


interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleDelete: () => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: '#ffffff',
    boxShadow: 24,
    p: 4,
    borderRadius: "5px"
};

const ConfirmModal: React.FC<IModalProps> = ({isOpen, onClose, handleDelete}) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
            >
                <Typography
                    sx={{
                        textAlign: "center"
                    }}
                    id="modal-modal-title"
                    variant="h5"
                    component="h2"
                >
                    Are you sure?
                </Typography>
                <Box
                    sx={{
                        marginTop: "30px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Button
                        onClick={onClose}
                        variant="outlined"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmModal;