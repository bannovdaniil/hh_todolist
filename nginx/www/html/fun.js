function getAddTask() {
    var text = `<form id="addform" method="POST" name="saveForm" style="display:inline!important; margin: 0; padding: 0;">
		Task Name: <input type="text" value="" name = "task"><br>
	<br><br>
  <span class="sendbutton">
  <input class="addtask" type="submit" name="send" value=" Save " OnClick="return sendNewTask();"></span><br>
  <span class="closebutton">
  <button type="button" onClick="closeEdit();"> Close </button></span>
</form>
`
    $('.container').addClass('blur');
    $(".editpanel").html(text).show();
}

function sendNewTask() {
    var form = document.getElementById('addform');

    var taskname = form.task.value;
    $.ajax({
        url: "http://localhost/api/v1/add",
        type: "POST",
        data:
            {
                'task': taskname
            },
        cache: false,
        success: function (data) {
            getTask(data.id);
            closeEdit()
            getAllTask();

        }
    });
    return false;
}


function editTask(n) {
    getTask(n);

    $.getJSON('http://localhost/api/v1/get/' + n, function (data) {
        var taskname = escapeHtml(data.taskName);
        var as = "selected";
        var cs = "";
        var ws = "";
        switch (data.taskStatus) {
            case 'COMPLETED':
                cs = "selected";
                as = "";
                break;
            case 'WORK':
                ws = "selected";
                as = "";
                break;

        }
        var text = `<form id="tip" method="POST" name="editForm${n}" style="display:inline!important; margin: 0; padding: 0;">
	<input type="hidden" name="_method" value="put" />
		ID: ${n}<input type="hidden" value="${n}" name = "id"><br>
		Task Name: <input type="text" value="${taskname}" name = "task"><br>
		Task Status:
		<select name="status" id="status-select">
    			<option value="ACTIVE" ${as}>ACTIVE</option>
  			<option value="COMPLETED" ${cs}>COMPLETED</option>
  			<option value="WORK" ${ws}>WORK</option>
		</select>
	<br><br>
  <span class="sendbutton">
  <input class="addtask" type="submit" name="send" value=" Edit " OnClick="return sendEditTask(${n});"></span><br>
  <span class="closebutton">
  <button type="button" onClick="closeEdit();"> Close </button></span>
</form>
`
        $('.container').addClass('blur');
        $(".editpanel").html(text).show();
    });
}

function closeEdit() {
    $('.editpanel').html('').hide();
    $('.container').removeClass('blur');
}

function sendEditTask(vid) {
    var form = document.getElementById('tip');

    var id = form.id.value;
    var taskname = form.task.value;
    var status = form.status.value;
    $.ajax({
        url: "http://localhost/api/v1/update/" + id,
        type: "PUT",
        data:
            {
                'task': taskname,
                'status': status
            },
        cache: false,
        success: function (html) {
            $(".taskpanel").html('Data Send');
            closeEdit()
            getAllTask();

        }
    });
    return false;
}

function deleteTask(n) {
    $.ajax({
        url: 'http://localhost/api/v1/delete/' + n,
        type: 'DELETE',
        success: function (result) {
            var text = `task ID: ${n} deleted.`
            $(".taskpanel").html(text);
            getAllTask();
        }
    });
}

function getTask(n) {
    $.getJSON('http://localhost/api/v1/get/' + n, function (data) {

        var text = `ID: ${data.id}<br>
                    Create time: ${data.taskTime}<br>
                    Task name: ${escapeHtml(data.taskName)}<br>
                    Status: ${data.taskStatus}<br>`


        $(".taskpanel").html(text);
    });
}

function getAllTask() {
    $.getJSON('http://localhost/api/v1/getAll/', function (data) {
        var text = '<div class="row"><span class="col">ID</span><span class="col">Create time</span><span class="col">Status</span><span class="colname">Task Name</span><span class="col">Action</span></div>';
        for (var i = 0; i < data.length; i++) {
            var classStyle = "row";
            if (data[i].taskStatus === "COMPLETED") {
                classStyle = "compliteditem";
            }
            if (data[i].taskStatus === "WORK") {
                classStyle = "workitem";
            }
            text = text + `<div class="${classStyle}">
                    <span class="col">${data[i].id}</span>
                    <span class="col">${data[i].taskTime.replace("T", " ")}</span>
                    <span class="col">${data[i].taskStatus}</span>
                    <span class="colname">${escapeHtml(data[i].taskName)} </span>
                    <span class="col">
                    <button class="but" id="id${data[i].id}" type="button" OnClick="getTask(${data[i].id});">Show[${data[i].id}]</button>
                    <button class="but" id="delete${data[i].id}" type="button" OnClick="deleteTask(${data[i].id});">Delete[${data[i].id}]</button>
                    <button class="but" id="edit${data[i].id}" type="button" OnClick="editTask(${data[i].id});">Edit[${data[i].id}]</button>
                    </span></div>`

        }
        $(".displayall").html(text);
    });
}

function getAllStatusTask(status) {
    $.getJSON('http://localhost/api/v1/getAll?status=' + status, function (data) {
        var text = '<div class="row"><span class="col">ID</span><span class="col">Create time</span><span class="col">Status</span><span class="colname">Task Name</span><span class="col">Action</span></div>';
        for (var i = 0; i < data.length; i++) {
            var classStyle = "row";
            if (data[i].taskStatus === "COMPLETED") {
                classStyle = "compliteditem";
            }
            if (data[i].taskStatus === "WORK") {
                classStyle = "workitem";
            }
            text = text + `<div class="${classStyle}">
                    <span class="col">${data[i].id}</span>
                    <span class="col">${data[i].taskTime.replace("T", " ")}</span>
                    <span class="col">${data[i].taskStatus}</span>
                    <span class="colname">${escapeHtml(data[i].taskName)} </span>
                    <span class="col">
                    <button class="but" id="id${data[i].id}" type="button" OnClick="getTask(${data[i].id});">Show[${data[i].id}]</button>
                    <button class="but" id="delete${data[i].id}" type="button" OnClick="deleteTask(${data[i].id});">Delete[${data[i].id}]</button>
                    <button class="but" id="edit${data[i].id}" type="button" OnClick="editTask(${data[i].id});">Edit[${data[i].id}]</button>
                    </span></div>`

        }
        $(".displayall").html(text);
    });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
