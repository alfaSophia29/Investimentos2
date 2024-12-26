function showPaymentDetails() {
    // Hide all payment details sections
    document.querySelectorAll('.payment-details').forEach(section => {
        section.classList.add('hidden');
    });

    // Get the selected payment method
    const paymentMethod = document.getElementById('payment-method').value;

    // Show the relevant payment details section and manage the submit button
    if (paymentMethod === 'paypal') {
        document.getElementById('paypal-details').classList.remove('hidden');
        document.getElementById('submit-button-container').classList.remove('hidden');
    } else if (paymentMethod === 'credit_card') {
        document.getElementById('credit-card-details').classList.remove('hidden');
        document.getElementById('submit-button-container').classList.remove('hidden');
    } else if (paymentMethod === 'crypto') {
        document.getElementById('crypto-details').classList.remove('hidden');
        document.getElementById('submit-button-container').classList.add('hidden');
        generateCryptoCode();  // Automatically generate a code when crypto is selected
    }
}

function generateCryptoCode() {
    const cryptoCode = 'CRYPTO-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('crypto-code').value = cryptoCode;
}

function copyCryptoCode() {
    const cryptoCodeInput = document.getElementById('crypto-code');
    cryptoCodeInput.select();
    document.execCommand("copy");
    alert("Crypto code copied to clipboard!");
}
