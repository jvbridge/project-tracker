setInterval(() => {
    $("#time").text(moment().format("HH:mm:ss"));
},1000)