const apiRequest = async (url) => {
    try {
        const responseText = await fetch(url, { method: 'GET' });
        return await responseText.json();
    }
    catch (error) {
        return console.error('Ajax request error:', error);
    }
}

export default apiRequest;