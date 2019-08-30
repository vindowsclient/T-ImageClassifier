let net;
const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();

async function setupWebcam() {
    return new Promise((resolve, reject) => {
        const navigatorAny = navigator;
        navigatorAny.getUserMedia = navigatorAny.getUserMedia ||
            navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
            navigatorAny.msGetUserMedia;
        if (navigatorAny.getUserMedia) {
            navigatorAny.getUserMedia({ video: true },
                stream => {
                    webcamElement.srcObject = stream;
                    webcamElement.addEventListener('loadeddata', () => resolve(), false);
                },
                error => reject());
        } else {
            reject();
        }
    });
}


function addTable() {
    var myTableDiv = document.getElementById("myDynamicTable");
   // myTableDiv.removeChild();

    var table = document.createElement('TABLE');
    table.border = '1';
    //table.children().remove();
    
    var th1 = document.createElement('TH');
    th1.appendChild(document.createTextNode("Prediction"));
    table.appendChild(th1);

    var th2 = document.createElement('TH');
    th2.appendChild(document.createTextNode("Probability"));
    table.appendChild(th2);

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    //for (var i = 0; i < 5; i++) {
    //    var tr = document.createElement('TR');
    //    tableBody.appendChild(tr);

    //    var td1 = document.createElement('TD');
    //    td1.width = '75';
    //    var val1 = '${ result[i].className }';
    //    td1.appendChild(document.createTextNode(val1));
    //    tr.appendChild(td1);

    //    var td2 = document.createElement('TD');
    //    td2.width = '75';
    //    var val2 ='${ result[i].probability }'
    //    td2.appendChild(document.createTextNode(val2));
    //    tr.appendChild(td2);
       

    //    //for (var j = 0; j < 2; j++) {
    //    //    var td = document.createElement('TD');
    //    //    td.width = '75';
    //    //    td.appendChild(document.createTextNode("Cell " + i + "," + j));
    //    //    tr.appendChild(td);
    //    //}
    //}
    myTableDiv.appendChild(table);
    return tableBody;
}
//addTable();


async function app() {
    console.log('Loading mobilenet..');

    // Load the model.
    net = await mobilenet.load();
    console.log('Sucessfully loaded model');

    await setupWebcam();
    var tableBody = addTable();
    
    while (true) {
        const result = await net.classify(webcamElement);
        

        for (var i = 0; i < result.length; i++) {
            tableBody.children[i];
            
            var tr = document.createElement('TR');
            tableBody.appendChild(tr);

            var td1 = document.createElement('TD');
            td1.width = '175';
            var val1 = result[i].className; 
            td1.appendChild(document.createTextNode(val1));
            tr.appendChild(td1);

            var td2 = document.createElement('TD');
            td2.width = '75';
            var val2 = result[i].probability;
            td2.appendChild(document.createTextNode(val2));
            tr.appendChild(td2);


            //for (var j = 0; j < 2; j++) {
            //    var td = document.createElement('TD');
            //    td.width = '75';
            //    td.appendChild(document.createTextNode("Cell " + i + "," + j));
            //    tr.appendChild(td);
            //}
        }
      //  document.getElementById('console').innerText = `
      //prediction: ${result[0].className}\n
      //probability: ${result[0].probability}
        //`;
       // addTable(result);
        // Give some breathing room by waiting for the next animation frame to
        // fire.
        
        await tf.nextFrame();
    }
}

app();