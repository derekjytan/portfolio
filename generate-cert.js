import { execSync } from "child_process";
import fs from "fs";
import path from "path";

// Create certificates directory if it doesn't exist
const certDir = path.join(process.cwd(), "server", "cert");
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

const keyPath = path.join(certDir, "key.pem");
const csrPath = path.join(certDir, "csr.pem");
const certPath = path.join(certDir, "cert.pem");

console.log("Generating self-signed certificates for local development...");

try {
  // Generate private key
  execSync(`openssl genrsa -out "${keyPath}" 2048`);

  // Generate certificate signing request
  execSync(
    `openssl req -new -key "${keyPath}" -out "${csrPath}" -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"`
  );

  // Generate self-signed certificate (valid for 365 days)
  execSync(
    `openssl x509 -req -days 365 -in "${csrPath}" -signkey "${keyPath}" -out "${certPath}"`
  );

  // Remove certificate signing request (no longer needed)
  fs.unlinkSync(csrPath);

  console.log("Certificates generated successfully!");
  console.log(`Certificates stored in: ${certDir}`);
  console.log(
    "\nNote: Since these are self-signed certificates, your browser will show a security warning."
  );
  console.log(
    "You will need to accept the risk to proceed when accessing the application."
  );
} catch (error) {
  console.error("Error generating certificates:", error.message);
  process.exit(1);
}
