$(document).ready(function () {
    var tasks = [{
        task: "Task 1",
        completed: false
    }];

    const $taskInput = $('#task-input');
    const $addTask = $('#add-task');
    const $taskList = $('#task-list');

    function renderTasks() {
        $taskList.empty(); 
        tasks.forEach((taskObj, index) => {
            const li = $('<ul><li></li></ul>').append(
                $('<input type="checkbox">').prop('checked', taskObj.completed),
                $('<span></span>').text(taskObj.task),
                $('<button class="delete-task"><i class="fa fa-trash"></i></button>')
            );

            if (taskObj.completed) {
                li.addClass('completed');
            }
            $taskList.append(li);
        });
    }

    function addNewTask(taskText) {
        tasks.push({
            task: taskText,
            completed: false
        });
        renderTasks();
    }

    $addTask.on('click', function () {
        const taskText = $taskInput.val().trim();
        if (taskText !== '') {
            addNewTask(taskText);
            $taskInput.val('');
        }
    });

    $taskInput.on('keypress', function (e) {
        if (e.which === 13) {
            $addTask.click();
        }
    });

    $taskList.on('change', 'input[type="checkbox"]', function () {
        const $li = $(this).closest('ul');
        const index = $taskList.children().index($li);

        const isChecked = $(this).is(':checked');
        tasks[index].completed = isChecked;

        if (isChecked) {
            $li.addClass('completed').appendTo($taskList); 
        } else {
            $li.removeClass('completed').insertBefore($taskList.children('.completed').first());
        }
    });

    $taskList.on('click', '.delete-task', function () {
        const $li = $(this).closest('ul');
        const index = $taskList.children().index($li);
        tasks.splice(index, 1);
        $li.remove();
    });

    renderTasks();
});