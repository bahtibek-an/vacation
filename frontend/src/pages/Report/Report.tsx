import {useEffect, useState} from "react";
import {downloadCsv, getVacationStats} from "../../axios/VacationApi.ts";
import {BarChart} from "@mui/x-charts";
import {Button, Box, Typography} from "@mui/material"

interface FollowerCount {
    destination: string;
    followersCount: number;
}

const Report = () => {
    const [data, setData] = useState<FollowerCount[]>([]);

    const fetchData = async () => {
        const response: FollowerCount[] = await getVacationStats();
        setData(response);
    };

    const handleClick = async () => {
        const {data} = await downloadCsv();
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'filename.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography sx={{ marginTop: "40px" }} component="h1" variant="h4">
                Vacations report
            </Typography>
            <Box
                sx={{display: "flex", flexDirection: "column"}}
            >
                <BarChart
                    xAxis={[{scaleType: 'band', data: data.map(item => item.destination)}]}
                    series={[{data: data.map(item => item.followersCount)}]}
                    width={800}
                    height={500}
                />
                <Button
                    sx={{
                        marginLeft: "auto"
                    }}
                    variant="contained"
                    onClick={handleClick}
                >Download CSV File</Button>
            </Box>
        </Box>
    );
};

export default Report;