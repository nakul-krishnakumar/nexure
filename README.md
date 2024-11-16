# NEXURE
## A Safe and Reliable Contact Management System
( Nexure -> Nexus (Connection) + Secure )


### Introduction

NEXURE is a contact management system that allows users to securely store, manage, and organize their contacts.

The major technical change made in this project is the use of `POST` instead of `GET` to fetch contacts. This decision allows for sending an order type, which simplifies sorting the contacts and ensures that the sorting process is more efficient with minimal code.

### WORKING

When you run the app, you will be redirected to the homepage where you can view all the contact details of people you've saved earlier.

- **Create a New Contact**: 
  - You can create a new contact by clicking the "New Contact" button, which opens a modal to be filled out and submitted. 
  - After submitting, the newly added contact will appear under the contact details.
  
- **Pagination**:
  - Only 5 contacts are shown per page. You can navigate between pages using the pagination controls below the contact table.

- **Edit and Delete Contacts**:
  - **Edit**: Clicking the "Edit" button next to a contact opens a modal prefilled with the contact's current data. You can update the contact details and submit the changes.
  - **Delete**: Clicking the "Delete" button will delete the contact and the page will re-render to show the updated list.

### DATABASE

Here I have chosen **PostgreSQL** hosted on Supabase Cloud.

#### Why PostgreSQL?

Structured SQL databases like PostgreSQL, MySQL, etc., are better suited for this scenario than non-structured SQL databases like MongoDB. Given the need for structured data (e.g., contact details with specific fields such as `first_name`, `last_name`, `email`, `phone_number`, etc.), PostgreSQL is a more efficient choice.

Additionally, Supabase offers **free PostgreSQL cloud hosting**, which makes it easier for users to connect to the database without setting up their own local database. Cloud hosting also simplifies the process for everyone, ensuring consistency across environments and making it easier to run the app locally without worrying about database setup.

#### Database Schema

The database schema for the contacts table is as follows:

```sql
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,      
    last_name TEXT NOT NULL,       
    email TEXT UNIQUE NOT NULL,    
    phone_number NUMERIC(10, 0) UNIQUE NOT NULL,  
    company TEXT,                  
    job_title TEXT         
);
```
To Run This on Your Local Desktop, Please Follow the Instructions:

  Fork this repository to your GitHub account.
  
  Clone the repository to your local machine:
    
    git clone https://github.com/your-username/nexure.git

Installing Dependencies:

  Navigate to the app directory and install the required dependencies:

    cd app
    npm install

  Next, go to the server directory and install the server dependencies:

    cd ..
    cd server
    npm install

Start the Client and Server

  In a terminal window, navigate to the root directory (here, nexure) and run the following command to start the frontend:

    cd app
    npm run dev

  Open a new terminal window, again navigate to the root directory of the project, and start the backend:

    cd server
    npm start

Note: Both the client and the server should be running concurrently for the project to work properly.
Database Setup

Note: You do not need to set up a local database as we are using a cloud PostgreSQL database hosted on Supabase.

SCREENSHOTS:
  ![image](https://github.com/user-attachments/assets/b5a64596-9c99-4a2c-a8fc-436d6415a290)
  ![image](https://github.com/user-attachments/assets/2ad1b699-12f8-4184-b563-be2e599cb705)

  ![image](https://github.com/user-attachments/assets/bf09eb6a-fb26-4e27-a100-d30fee34924d)


