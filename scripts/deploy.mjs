import dotenv from "dotenv";
import FtpDeploy from "ftp-deploy";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const path = require('path')
dotenv.config({ path: "/.env" });

async function main() {
  try {
        // Replace "/out" with your build directory which contains all generated static files
        const outDir = path.join(process.cwd(), "/");

        await new FtpDeploy().deploy({
            user: 'bos.ultimopay.io', // Your credentials
            password: 'sj7mckHBxP/E6PM', // Your credentials
            host: '94.130.71.45', // Your credentials
            port: 21, // Your credentials

            localRoot: outDir, // Location of build files in project
            remoteRoot: "/var/www/bos.ultimopay.io", // Upload location on remote, replace with subfolder on FTP-server if required

            include: ["*", "**/*"], // Upload all files from build folder
            exclude: [], // Exclude no files

            deleteRemote: true``, // Set to true if you want to delete ALL FILES in the remote root before uploading
            forcePasv: true // Use passive mode
        })

        console.log("Succesfully deployed site")
        return 0;
    } catch (e) {
        console.error("An error occured during deployment:", e);
        return 1;
  }
}

main().then((code) => process.exit(code));