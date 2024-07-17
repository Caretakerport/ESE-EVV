document.addEventListener('DOMContentLoaded', () => {
    const nameDropdown = document.getElementById('nameDropdown');
    const insuranceDisplay = document.getElementById('insuranceDisplay');
    const dateInput = document.getElementById('dateInput');
    const taskList = document.getElementById('taskList');
    const taskButtons = document.querySelectorAll('.taskBtn');

    const users = [
        { name: "Adam", inc: "CCSP" },
        { name: "Green", inc: "ABC" },
        { name: "Blue", inc: "XYZ" }
    ];

    // Populate name dropdown and insurance display
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.name;
        option.textContent = user.name;
        nameDropdown.appendChild(option);
    });

    nameDropdown.addEventListener('change', () => {
        const selectedUser = users.find(user => user.name === nameDropdown.value);
        insuranceDisplay.textContent = `INC: ${selectedUser.inc}`;
    });

    taskButtons.forEach(button => {
        button.addEventListener('click', () => {
            const selectedUser = users.find(user => user.name === nameDropdown.value);
            if (selectedUser) {
                addTask(button.dataset.color, selectedUser.name, selectedUser.inc, dateInput.value);
            } else {
                alert('Please select a user');
            }
        });
    });

    function addTask(color, name, inc, date) {
        if (!date) {
            alert('Please select a date');
            return;
        }

        const formattedDate = formatDate(date);
        let taskText;

        if (color === 'noWork') {
            taskText = `No Work - DATE: ${formattedDate}`;
        } else {
            taskText = `${name} - INC: ${inc} - DATE: ${formattedDate}`;
        }

        const li = document.createElement('li');
        li.textContent = taskText;
        li.style.color = color === 'green' ? 'green' : color === 'blue' ? 'blue' : 'black';

        const checkinBtn = document.createElement('button');
        checkinBtn.textContent = 'Check-in';
        checkinBtn.classList.add('checkin');
        checkinBtn.addEventListener('click', () => {
            storeTask(name, taskText);
            taskList.removeChild(li);
        });

        li.appendChild(checkinBtn);
        taskList.appendChild(li);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function storeTask(userName, taskText) {
        let tasks = JSON.parse(localStorage.getItem(`tasks_${userName}`)) || [];
        tasks.push(taskText);
        localStorage.setItem(`tasks_${userName}`, JSON.stringify(tasks));
    }
});
