let baseUrl = 'http://localhost:5145/'

var login = prompt("Введите логин")

// Auth
axios({
    method: 'get',
    headers: {'ApiKey': 'Rubic121314'},
    url: baseUrl + 'api/user/auth/' + login
  })
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);

    

    if (response.data['codeA'] != null) {
        document.getElementById("input1").value = response.data['codeA'];
    } else document.getElementById("input1").value = '';
    if (response.data['codeB'] != null) {
        document.getElementById("input2").value = response.data['codeB'];
    } else document.getElementById("input2").value = '';
    if (response.data['codeC'] != null) {
        document.getElementById("input3").value = response.data['codeC'];
    } else document.getElementById("input3").value = '';
    if (response.data['codeD'] != null) {
        document.getElementById("input4").value = response.data['codeD'];
    } else document.getElementById("input4").value = '';
});

function UpdateCode() {
    let code = '0';
    if (!document.getElementById("input1").value === "") code = document.getElementById("input1").value
    if (document.getElementById("input2").value) code = document.getElementById("input2").value
    if (document.getElementById("input3").value) code = document.getElementById("input3").value
    if (document.getElementById("input4").value) code = document.getElementById("input4").value
console.log(document.getElementById("input2").value)
    axios({
        method: 'put',
        headers: {'ApiKey': 'Rubic121314'},
        url: baseUrl + "api/user/code/" + login + code
    })
    .then(function (response) {
        console.log(response.data);
        console.log(response.status);

        let progress = Number(response.data['progress']);

        switch(progress) {
            case 0:
                UpdateInput(null, null, null, null);
                break;
            case 1:
                UpdateInput(response.data['codeA'], null, null, null);
                break;
            case 2:
                UpdateInput(response.data['codeA'], response.data['codeB'], null, null);
                break;
            case 3:
                UpdateInput(response.data['codeA'], response.data['codeB'], response.data['codeC'], null);
                break;
            case 4:
                UpdateInput(response.data['codeA'], response.data['codeB'], response.data['codeC'], response.data['codeD']);
                break;
        }
    });
}

function UpdateInput(codeA, codeB, codeC, codeD) {
    if (codeA != null) document.getElementById("input1").value = codeA;
    if (codeB != null) document.getElementById("input2").value = codeB;
    if (codeC != null) document.getElementById("input3").value = codeC;
    if (codeD != null) document.getElementById("input4").value = codeD;
}

// function Fake() {
//     document.document.querySelector('#sp1').style.boxShadow = 'box-shadow: 0 0 400px rgba(82, 123, 206, 1.0);';
//     document.body.style.background = '#222222';
//     console.log("fghfgh")
// }