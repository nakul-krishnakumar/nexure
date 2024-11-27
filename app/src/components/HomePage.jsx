import { useTheme } from "@mui/material/styles";
import { Button, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, Box } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";

const HomePage = () => {
    const theme = useTheme();

    const [modal, setModal] = useState(false);
    const [rows, setRows] = useState([]);
    const [sortAsc, setSortAsc] = useState(true); // Sorting order
    const [editOn, setEditOn] = useState({}); //contact on which we want to edit on

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    //toggle sort order
    const toggleSort = () => {
        setSortAsc(!sortAsc);
        fetchContacts(sortAsc);
        console.log(sortAsc); //testing
    }
    
    const toggleModal = () => {
        fetchContacts(sortAsc);
        setModal(!modal);
    }

    //USED TO EDIT CONTACT
    const handleEdit = (index) => {
        setEditOn(rows[index]);
        setModal(!modal);
    } 

    //USED TO DELETE CONTACT
    const handleDelete = async (phoneno) => {
        await axios.delete(`http://localhost:5000/api/contacts/deletecontact/${phoneno}`)
        .then((result) => {
            fetchContacts(sortAsc);
            console.log(result); //testing
        })
        .catch((error) => {
            console.error(error); //testing
        });
    }
    const fetchContacts = async (sortAsc) => { // Fetch data from the server
        await axios.post('http://localhost:5000/api/contacts/fetchall', { sortAsc }) //sending modal just so rerendering doesnt occur
        .then((result) => {
            console.log(result); //testing
            setRows(result.data);

            setCurrentPage(1);
        })
    }

    // Slice the data based on current page and items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        fetchContacts(sortAsc);
    }, [sortAsc]);

    // If no contacts are available

    
    return (
        <>
            <Container sx={{ height: '100vh', paddingTop: '2rem' }}>

                <Box sx={{ color: 'primary.main', textAlign: 'center', fontWeight: 800, fontSize: '3rem' }}>
                    N E X U R E
                </Box>

                <div className="button-wrapper" style={{ display: 'flex', justifyContent:'flex-end', marginTop: '5rem'}}>
                    <Button variant="contained"
                            sx={{ bgcolor: theme.palette.primary.main, 
                                  margin: '1rem 0rem',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',}} 
                            onClick={toggleModal}>
                        <AddIcon sx={{ marginRight: '0.5rem', fontSize: 'medium' }} />
                        New Contact
                    </Button>
                </div>

                <div className="table-wrapper" style={{height: '60vh'}}>
                    <TableContainer component={Paper} sx={{borderRadius: 2}}>
                    <Table>
                        <TableHead sx={{bgcolor: theme.palette.primary.main}}>
                            <TableRow>
                                <TableCell>Sno.</TableCell>
                                <TableCell sx={{display: 'flex', alignItems: 'center', '&:hover': { cursor: 'pointer'}}} onClick={toggleSort}>Name {sortAsc ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</TableCell>
                                <TableCell>Phone No.</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Job Title</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentItems.map((row, index) => (
                                <TableRow key={(currentPage-1)*5 + index+1}>
                                    <TableCell>{(currentPage-1)*5 + index+1}</TableCell>
                                    <TableCell>{row.first_name + " " + row.last_name}</TableCell>
                                    <TableCell>{row.phone_number}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.company}</TableCell>
                                    <TableCell>{row.job_title}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" 
                                                sx={{ bgcolor: theme.palette.primary.main }} 
                                                onClick={() => handleEdit((currentPage-1)*5 + index)}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" 
                                                sx={{ bgcolor: theme.palette.error.main }} 
                                                onClick={() => handleDelete(row.phone_number)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    {rows.length === 0 &&
                        <Container sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <Typography variant="h4" sx={{ color: theme.palette.primary.main, textAlign: 'center', mt: '1rem' }}>
                                No Contacts Available
                            </Typography>
                        </Container>
                    }
                </div>

                {/* Pagination */}
                <Pagination
                    count={Math.ceil(rows.length / itemsPerPage)} // Total number of possible pages
                    page={currentPage} // Current page
                    onChange={handlePageChange} // Handle page change
                    color="primary"
                    sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
                />
            </Container>


            {/* Contact Form Modal's Code here */}   
            { modal && <Container sx={{
 
                    }}>

                    <ContactForm  toggleModal={toggleModal} modal={modal} editOn={editOn}/>
            </Container>}
        </>
    )
}

export default HomePage;