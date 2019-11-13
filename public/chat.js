$(document).ready(function () {
    socket = io.connect("http://localhost:6969");

    socket.color = getRandomColor();
    // receive
    socket.on('newCanvasWithData', newConnection);
    socket.on('mouse', newDrawing);

    var ready = false;

    $("#submit").submit(function (e) {
        e.preventDefault();
        $("#nick").fadeOut();
        $("#chat").fadeIn();
        var name = $("#nickname").val();
        var time = new Date();
        $("#name").html(name);
        $("#time").html('First login: ' + time.getHours() + ':' + time.getMinutes());

        ready = true;
        $("#defaultCanvas0").css("top", "0");
        $("#defaultCanvas0").css("left", "0");
        socket.emit('join', name);
    });

    $("#textarea").keypress(function (e) {
        if (e.which == 13) {
            var text = $("#textarea").val();
            $("#textarea").val('');
            var time = new Date();
            $(".chat").append('<div><span>' +
                $("#nickname").val() + ':</span><p> ' + text + '</p></div>');
            socket.emit('send', text);
        }
    });

    socket.on("update", function (msg) {
        if (ready) {
            $('.chat').append('<li class="info">' + msg + '</li>')
        }
    });

    socket.on("chat", function (client, msg) {
        if (ready) {
            var time = new Date();
            $(".chat").append('<div><span>' +
                client + ':</span><p>' + msg + '</p></div>');
        }
    });

});