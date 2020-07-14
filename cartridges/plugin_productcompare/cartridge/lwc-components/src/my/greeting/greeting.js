import { LightningElement, api, wire, track } from 'lwc';
import { useQuery } from '@lwce/apollo-client';
import QUERY from './graphQL';
import {cgidNames} from './graphQL.js';

export default class Greeting extends LightningElement {

    isBundle = false;
    cgidVal;
    attributes;
    pidvalL;

        @api
    set cgid(val){
        console.log("inside set cgid, val: ",val);
        this.queryAttr(val);
        this.cgidVal = val;

    }

    get cgid(){
        return this.cgidVal;
    }

    @api
    set pid(val) {
        var temp = this.strToArr(val);
        console.log("inside set pid, pidList:", temp);
        this.variables = { ...this.variables, pidList: temp };
    }

    get pid() {
        return this.variables.pidList;
    }

    strToArr(val){
        console.log("inside strToArr function" );
            var pidStr = val;
            console.log("inside strToArr pid: ",pidStr);
            let pidSlice = pidStr.slice(1, (pidStr.length-1));
            let pidList = pidSlice.split(",");
            for (var i = 0; i < pidList.length; i++) {
                pidList[i] = pidList[i].trim();
                var tempStr = pidList[i].toString();
                if(tempStr.includes("bundle")){
                    this.isBundle =  true;
                }
            }
            console.log("inside strToArr pidList: ",pidList[1]);
            this.pidvalL = pidList;
            return pidList;
        };

        async  connectedCallback() {
            if(this.isBundle == false){this.results.fetch({
                variables: {
                    ... this.variables
                }
            })}
        }

    variables = {
        pidList: ''
    };

    @wire(useQuery, {
        query: QUERY,
        lazy: false,
        variables: '$variables',
    }) results;

    get firstResult() {
       // console.log("value of pidList", this.pid());
       if(this.isBundle == false){
        console.log("inside firstResult: ", this.results);
        return this.results.loading ? "" : this.results.data.multipleProducts;
       }
    }

    queryAttr(val){
      var arr = [];
    Object.values(cgidNames).forEach(key => {arr.push(key)});
    for (var i=0; i<arr.length; i++) {
        for (var key in arr[i]){
            if (arr[i].hasOwnProperty(key)) {
                var strKey = '"'+key+'"';
                if (val== strKey ) {
                    this.attributes = arr[i][key];
                }
    }
    }
}
     }

    get drawTable(){
        this.queryAttr(this.cgidVal);
        var multiProd = this.results.data.productDetail;
        //this.attributes = ['director','title','releaseDate','id','isPublished','updatedAt','createdAt','episodeId'];
        console.log("results data: ",this.results.data);
        console.log("inside drawTable, val of attributes:",this.attributes);
        var totalRows = this.attributes.length;
        var cellsInRow = (multiProd.length+1);
        var div1 = document.getElementById("div1");
        var width = 100/(multiProd.length + 1);
        console.log("div1",div1);

            var tbl = document.createElement("table");  //table
            tbl.classList.add("table-striped-column");

            for (var r = 0; r < totalRows; r++)  { //rows
                var row = document.createElement("tr");
                var colgroup = document.createElement("div");
                colgroup.style= "width:${"+(100/(multiProd.length))+"}%";
                var isEligible = true;
            for (var c = 0; c < cellsInRow; c++) { //columns
                if(r==0){
                    var cellImg = document.createElement("td");
                    if(c > 0){
                        var link = multiProd[c-1].imageGroups[0].images[0].disBaseLink;
                console.log("Image link:",);
                var img = document.createElement("img");
                img.src = link;
                cellImg.appendChild(img);
                row.appendChild(cellImg);
                }}
                else if(c==0){
                    var cell = document.createElement("td");
                    cell.style = "width:${"+width+"}%";
                    if(r != 0){var cellText = document.createTextNode(this.attributes[r]);}
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                    console.log("in line");
                }
                else{var v = c-1;
                    var map = new Map();
                    let obj = multiProd[v];
                    Object.keys(obj).forEach(key => {map.set(key, obj[key]);});
                        var cell = document.createElement("td");
                        cell.style = "width:${"+width+"}%";
                            var name = this.attributes[r];
                            if((map.get(name) != undefined) && (map.get(name) != null)){
                                var cellText = document.createTextNode(map.get(name));
                                cell.appendChild(cellText);
                                colgroup.appendChild(cell);
                            }else{
                                isEligible = false;
                            }
}
                }
if(isEligible){
    console.log("inside isEligible, tbl: ",tbl);
    row.appendChild(colgroup);
}
      tbl.appendChild(row); // add the row to the end of the table body
}
    div1.appendChild(tbl); // appends <table> into <div1>
    }
}