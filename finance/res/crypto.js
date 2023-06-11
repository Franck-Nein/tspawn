    const encryptWithAES = (text, passphrase) => {
      return CryptoJS.AES.encrypt(text, passphrase).toString();
    };

    const decryptWithAES = (ciphertext, passphrase) => {
      const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
      const originalText = bytes.toString(CryptoJS.enc.Utf8);
      return originalText;
    };
