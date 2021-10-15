const crypto = require("crypto");
const algorithm = "AES-256-ECB";
const key = crypto
  .createHash("sha256")
  .update(String(process.env.CRYPTO_KEY))
  .digest("base64")
  .substr(0, 32);

function encrypt(data) {
  try {
    const cipher = crypto.createCipheriv(algorithm, key, null);
    const encrypted = cipher.update(data, "utf8", "hex") + cipher.final("hex");
    return encrypted;
  } catch (error) {
    return null;
  }
}

function decrypt(data) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, null);
    const decrypted =
      decipher.update(data, "hex", "utf8") + decipher.final("utf8");
    return decrypted;
  } catch (error) {
    return null;
  }
}

module.exports = { encrypt, decrypt };
