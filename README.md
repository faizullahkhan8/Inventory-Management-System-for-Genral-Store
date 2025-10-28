# 🏪 Inventory Management System for General Store

Hey there! Welcome to our Inventory and Billing Management System. This project was built to help general store owners manage their day-to-day operations without the headache of complicated software.

## What's This All About?

Running a general store means juggling a thousand things at once - tracking products, managing suppliers, generating bills, and keeping an eye on stock levels. This system brings all of that together in one place, making life a little easier for store owners and their staff.

We built this as a desktop application because, let's be honest, sometimes you just want software that runs on your computer without needing an internet connection or worrying about cloud subscriptions.

## What Can It Do?

Here's what we've packed into this system:

-   **Product Management** - Add new products, update prices, track what's in stock
-   **Smart Billing** - Generate bills quickly with automatic calculations and receipt printing
-   **Inventory Tracking** - Get alerts when stock is running low, track what's moving fast
-   **Supplier Records** - Keep all your supplier information organized in one place
-   **Sales Reports** - See how your store is performing with easy-to-read reports
-   **Backup & Restore** - Your data is precious, so we made sure you can back it up anytime

## The Tech Stack (For the Curious)

We went with a solid stack that balances modern development with reliability:

-   **Electron** - Because desktop apps still matter, and they work offline
-   **React** - For a snappy, responsive user interface
-   **Node.js + Express** - Handling all the backend logic
-   **MongoDB** - Storing all your data securely
-   **Material-UI** - Making everything look clean and professional

## Getting Started

### What You'll Need First

Before diving in, make sure you have these installed:

1. **Node.js** (version 14 or higher) - [Download it here](https://nodejs.org/)
2. **MongoDB** - Either install it locally or use MongoDB Atlas (cloud version)
3. **Git** - To clone this repository

### Installation Steps

It's pretty straightforward. Open PowerShell or your terminal and follow along:

**1. Clone this repository**

```bash
git clone https://github.com/faizullahkhan8/Inventory-Management-System-for-Genral-Store.git
cd Inventory-Management-System-for-Genral-Store
```

**2. Install the dependencies**

We've got three parts to install - the main electron app, the frontend, and the backend:

```bash
# Install main dependencies
npm install

# Install frontend dependencies
cd App/renderer
npm install

# Install backend dependencies
cd ../server
npm install

# Back to the root
cd ../..
```

**3. Set up your environment**

Head into the `App/server` folder and create a `.env` file. You can copy the example:

```bash
cd App/server
copy .env.example .env
```

Open that `.env` file and update it with your MongoDB connection and other settings. Don't worry, there are comments in there to guide you.

**4. Fire it up!**

```bash
# From the root directory
npm run dev
```

This will start the backend server, the frontend, and launch the Electron app. Give it a moment to get everything running.

## Project Structure

Here's how everything is organized:

```
├── App/
│   ├── electron/          # Electron main process
│   ├── renderer/          # React frontend
│   └── server/            # Express backend API
├── Docs/                  # Documentation (SRS, design specs)
└── examples/              # Example implementations
```

## How to Use It

Once everything's running, you'll see the main dashboard. From there:

1. **Start by adding products** - Go to the Products section and add your inventory
2. **Set up suppliers** - Add your supplier information
3. **Create bills** - When a customer comes in, use the Billing module
4. **Check reports** - Keep an eye on sales trends and stock levels

The interface is pretty intuitive, but if you get stuck, check out the documentation in the `Docs` folder.

## Development

Want to contribute or customize it for your own use? Here's what you need to know:

### Running in Development Mode

```bash
# Start the backend
npm run server

# Start the frontend (in another terminal)
npm run client

# Start Electron (in another terminal)
npm run electron
```

### Building for Production

When you're ready to create a distributable version:

```bash
# Build everything
npm run build

# Create installers for Windows
npm run dist-win
```

## Common Questions

**Q: Do I need an internet connection to use this?**  
A: Nope! Once it's installed and set up with a local MongoDB, it works completely offline.

**Q: Can multiple people use it at the same time?**  
A: Right now it's designed for single-user operation. If you need multi-user support, you'd want to modify it to use a shared database.

**Q: What if I mess something up?**  
A: That's what the backup feature is for! Make regular backups and you can always restore your data.

**Q: Can I customize it?**  
A: Absolutely! It's all open source. Feel free to modify it to fit your specific needs.

## Troubleshooting

**The app won't start**

-   Make sure MongoDB is running
-   Check that all dependencies are installed (`npm install` in all three directories)
-   Look at the console for error messages

**"Port already in use" errors**

-   Something else is using port 3000 or 5000
-   Either close that application or change the port in the `.env` file

**Database connection failed**

-   Verify MongoDB is running
-   Double-check your connection string in `App/server/.env`

## Contributing

Found a bug? Have an idea for a feature? Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## Credits

Built with care by Faiz Ullah Khan and contributors who believe that good software should help people, not frustrate them.

## License

This project is open source and available under the MIT License. Use it, modify it, share it - just remember to give credit where it's due.

## Need Help?

If you run into issues or have questions:

-   Open an issue on GitHub
-   Check the documentation in the `Docs` folder
-   Reach out to the community

---

**Remember:** This is built for real people running real stores. It's not perfect, but it's honest work. If something doesn't make sense or could be better, let us know. We're always learning and improving.

Happy store managing! 🎉
