
let findStatus = (v, stat)=>{
    let re = [];
    Object.keys(v).forEach(k=> {if(v[k].status==stat){re.push(k)}});
    return re;
}

async function fetchUBCCanvas(base, num) {
    let info = {};

    let options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }; 

    for (let i=0; i<num; i++){
        try {
            const data = await fetch(`https://canvas.ubc.ca/courses/${base+i}`, options);
            info[`https://canvas.ubc.ca/courses/${base+i}`] = {status:data.status}

        } catch(err) {
            info[`https://canvas.ubc.ca/courses/${base+i}`]= {status:404}; 
            info[`https://canvas.ubc.ca/courses/${base+i}`]["errorType"] = err;
        }
        
    }
    return info;
}

async function fetchUBCCanvasUpdate(base, num, info) {

    let options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit

        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    }; 

    for (let i=0; i<num; i++){
        try {
            const data = await fetch(`https://canvas.ubc.ca/courses/${base+i}`, options);
            info[`https://canvas.ubc.ca/courses/${base+i}`] = {status:data.status}

        } catch(err) {
            info[`https://canvas.ubc.ca/courses/${base+i}`]= {status:404}; 
            info[`https://canvas.ubc.ca/courses/${base+i}`]["errorType"] = err;
        }
        
    }
    return info;
}