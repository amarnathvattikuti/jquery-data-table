$(document).ready(function () {
    var initialRow = "<tr><td colspan='6' class='text-center p-2'>Add Rows to the table.</td></tr>";
    loadData_From_LocalStore();
    //add rows
    $('form').on('submit', function (e) {
       
        e.preventDefault();
        e.stopPropagation();

        var name = $("#Name").val();
        var position = $("#Position").val();
        var office = $("#Office").val();
        var extn = $("#Extn").val();
        var date = $("#Date").val();
        var salary = $("#Salary").val();

        if ((name == "") && (position == "") && (office == "") && (extn == "") && (date == "") && (salary == "")) {
            //'use strict';
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener('submit', function (event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.removeEventListener('submit');
                    form.classList.add('was-validated');
                }, false);
            });
        }
        // console.log('hitting');
        // debugger;           
        if ( ($("#txtId").val() == '') && (name != "") && (position != "") && (office != "") && (extn != "") && (date != "") && (salary != "")) {
            addDataToLocal();
            setBackToDefault();
        } else {
            updateDataFromLocal();
        }
        setBackToDefault();
        $("#success").show();
        setTimeout(function () {
            $("#success").hide();
            window.location.reload();
        }, 2000);
    });


    function setBackToDefault() {
        $("#Name").val("");
        $("#Position").val("");
        $("#Office").val("");
        $("#Extn").val("");
        $("#Date").val("");
        $("#Salary").val("");
    };

  //add initail row, when there is no data.
  function addInitailRow() {     
    if ($("#tableData tbody").children().children().length == 0) {
      $("#tableData tbody").append(initialRow);
    }
  }  

    //delete row.
    $('body').on('click', '.delete', function () {
        // console.log('hitting');     
        $(this).parents('tr').remove();
        const id = $(this).parent().parent().find(".Name").attr("data-id");
        deleteDataFromLocal(id);
    });

    $('body').on('click', ' .edit', function () {
        const name = $(this).parents('tr').attr('data-name');
        const position = $(this).parents('tr').attr('data-position');
        const office = $(this).parents('tr').attr('data-office');
        const extn = $(this).parents('tr').attr('data-extn');
        const date = $(this).parents('tr').attr('data-date');
        const salary = $(this).parents('tr').attr('data-salary');
        // const id = $(this).parent().parent().find(".Name").attr("data-id");
        // $("#txtId").val(id);


        $(this).parents('tr').find('.Name').html("<input name='edit_text' value='" + name + "'>");
        $(this).parents('tr').find('.Position').html("<input name='edit_position' value='" + position + "'>");
        $(this).parents('tr').find('.Office').html("<input name='edit_office' value='" + office + "'>");
        $(this).parents('tr').find('.Extn').html("<input name='edit_extn' value='" + extn + "'>");
        $(this).parents('tr').find('.Date').html("<input name='edit_date' value='" + date + "'>");
        $(this).parents('tr').find('.Salory').html("<input name='edit_salary' value='" + salary + "'>");

        $(this).parents('tr').find('td:eq(6)').prepend("<a class='mr-3 update'><i class='fa fa-check' aria-hidden='true'></i></a>");
        $(this).hide()
    });

    $('body').on('click', '.update', function () {
        var name = $(this).parents('tr').find("input[name='edit_text']").val();
        var position = $(this).parents('tr').find("input[name='edit_position']").val();
        var office = $(this).parents('tr').find("input[name='edit_office']").val();
        var extn = $(this).parents('tr').find("input[name='edit_extn']").val();
        var date = $(this).parents('tr').find("input[name='edit_date']").val();
        var salary = $(this).parents('tr').find("input[name='edit_salary']").val();
        // const id = $(this).parent().parent().find(".Name").attr("data-id");
        // $("#txtId").val(id);

        $(this).parents('tr').find('.Name').text(name);
        $(this).parents('tr').find('.Position').text(position);
        $(this).parents('tr').find('.Office').text(office);
        $(this).parents('tr').find('.Extn').text(extn);
        $(this).parents('tr').find('.Date').text(date);
        $(this).parents('tr').find('.Salory').text(salary);

        $(this).parents('tr').attr('data-name', name);
        $(this).parents('tr').attr('data-position', position);
        $(this).parents('tr').attr('data-office', office);
        $(this).parents('tr').attr('data-extn', extn);
        $(this).parents('tr').attr('data-date', date);
        $(this).parents('tr').attr('data-salary', salary);

        $(this).parents('tr').find('.edit').show();
        $(this).parents('tr').find('.update').remove();

        updateDataFromLocal();
    });

    //local-Storage
    function addDataToLocal() {

        let localData = localStorage.getItem('data');
        if (localData) {
            let localStore = JSON.parse(localData);
            const obj = {
                id: localStore.length + 1,
                name: $("#Name").val(),
                position: $("#Position").val(),
                office: $("#Office").val(),
                extn: $("#Extn").val(),
                date: $("#Date").val(),
                salary: $("#Salary").val()
            };
            localStore.push(obj);
            localStorage.setItem('data', JSON.stringify(localStore));
            loadData_From_LocalStore();
        } else {
            const localStore = [];
            const obj = {
                id: 1,
                name: $("#Name").val(),
                position: $("#Position").val(),
                office: $("#Office").val(),
                extn: $("#Extn").val(),
                date: $("#Date").val(),
                salary: $("#Salary").val()
            };
            localStore.push(obj);
            localStorage.setItem('data', JSON.stringify(localStore));
            loadData_From_LocalStore();
        }
        setBackToDefault();
    }

    //upadte to localStorage
    function updateDataFromLocal() {

        let localData = localStorage.getItem('data');
        let localStore = JSON.parse(localData);
        const OrgObj = localStore.find(obj => obj.id == $("#txtId").val());
        OrgObj.name = $("#Name").val();
        OrgObj.position = $("#Position").val();
        OrgObj.office = $("#Office").val();
        OrgObj.extn = $("#Extn").val();
        OrgObj.date = $("#Date").val();
        OrgObj.salary = $("#Salary").val();
        localStorage.setItem('data', JSON.stringify(localStore));
        loadData_From_LocalStore();
        setBackToDefault();
    }


    // load localstorage objects
    function loadData_From_LocalStore() {
        let localData = localStorage.getItem('data');
        if (localData) {
            $("#tableData tbody").html("");
            let localStore = JSON.parse(localData);
            localStore.forEach(element => {
                let AddRowToTable = "<tr data-name='" + element.name + "' data-position='" + element.position + "' data-office='" + element.office + "' data-extn='" + element.extn + "' data-date='" + element.date + "' data-salary='" + element.salary + "'>";
                AddRowToTable = AddRowToTable + "<td class='py-3 px-2 Name' data-id='" + element.id + "'> " + element.name + "</td>";
                AddRowToTable = AddRowToTable + "<td class='Position'>" + element.position + "</td>";
                AddRowToTable = AddRowToTable + "<td class='Office'>" + element.office + "</td>";
                AddRowToTable = AddRowToTable + "<td class='Extn'>" + element.extn + "</td>";
                AddRowToTable = AddRowToTable + "<td class='Date'>" + element.date + "</td>";
                AddRowToTable = AddRowToTable + "<td class='Salory'>" + element.salary + "</td>";
                AddRowToTable = AddRowToTable + "    <td class='tdAction text-center'>";
                AddRowToTable = AddRowToTable + "       <a class='edit mr-2' style='cursor: pointer; color: green'><i class='fa-solid fa-pen-to-square'></i></a>";
                AddRowToTable = AddRowToTable + "       <a class='delete ml-1' style='cursor: pointer; color: red'><i class='fa fa-trash' aria-hidden='true'></i></a>";
                AddRowToTable = AddRowToTable + "    </td>";
                AddRowToTable = AddRowToTable + " </tr>";
                $("#tableData tbody").prepend(AddRowToTable);
            });
        }
        addInitailRow();
    }

    // delete row.
    function deleteDataFromLocal(id) {

        let localData = localStorage.getItem('data');
        let localArray = JSON.parse(localData);
        let i = 0;
        while (i < localArray.length) {
            if (localArray[i].id === Number(id)) {
                localArray.splice(i, 1);
            } else {
                ++i;
            }
        }
        localStorage.setItem('data', JSON.stringify(localArray));
        loadData_From_LocalStore
    }

});