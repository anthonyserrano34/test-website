# Altwy.com Website

This repository contains the source code for the Altwy.com website, built using [Next.js 15](https://nextjs.org/docs).

## Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:
- Node.js (>18)
- npm

### Running the Site Locally

1. Clone the repository:
	```bash
	git clone git@gitlab.com:altwy/services/website.git
	cd website
	```

2. Install the dependencies:
	```bash
	npm install
	```

3. Run the development server:
	```bash
	npm run dev
	```

4. Open your browser and navigate to `http://localhost:3000` to see the website.

## Deployment

### Prerequisites

Ensure you have the following installed on your server:
- Node.js
- npm
- pm2

### Running the site on the server

1. SSH into Altwy server and navigate to the project directory:
	```bash
	cd /var/www/altwy
	```

2. Install the dependencies:
	```bash
	npm install
	```

3. Build the project:
	```bash
	npm run build
	```

4. Start the application using pm2:
	```bash
	pm2 start npm --name "altwy" -- start
	```

### Updating the Site

To update the site with the latest changes, follow these steps:

1. Pull the latest changes from the repository:
	```bash
	git pull
	```

2. Build the project:
	```bash
	npm run build
	```

3. Restart the application using pm2:
	```bash
	pm2 restart altwy
	```


