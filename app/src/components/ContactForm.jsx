import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormControl from '@mui/material/FormControl'
import CloseIcon from '@mui/icons-material/Close';
import { Button, Container, Grid2 } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const ContactForm = (props) => {
    const theme = useTheme(); //use the default theme set in App.jsx

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setphoneNo] = useState('');
    const [company, setCompany] = useState('');
    const [title, setTitle] = useState('');

    const handleModal = (value) => {
        props.toggleModal(value);
    }

    //used to send data to backend to edit existing contact
    const editForm = async () => {

        console.log("EDIT FORM") //testing

        const id = props.editOn.id;
        const updatedData = {
            firstName: firstName || props.editOn.first_name,
            lastName: lastName || props.editOn.last_name,
            email: email || props.editOn.email,
            phoneNo: phoneNo || props.editOn.phone_number,
            company: company || props.editOn.company,
            title: title || props.editOn.job_title
        };
        
        
        await axios.put(`http://localhost:5000/api/contacts/editcontact/${id}`, updatedData)
        .then((result) => {
            console.log(result); //testing
        })
        .catch((error) =>{
            console.error(error); //testing
        })

        handleModal(false);
    }

    //used to send data to backend to make new contact
    const submitForm = async () => {
        handleModal(false);

        const data = {firstName, lastName, email, phoneNo, company, title};
        
        await axios.post('http://localhost:5000/api/contacts/addcontact', data) //Adds a new contact
        .then((result) => {
            console.log(result); //testing
        })
        .catch((error) => {
            console.error(error); //testing
        });
    }

    return (
        <>  
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                padding: '2.5rem 4rem',
                position: 'absolute', // Ensure the modal is positioned on top
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000, // Ensure the modal is above other content
                backdropFilter: 'blur(10px)', // Apply blur effect to the backdrop
            }}> 
                <Button variant="contained" sx={{ 
                        bgcolor: theme.palette.primary.main, 
                        margin: '1rem auto', 
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', 
                        
                    }}
                    onClick={handleModal} >
                        <CloseIcon/>
                </Button>

                <Grid2 container 
                    component="form"
                    sx={{ '& .MuiTextField-root': { m: "1rem", width: '40ch',color: theme.palette.primary.main },
                        display: 'flex',
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        padding: '30px 40px',
                        width: 'fit-content',
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: 'rgba(255, 255, 255, 0.5)',
                      }}
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (Object.keys(props.editOn).length === 0) {
                          submitForm(); // Call submitForm if `editOn` is empty
                        } else {
                          editForm(); // Call editForm if `editOn` is not empty
                        }
                    }}
                > 
                        <FormControl>
                            <InputAdornment position="start" sx={{ width: '100%'}}>
                                <AccountCircle sx={{m: '0 auto', fontSize: '3rem', color: theme.palette.primary.main}} />
                            </InputAdornment>

                            <TextField
                                required
                                id="standard-required"
                                label="First Name"
                                type="text"
                                variant="standard"
                                defaultValue={props.editOn.first_name ? props.editOn.first_name : ''}

                                onChange={(e) => setFirstName(e.target.value)}
                            />

                            <TextField
                                required
                                id="standard-required"
                                label="Last Name"
                                type="text"
                                variant="standard"
                                defaultValue={props.editOn.last_name ? props.editOn.last_name : ''}

                                onChange={(e) => setLastName(e.target.value)}
                            />

                            <TextField
                                id="standard-required"
                                label="Email"
                                type="email"
                                variant="standard"
                                defaultValue={props.editOn.email ? props.editOn.email : ''}

                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                required
                                id="standard-number"
                                label="Phone No."
                                type="number"
                                variant="standard"
                                slotProps={{
                                    htmlInput: {
                                        inputMode: 'numeric',
                                        min: 1000000000,
                                        max: 9999999999,
                                    }
                                }}
                                defaultValue={props.editOn.phone_number ? props.editOn.phone_number : ''}

                                onChange={(e) => setphoneNo(e.target.value)}
                            />

                            <TextField
                                id="standard-required"
                                label="Company"
                                type="text"
                                variant="standard"
                                defaultValue={props.editOn.company ? props.editOn.company : ''}

                                onChange={(e) => setCompany(e.target.value)}
                            />

                            <TextField
                                id="standard-required"
                                label="Job Title"
                                type="text"
                                variant="standard"
                                defaultValue={props.editOn.job_title ? props.editOn.job_title : ''}

                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <Button variant="contained" type="submit" sx={{
                                width: '100%', 
                                mt: 2,
                                fontWeight: '600',
                                }}
                            >Add Contact</Button>

                        </FormControl>
                </Grid2>
            </Container>
        </>
    )
}

ContactForm.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    editOn: PropTypes.object.isRequired
}
  
export default ContactForm;