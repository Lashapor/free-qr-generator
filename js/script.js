let qrCode = null;

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function generateQR() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();
    const error = document.getElementById('error');
    const qrContainer = document.getElementById('qrContainer');
    const downloadBtn = document.getElementById('downloadBtn');
    const generatedUrl = document.getElementById('generatedUrl');

    if (!url) {
        error.textContent = 'Please enter a URL';
        error.classList.add('active');
        return;
    }

    if (!isValidUrl(url)) {
        error.textContent = 'Please enter a valid URL (must start with http:// or https://)';
        error.classList.add('active');
        return;
    }

    error.classList.remove('active');

    // Clear previous QR code
    document.getElementById('qrcode').innerHTML = '';

    // Generate new QR code
    qrCode = new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // Show QR code and download button
    qrContainer.classList.add('active');
    downloadBtn.classList.add('active');
    generatedUrl.textContent = url;
}

function clearQR() {
    document.getElementById('urlInput').value = '';
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('qrContainer').classList.remove('active');
    document.getElementById('downloadBtn').classList.remove('active');
    document.getElementById('error').classList.remove('active');
    qrCode = null;
}

function downloadQR() {
    const canvas = document.querySelector('#qrcode canvas');
    if (!canvas) return;

    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const urlText = document.getElementById('urlInput').value;
    
    // Convert URL to filename: remove protocol and replace dots with underscores
    let filename = urlText.replace(/^https?:\/\//, ''); // Remove http:// or https://
    filename = filename.replace(/\//g, '_'); // Replace slashes with underscores
    filename = filename.replace(/\./g, '_'); // Replace dots with underscores
    filename = filename + '_qr.png';
    
    link.download = filename;
    link.href = url;
    link.click();
}

// Allow Enter key to generate QR code
document.getElementById('urlInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateQR();
    }
});
