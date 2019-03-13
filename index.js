$(document).ready(function () {
    console.log("ready!");
    // Dynamic Addition of Text Boxes

    $('#selectNum').change(function (e) {
        var selectedNum = e.target.value;

        var inputs = $("#TextBoxContainer").find($("input"));

        var count = inputs.length;
        var requested = selectedNum;

        if (requested > count) {
            for (i = count; i < requested; i++) {
                $("#TextBoxContainer").append(GetDynamicTextBox(""));
            }
        } else if (requested < count) {
            var x = requested - 1;
            $("#TextBoxContainer input:gt(" + x + ")").remove();
            $("#TextBoxContainer p:gt(" + x + ")").remove();
        }

        function GetDynamicTextBox(value) {
            return '<p>Enter Author Id:</p><input class = "DynamicTextBox" type="number" value = "' + value + '" />'
        }
    });
    //End of Dynamic Text Boxes
    //Submit Button Start  1741101
    $("#submitbtn").bind("click", function () {
        var values = [];
        $(".DynamicTextBox").each(function () {
            values.push($(this).val());
        });
        var authorId = [];
        authorId = values;

        for (i = 0; i < authorId.length; i++) {
            $.get(`https://api.semanticscholar.org/v1/author/${authorId[i]}`, {}, function (response) {
                console.log("success", response);
                $('#display-data').append(GetDynamicDataBoxes(response.name));

            });
        }

        function GetDynamicDataBoxes(aname) {
            return '<p>Author Name :' + aname + '</p>'
        }

    });
    //End of Submit Button






});