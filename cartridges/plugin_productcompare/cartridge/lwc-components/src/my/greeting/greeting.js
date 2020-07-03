import { LightningElement, api, wire, track } from 'lwc';
import { useQuery } from '@lwce/apollo-client';
import QUERY from './graphQL';
//import HashMap from 'dw/util/HashMap';
export default class Greeting extends LightningElement {

    @api
    set pid(val) {
        var temp = this.strToArr(val);
        console.log("inside set pid, pidList:", temp);
        this.variables = { ...this.variables, pidList: temp };
    }

    get pid() {
        return this.variables.pidList;
    }

    attributes = ["name","price","shortDescription", "variants"];

    strToArr(val){
        console.log("inside strToArr function" );
            var pidStr = val;
            console.log("inside strToArr pid: ",pidStr);
            let pidSlice = pidStr.slice(1, (pidStr.length-1));
            let pidList = pidSlice.split(",");
            for (var i = 0; i < pidList.length; i++) {
                pidList[i] = pidList[i].trim()
            }
            console.log("inside strToArr pidList: ",pidList[1]);
            return pidList;
            //this.pidList( this.pidList);
        };

        async  connectedCallback() {
            this.results.fetch({
                variables: {
                    ... this.variables
                }
            })
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
        console.log("inside firstResult: ", this.results);
        return this.results.loading ? "" : this.results.data.multipleProducts;
    }
    productArr(){
        var multiProd = this.results.data.multipleProducts;
        for(var i=0; i< multiProd.length; i++){
        }

    }
    get drawTable(){
        var multiProd = this.results.data.multipleProducts;
        var totalRows = this.attributes.length;
        var cellsInRow = (multiProd.length);
        var div1 = document.getElementById("div1");
        console.log("div1",div1);
            var tbl = document.createElement("table");
            tbl.style = "width: 100%;border-collapse:collapse;border: 2px solid black;";
           //tbl.setAttribute("class", "democlass");
            console.log("tbl",tbl);
            for (var r = 0; r < totalRows; r++)  {
                var row = document.createElement("tr");
                row.style = "border: 1px solid black;";
                var cell = document.createElement("td");
                var cellText = document.createTextNode(this.attributes[r]);
                cell.style = "border: 1px solid black;width:100px;height:50px;text-align:center;";
                cell.appendChild(cellText);
                row.appendChild(cell);
            for (var c = 1; c <= cellsInRow; c++) {
                var v = c-1;
                var map = new Map();
                let obj = multiProd[v];
                Object.keys(obj).forEach(key => {map.set(key, obj[key]);});
                    console.log("inside drawtable");
                    var cell = document.createElement("td");
                    cell.style = "border: 1px solid black;width:100px;height:50px;text-align:center;";
                        var name = this.attributes[r];
                        console.log("val of name: ",name);
                        console.log("val of map.get(string): ",map.get(name));
                        var cellText = document.createTextNode(map.get(name));
                    cell.appendChild(cellText);
                    row.appendChild(cell);
                }

      tbl.appendChild(row); // add the row to the end of the table body
            }
    div1.appendChild(tbl); // appends <table> into <div1>
    }
}