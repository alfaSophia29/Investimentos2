function showPaymentForm() {
    // Obtém o método de pagamento selecionado
    const paymentMethod = document.getElementById('payment_method').value;
    const investmentAmount = document.getElementById('investment_amount').value;
    const plan = document.getElementById('plan').selectedOptions[0].text;

    // Esconde todos os formulários
    document.getElementById('paypal-form').classList.add('hidden');
    document.getElementById('credit-card-form').classList.add('hidden');
    document.getElementById('crypto-form').classList.add('hidden');

    // Mostra o formulário correspondente
    if (paymentMethod === 'paypal') {
        document.getElementById('paypal-item-name').value = plan;
        document.getElementById('paypal-amount').value = investmentAmount;
        document.getElementById('paypal-form').classList.remove('hidden');
    } else if (paymentMethod === 'credit_card') {
        document.getElementById('credit-card-form').classList.remove('hidden');
    } else if (paymentMethod === 'crypto') {
        document.getElementById('crypto-form').classList.remove('hidden');
    }
}
