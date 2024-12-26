document.addEventListener('DOMContentLoaded', function () {
    // Elementos do Dashboard
    const depositedElement = document.getElementById('deposited');
    const investedElement = document.getElementById('invested');
    const dailyReturnElement = document.getElementById('daily-return');
    const finalReturnElement = document.getElementById('final-return');

    // Carregar valores iniciais do localStorage
    let depositedAmount = parseFloat(localStorage.getItem('depositedAmount')) || 0;
    let investedAmount = parseFloat(localStorage.getItem('investedAmount')) || 0;
    let dailyReturn = parseFloat(localStorage.getItem('dailyReturn')) || 0;
    let finalReturn = parseFloat(localStorage.getItem('finalReturn')) || 0;

    // Atualizar o Dashboard
    depositedElement.textContent = `$${depositedAmount.toFixed(2)}`;
    investedElement.textContent = `$${investedAmount.toFixed(2)}`;
    dailyReturnElement.textContent = `$${dailyReturn.toFixed(2)}`;
    finalReturnElement.textContent = `$${finalReturn.toFixed(2)}`;

    // Registrar o depósito no localStorage
    function updateDeposited(amount) {
        depositedAmount += amount;
        localStorage.setItem('depositedAmount', depositedAmount);
        depositedElement.textContent = `$${depositedAmount.toFixed(2)}`;
    }

    // Registrar o investimento no localStorage
    function updateInvested(amount, returnAmount) {
        investedAmount += amount;
        localStorage.setItem('investedAmount', investedAmount);
        investedElement.textContent = `$${investedAmount.toFixed(2)}`;

        dailyReturn += returnAmount / 30; // Exemplo de cálculo de retorno diário
        finalReturn += returnAmount;
        localStorage.setItem('dailyReturn', dailyReturn);
        localStorage.setItem('finalReturn', finalReturn);

        dailyReturnElement.textContent = `$${dailyReturn.toFixed(2)}`;
        finalReturnElement.textContent = `$${finalReturn.toFixed(2)}`;
    }

    // Registrar o saque no localStorage
    function updateWithdraw(amount) {
        depositedAmount -= amount;
        if (depositedAmount < 0) depositedAmount = 0;
        localStorage.setItem('depositedAmount', depositedAmount);
        depositedElement.textContent = `$${depositedAmount.toFixed(2)}`;
    }

    // Integração com o formulário de depósito
    document.getElementById('payment-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        if (!isNaN(amount) && amount > 0) {
            updateDeposited(amount);
            alert(`Depósito de $${amount} recebido e atualizado no dashboard.`);

            // Redirecionar para o dashboard após o depósito
            window.location.href = "meu.html";
        }
    });

    // Integração com os planos de investimento
    document.querySelectorAll('.invest-button').forEach(button => {
        button.addEventListener('click', function () {
            const plan = this.closest('.plan');
            const rate = parseFloat(plan.getAttribute('data-rate'));
            const min = parseFloat(plan.getAttribute('data-min'));
            const max = parseFloat(plan.getAttribute('data-max'));
            const amountInput = plan.querySelector('.investment-amount');
            const amount = parseFloat(amountInput.value);

            if (!isNaN(amount) && amount >= min && amount <= max) {
                const returnAmount = amount + (amount * rate / 100);
                updateInvested(amount, returnAmount);
                alert(`Investimento de $${amount} realizado. Retorno de $${returnAmount.toFixed(2)} será creditado.`);
            } else {
                alert(`Por favor, insira um valor entre $${min} e $${max}.`);
            }
        });
    });

    // Integração com o formulário de saque
    document.getElementById('withdrawal-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('withdraw-amount').value);
        if (!isNaN(amount) && amount > 0 && amount <= depositedAmount) {
            updateWithdraw(amount);
            alert(`Saque de $${amount} processado e atualizado no dashboard.`);
        } else {
            alert('Saldo insuficiente para este saque.');
        }
    });
});
