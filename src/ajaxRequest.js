export function ajaxRequest(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (this.readyState === this.DONE) {
                const responseParsed = JSON.parse(this.responseText);
                resolve(responseParsed);
            }
        };
    });
}
