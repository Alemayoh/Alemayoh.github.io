window.onload = function() {
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
            const validDeposit = /(-?[0-9]+(\.[0-9]+)?)/;
            if ((validAcc_Name.test(accountName.value)) && (validDeposit.test(deposit.value))) {
                acc_type = accountName.value;
                balance = deposit.value;
                return {
                    userAccountName: acc_type,
                    userBalance: balance
                }

            } else {
                return null;
            }
        }
        return {
            AccountCreator: create
        };
    })();

    createButton.onclick = () => {

        const CreateAccount = MyModule.AccountCreator();
        if (CreateAccount) {
            accountInfoList.push(CreateAccount);
            textarea.value = textarea.value + " Account name: " + CreateAccount.userAccountName +
                "\tBalance: " + CreateAccount.userBalance + "\n";

        }
        accountName.value = "";
        deposit.value = "";
        accountName.focus();
    };

};