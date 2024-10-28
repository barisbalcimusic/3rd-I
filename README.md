# 3rd-I

**3rd-I** is an AI application that captures images from your computer or phone camera, sends them to ChatGPT, and then converts the text response into speech using ElevanLabs. It can be utilized by visually impaired individuals to gain insights into their surroundings, providing valuable assistance in understanding the visual elements around them.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

## Getting Started

To get started with the **3rd-I** project, you will need to clone both the frontend and backend repositories.

## Prerequisites

- [Node.js](https://nodejs.org/) and npm installed on your machine.
- An account with [ElevanLabs](https://www.elevenlabs.io/) for speech synthesis.
- An API key from [OpenAI](https://beta.openai.com/signup/) for text processing.

## Installation

1. **Clone the backend repository:**

   ```bash
   git clone <backend-repo-url>
   ```

2. **Navigate to the backend directory and install dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Clone the frontend repository:**

   ```bash
   git clone <frontend-repo-url>
   ```

4. **Navigate to the frontend directory and install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

## Environment Variables

Configure environment variables for both the frontend and backend projects as follows:

### Frontend

In the frontend project, create a `.env` file and add the following variable:

```plaintext
VITE_LOCALHOST=<localhost-address>
```

Replace `<localhost-address>` with your local address.

### Backend

In the backend project, create a `.env` file and add the following variables:

```plaintext
PORT=<your-backend-port>
OPENAI_API_KEY=<your-openai-api-key>
ELEVENLABS_API_KEY=<your-elevenlabs-api-key>
```

Replace `<your-backend-port>` with the port number for the backend server, `<your-openai-api-key>` with your OpenAI API key, and `<your-elevenlabs-api-key>` with your ElevenLabs API key.

## Usage

1. **Start the backend server:**

   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend application:**

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:<frontend-port>` to use the application.

## License

This project is open-source and free to use.

---

Feel free to modify the content as needed!
