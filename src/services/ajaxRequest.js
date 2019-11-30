const ajaxRequest = async (url) => {
    try {
        const responseText = await fetch(url, { method: 'GET' });
        const responseParsed = await responseText.json();
        return responseParsed;
    }
    catch (error) {
        return console.error('Ajax request error:', error);
    }
}

export default ajaxRequest;