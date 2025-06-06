# WiseTogether - Server
This is the backend API for **WiseTogether**, a web application that helps couples manage their finances by tracking shared expenses.  
It handles all server-side logic, authentication, and data interactions with Supabase.

**Client Repository**: [WiseTogether - Web](https://github.com/WiseTogether/wisetogether-web.git)

## Technologies Used

- Node.js / Express
- Supabase (as the database + auth)
- RESTful API

## Installation

To get started with the project locally, follow these steps:

### Clone the Repository

```bash 
git clone https://github.com/WiseTogether/wisetogether-server.git
cd wisetogether-server
```

### Install Dependencies

```bash 
npm install
```

### Environment Variables

Before running the app locally, create a `.env` file in the root of your project and add the following:

```
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```
You can find these values in your Supabase project settings.

### Running the Development Server

To start the app locally, run the following command:

```bash 
npm run dev
```
