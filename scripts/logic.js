// Question 1

function generateReports(students) {
    //O(n * m) where n is the number of students and m is the number of scores per student
    return students.map(student => {  //O(n)
        const average = Math.round(student.scores.reduce((sum, score) => sum + score, 0) / student.scores.length); //O(m) * O(1) = O(m)

        const grade = average >= 90 ? 'A' :
            average >= 80 ? 'B' :
                average >= 70 ? 'C' :
                    average >= 60 ? 'D' : 'F';

        return {
            name: student.name,
            average,
            grade
        };
    });
}

const students = [
    { name: "Alice", scores: [90, 86, 92] },
    { name: "Bob", scores: [70, 68, 72] },
    { name: "Charlie", scores: [100, 100, 100] }
];

console.log(generateReports(students));

//Question 2
class BankAccount {
    constructor(ownerName, initialBalance) {
        this.ownerName = ownerName;
        this.balance = initialBalance;
        this.history = [];
    }

    deposit(amount) {
        //O(1)
        this.balance += amount;
        this.history.push(`Deposited $${amount}`);
    }

    withdraw(amount) {
        // O(1)
        if (amount <= this.balance) { 
            this.balance -= amount;
            this.history.push(`Withdrew $${amount}`); 
        } else {
            console.log("You don't have enough money for this operation.");
        }
    }

    transferTo(anotherAccount, amount) {
        //O(1)
        if (amount <= this.balance) {
            this.withdraw(amount);
            anotherAccount.deposit(amount);
            this.history.push(`Transferred $${amount} to ${anotherAccount.ownerName}`);
        } else {
            console.log("You don't have enough money for this operation.");
        }
    }

    getSummary() {
        //O(1)
        return `${this.ownerName}'s balance is $${this.balance}`;
    }

    printHistory() {
        //O(n) where n is the number of history entries
        console.log(`${this.ownerName}'s Transaction History:`); 
        this.history.forEach(entry => console.log(entry));
    }
}

const acc1 = new BankAccount("John", 500);
const acc2 = new BankAccount("Sara", 300);
acc1.transferTo(acc2, 200);
console.log(acc1.getSummary());
console.log(acc2.getSummary());
acc1.printHistory();


//Q4
const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-btn');
const taskList = document.querySelector('.task-list');

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        taskSpan.classList.add('task-text');

        taskSpan.addEventListener('click', () => {
            taskSpan.classList.toggle('completed');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'ْX';
        deleteBtn.classList.add('delete-btn');

        deleteBtn.addEventListener('click', () => {
            li.remove();  
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
        taskInput.value = '';
    }
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
