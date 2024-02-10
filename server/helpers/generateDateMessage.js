module.exports = function generateDateMessage(datePosted){

    const diff = Math.abs(new Date() - datePosted);

    if(diff < 60*1000) //jedan minut
        return 'Just now';

    if(diff < 60*60*1000){ //jedan sat
        let num = Math.floor(diff/(60*1000));
        return (num == 1)? num + ' minute ago' : num + ' minutes ago';
    }

    if(diff < 24*60*60*1000){ //jedan dan
        let num = Math.floor(diff/(60*60*1000));
        return (num == 1)? num + ' hour ago' : num + ' hours ago';
    }

    let num = Math.floor(diff/(24*60*60*1000));
    return (num == 1)? num + ' day ago' : num + ' days ago';
}
