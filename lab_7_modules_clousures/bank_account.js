loadPage = function() {
    const accountName = document.getElementById("accountName");
    const deposit = document.getElementById("deposit");
    const createButton = document.getElementById("createButton");
    const textarea = document.getElementById("textarea");
    let accountInfoList = [];

    const MyModule = (function() {
        let acc_type;
        let balance;

        const create = function() {
            //pattern
            const validAcc_Name = /^[A-Za-z]/;
            const validdeposit = /\-?\d+\.\d{2}$/;
            if (validAcc_Name.test(accountName.value) && (validAcc_Name.test(deposit.value))) {
                acc_type = accountName;
                balance = deposit;
                return {
                    userAccountName = acc_type,
                    userBalance = balance
                }
            } else {
                return null;
            }
        }
        return {
            AccountCreator = create
        };
    })();
    createButton.onclick = () => {

        const CreateAccount = new MyModule.create();
        accountInfoList.push(CreateAccount);
        if (CreateAccount) {
            textarea.value = textarea.value + "Account Name:" + CreateAccount.userAccountName +
                "Balance:" + CreateAccount.userBalance + "\n";
        }
        userAccountName.value = "";
        userBalance.value = "";
        userAccountName.focus();

    }

}
window.onload = loadPage;