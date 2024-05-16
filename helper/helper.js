
function encryptPhoneNumber(phoneNumber) {
    let encrypted = '';
    for (let i = 0; i < phoneNumber.length; i++) {
        encrypted += String.fromCharCode(phoneNumber.charCodeAt(i) + 1);
    }
    return encrypted;
}


function decryptPhoneNumber(encryptedPhoneNumber) {
    let decrypted = '';
    for (let i = 0; i < encryptedPhoneNumber.length; i++) {
        decrypted += String.fromCharCode(encryptedPhoneNumber.charCodeAt(i) - 1);
    }
    return decrypted;
}




  
module.exports = { encryptPhoneNumber,decryptPhoneNumber };