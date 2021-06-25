import { megyek } from "./megyek.js";
import { diakok } from "./diakok.js";

var atlag = {}
for (var i of megyek){
    atlag[i['countycode']] = [
        ['romanian', i['romanian']],
        ['mathematics', i['mathematics']],
        ['native', i['native']],
        ['avg', i['avg']]
    ]
}

var data ={}
for (var i of diakok){
    data[i['name']] = [
        ['romanian', i['romanian']],
        ['mathematics', i['mathematics']],
        ['native', i['nativelang']],
        ['avg', i['avg']]
    ]
}

console.log(data.length)


export { data, atlag };

