async function fetchNetworkTasks() {
    const preloader = document.getElementById('preloader');
    const networkTaskList = document.getElementById('network-task-list');

    preloader.style.display = 'block';

    try {
        const url = getRandomFilterUrl();
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const tasks = await response.json();

        preloader.style.display = 'none';

        // if (tasks.length === 0) {
        //     throw new Error('Нет доступных данных');
        // }

        renderNetworkTasks(tasks);

        toastr.success('Данные успешно загружены!', 'Успех');
        // new toastr({ type: 'success', message: 'Данные успешно загружены!', title: 'Успех' });
    } catch (error) {
        console.log(error);
        preloader.style.display = 'none';

        Swal.fire({
            icon: 'error',
            title: 'Ошибка',
            text: error.message,
        });

        console.error(error);
    }
}

function renderNetworkTasks(tasks) {
    const networkTaskList = document.getElementById('network-task-list');
    networkTaskList.innerHTML = ''; // Очищаем список

    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.textContent = `${task.title} - ${task.completed ? 'Выполнено' : 'Не выполнено'}`;
        networkTaskList?.appendChild(li);
    });
}

function getRandomFilterUrl() {
    const random = Math.random();
    if (random > 0.5) {
        return 'https://jsonplaceholder.typicode.com/todos?_start=100&_limit=5';
    } else {
        return 'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5';
    }
}

toastr.options = {
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: '3000',
};

window.addEventListener('DOMContentLoaded', fetchNetworkTasks);









// async function fetchNetworkTasks() { 
//     const preloader = document.getElementById('preloader');
//     const networkTaskList = document.getElementById('network-task-list');

//     preloader.style.display = 'block';

//     try {
//         const url = getRandomFilterUrl(); 
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(Ошибка: ${response.status});
//         }

//         const tasks = await response.json();

//         preloader.style.display = 'none';

//         renderNetworkTasks(tasks);
//     } catch (error) {
//         preloader.textContent = '⚠ Не удалось загрузить данные';
//         console.error(error);
//     }
// }

// function renderNetworkTasks(tasks) {
//     const networkTaskList = document.getElementById('network-task-list');
//     networkTaskList.innerHTML = ''; // Очищаем список

//     tasks.forEach((task) => {
//         const li = document.createElement('li');
//         li.textContent = ${task.title} - ${task.completed ? 'Выполнено' : 'Не выполнено'};
//         networkTaskList.appendChild(li);
//     });
// }

// function getRandomFilterUrl() {
//     const random = Math.random();
//     if (random > 0.5) {
//         return 'https://jsonplaceholder.typicode.com/todos?_start=100&_limit=5';
//     } else {
//         return 'https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5';
//     }
// }

// window.addEventListener('DOMContentLoaded', fetchNetworkTasks);