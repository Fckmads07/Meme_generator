const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const resultEl = document.getElementById("result");

function calculateAge() {
    const birthdayValue = birthdayEl.value;
    if (birthdayValue === "") {
        alert("Please enter your birthday.");
        
    }else{
        const age = getAge(birthdayValue);
        resultEl.textContent = `Your age is: ${age} ${age >1 ? "years" : "year"}
        old`;
     }

    }
    function getAge(birthdayValue){
        const currentDate = new Date();
        const birthDate = new Date(birthdayValue);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthDifference = currentDate.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || 
            (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    btnEl.addEventListener("click", calculateAge);