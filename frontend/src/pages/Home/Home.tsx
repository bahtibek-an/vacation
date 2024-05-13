import {Box, Container} from "@mui/system";
import React, {useEffect, useState} from "react";
import VacationCard from "../../components/VacationCard/VacationCard.tsx";
import {DisableBtn, PageButton} from "../../styled";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {getVacations} from "../../axios/VacationApi";
import FilterCard from "../../components/FilterCard/FilterCard.tsx";

interface IVacation {
    id: number;
    destination: string;
    description: string;
    price: number;
    picture: string;
    start_date: string;
    end_date: string;
    is_following: boolean;
    followers_count: number
}

const Home: React.FC = () => {
    const [vacations, setVacations] = useState<IVacation[]>([]);
    const [total, setTotal] = useState(0);
    const [filter, setFilter] = useState({
        follow: false,
        upcoming: false,
        active: false,
        page: 1,
        limit: 10,
    });
    const fetchData = async () => {
        try {
            const data = await getVacations({
                follow: filter.follow,
                upcoming: filter.upcoming,
                active: filter.active,
                page: filter.page,
                limit: filter.limit,
            });
            setTotal(data.totalRecords);
            setVacations(data.results);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [filter]);

    console.log(vacations);

    // Change page
    const paginate = (pageNumber: number) =>
        setFilter((prev) => ({...prev, page: pageNumber}));

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: "30px",
                marginBottom: "30px",
            }}
        >
            <Container maxWidth="xl">
                <FilterCard
                    filter={filter}
                    setFilter={setFilter}
                />
                <Box
                    sx={{
                        display: "flex",
                        margin: "30px 0",
                        gap: "10px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    {vacations?.map(
                        ({
                             id,
                             description,
                             destination,
                             price,
                             picture,
                             start_date,
                             end_date,
                             is_following,
                             followers_count
                         }) => (
                            <VacationCard
                                id={id}
                                key={id}
                                image={picture}
                                title={destination}
                                description={description}
                                price={price}
                                start_date={start_date}
                                end_date={end_date}
                                isFollowing={is_following}
                                followers_count={followers_count}
                                fetchData={fetchData}
                            />
                        )
                    )}
                </Box>
                <Box
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                    }}
                >
                    <PageButton
                        onClick={() => paginate(filter.page - 1)}
                        disabled={filter.page === 1}
                    >
                        <GrFormPrevious style={{fontSize: "25px"}}/>
                    </PageButton>
                    {Array.from({length: Math.ceil(total / filter.limit)}, (_, index) =>
                        !(filter.page === index + 1) ? (
                            <PageButton
                                key={index}
                                onClick={() => paginate(index + 1)}
                                disabled={filter.page === index + 1}
                            >
                                {index + 1}
                            </PageButton>
                        ) : (
                            <DisableBtn
                                key={index}
                                onClick={() => paginate(index + 1)}
                                disabled={filter.page === index + 1}
                            >
                                {index + 1}
                            </DisableBtn>
                        )
                    )}
                    <PageButton
                        onClick={() => paginate(filter.page + 1)}
                        disabled={filter.page === Math.ceil(total / filter.limit)}
                    >
                        <GrFormNext style={{fontSize: "25px"}}/>
                    </PageButton>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
