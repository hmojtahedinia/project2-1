// eslint-disable-next-line no-unused-vars
function postAjax(url, data, success) {
  const params = typeof data === 'string'
    ? data
    : Object.keys(data)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
      .join('&');

  const xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    // eslint-disable-next-line no-undef
    : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('POST', url);

  xhr.onreadystatechange = () => {
    if (xhr.readyState > 3 && xhr.status === 200) {
      success(xhr.responseText);
    } else if (xhr.status !== 200) {
      // eslint-disable-next-line no-console
      console.log(`Request failed. Returned status of ${xhr.status}`);
    }
  };
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);
  return xhr;
}
