import { LightningElement, track, api, wire } from 'lwc';
import { useQuery } from '@lwce/apollo-client';
import gql from 'graphql-tag';


const QUERY = gql`
    query($pidList: [String]) {
        multipleProducts(pidList: $pidList) {
            id
            name
        }
    }
`

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

        connectedCallback() {
            this.results.fetch({ 
                variables: {
                    ... this.variables
                }
            })
        }

    variables = {
        pidList: '' //["25696638M", "25697639M", "25696717M"]//this.pidList
    };

    @wire(useQuery, {
        query: QUERY,
        lazy: false,
        variables: '$variables',
    }) results;

    get firstResult() {
       // console.log("value of pidList", this.pid());
        console.log("inside firstResult: ", this.results);
       return this.results.loading ? "" : this.results.data.multipleProducts[0].name;
    }

}