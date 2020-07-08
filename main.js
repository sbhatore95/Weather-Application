celsius = 0;
tr_count = 0;

window.onload = function (){
    tr_count = parseInt(localStorage.getItem("tr_count"));
    if(tr_count === NaN)
        tr_count = 0;
    let item = localStorage.getItem("item");
    if(item != null && item != "null"){
        console.log('hey')
        let tbl = document.querySelector('.recent');
        tbl.innerHTML = JSON.parse(item);
        fun();
    }
}
document.querySelector('.btn-prime').onclick = function () {
    // forming xhr request
    let xhr = new XMLHttpRequest();
    let access_key = "fecc9f824331849e23307ccc6fac6c85";
    let query = document.querySelector('.main').value;
    // let query = "new york"
    let units = 'm';
    xhr.open('GET', 'http://api.weatherstack.com/current?access_key=' 
    + access_key + '&query=' 
    + query + '&units='
    + units);

    xhr.send();

    xhr.onload = function() {
        if (xhr.status != 200) { // HTTP error?
            // handle error
            alert( 'Error: ' + xhr.status);
            return;
        }

        var resp = JSON.parse(xhr.response);
        // alert(resp["request"]);
        let prt = document.querySelector('.weather');
        var p = document.createElement("p");
        document.querySelector('.toggle').style.display = "block";
        td = document.querySelector('#temp');
        td.innerHTML = resp["current"]["temperature"] + " degree C";
        celsius = td.innerHTML;
        prt.appendChild(p);
        // var btn = document.createElement("button");
        // btn.class = "btn-degree";
        // btn.textContent = "Toggle Scale"
        // prt.appendChild(btn);
        td2 = document.querySelector('.img');
        var img = document.createElement("img");
        img.src = resp["current"]["weather_icons"][0];
        if(td2.hasChildNodes())
            td2.removeChild(td2.firstChild);    
        td2.appendChild(img);
        
        // header table making
        let header = document.querySelector(".header");
        // create heading of the table if no rows
        if (tr_count == 0){
            var tr_1 = document.createElement('tr');
            var td_1 = document.createElement('td');
            var td_2 = document.createElement('td');
            var td_3 = document.createElement('td');
            td_1.innerText = 'Location';
            td_2.innerText = 'Timestamp';
            td_3.innerText = 'Weather';
            td_1.setAttribute('id', 'td-1');
            td_2.setAttribute('id', 'td-2');
            td_3.setAttribute('id', 'td-3');
            header.appendChild(tr_1);
            tr_1.appendChild(td_1);
            tr_1.appendChild(td_2);
            tr_1.appendChild(td_3);
        }
        /* Recent table appending
            Below code creates new row inside the recent history table.
        */
        var rec_tab = document.querySelector('.recent-table'); // fetching recent table
        // Create tr and td elements of the recent table
        var tr = document.createElement('tr');
        var td_loc = document.createElement('td');
        var td_time = document.createElement('td');
        var td_weath = document.createElement('td');
        // putting values inside td
        td_loc.innerText =  resp["location"]["name"];
        td_time.innerText = resp["location"]["localtime"];
        var desc = resp["current"]["weather_descriptions"];
        weath_text = "";
        for(i=0;i<desc.length;i++){
            weath_text += desc[i] + ' ';
        }
        td_weath.innerText = weath_text;
        // tr setting attribute
        tr.setAttribute('id', tr_count);
        tr_count += 1; // incrementing the row count by one.
        // tr appending
        rec_tab.appendChild(tr);
        // td setting attribute
        td_loc.setAttribute('id', 'td-1');
        td_time.setAttribute('id', 'td-2');
        td_weath.setAttribute('id', 'td-3');
        // td appending
        tr.appendChild(td_loc);
        tr.appendChild(td_time);
        tr.appendChild(td_weath);
        fun();
        if(tr_count >= 1){
            var btn_clear = document.querySelector('.clear');
            btn_clear.style.display = 'block';
        }
        // let mp = [];
        // let rec_tbl_childs = document.querySelector('.recent-table').childNodes;
        // for(let i=0;i<rec_tbl_childs.length*3;i++){

        // }
        let cont = document.querySelector('.recent');
        localStorage.setItem("item", JSON.stringify(cont.innerHTML));
        localStorage.setItem("tr_count", tr_count.toString());
        // console.log(localStorage.getItem("item"));
    }
};


document.querySelector('.toggle').onclick = function(){
    td = document.querySelector('#temp').innerHTML;
    temp = td.split(' ')[0];
    final = "";
    if(td.split(' ')[2] == 'C'){
        temp_f = (9/5*parseInt(temp)) + 32;
        final = temp_f.toString() + ' ' + "degree F";
    }
    else{
        final = celsius;
    }
    document.querySelector('#temp').innerHTML = final;

}

function fun(){
    document.querySelector('.clear').onclick = function(){
        console.log("this is clear");
        let header = document.querySelector('.header');
        let tbl = document.querySelector('.recent-table');
        header.innerHTML = "";
        tbl.innerHTML = "";
        document.querySelector('.clear').style.display = 'none';
        localStorage.setItem("item", null);
        localStorage.setItem("tr_count", "0");
        tr_count = 0;
    }
}