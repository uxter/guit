(function() {
    var socket = io.connect('http://localhost:8018');
    var view = document.getElementById('view');
    var runSpecs = document.getElementById('runSpecs');
    var log = document.getElementById('log');
    var img = document.createElement('img');
    view.appendChild(img);
    socket.on('image::update', function (url) {
        img.src = url;
    });
    socket.on('log', function (data) {
        log.innerHTML += '<li>' +
            '<span class="label label-primary">' + data.cmd + '</span> ' +
            (data.title ? data.title : '') +
            (data.status === true && ' <span class="label label-success">OK</span>' ||
            data.status === false && ' <span class="label label-danger">FAIL</span>' || '') +
            '</li>';
    });
    runSpecs.onclick = function() {
        socket.emit('spec::run');
    };
})();
