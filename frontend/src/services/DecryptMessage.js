function decryptMessage(rawCode, key) {
    let base64Code = "";
    for (var i=0; i<rawCode.length; i++) {
        let char = String.fromCharCode(rawCode.charCodeAt(i) - key);
        base64Code += char;
    }

    const decoded = atob(base64Code);
    return decoded;
}

export default decryptMessage;