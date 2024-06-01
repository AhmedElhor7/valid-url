
      let bookMarkInout = document.getElementById('BookMarkName');
      let BookMarkUrlInput = document.getElementById('BookMarkUrl');
      let arrayForTableData = [];
      let localStorageKey = 'allDataOfTable';
      let bBox;

      // Check if local storage has value, store this value into array, and call addToTable to display product
      if (JSON.parse(localStorage.getItem(localStorageKey))) {
        arrayForTableData = JSON.parse(localStorage.getItem(localStorageKey));
        addToTable(arrayForTableData);
      }

      function adddataToArray() {
        let tableInfo = {
          bookMarkName: bookMarkInout.value,
          bookMarkUrl: BookMarkUrlInput.value,
        };
        if (!validationAtAddDataToArray(tableInfo)) {
          return; // Stop execution if validation fails
        }

        // Prepend the protocol if missing
        if (
          !tableInfo.bookMarkUrl.startsWith('http://') &&
          !tableInfo.bookMarkUrl.startsWith('https://')
        ) {
          tableInfo.bookMarkUrl = 'http://' + tableInfo.bookMarkUrl;
        }
        arrayForTableData.push(tableInfo);
        addToLocalStorage();
        console.log(arrayForTableData);
        addToTable(arrayForTableData);
      }

      function addToTable(arrayForLoob) {
        bBox = '';
        for (let i = 0; i < arrayForLoob.length; i++) {
          bBox += `<tr>
                    <td>${i + 1}</td>
                    <td>${arrayForLoob[i].bookMarkName}</td>
                    <td><a href="${arrayForLoob[i].bookMarkUrl}" class="btn btn-outline-primary" target="_blank"><i class="fa fa-eye pe-2"></i>Visit</a></td>
                    <td><button type="button" onclick="deleteFromArray(${i});" class="btn btn-outline-danger"><i class="fa-regular fa-trash-can pe-2"></i> Delete</button></td>
                </tr>`;
        }
        document.getElementById('tableData').innerHTML = bBox;
        reset();
      }

      function reset() {
        bookMarkInout.value = '';
        BookMarkUrlInput.value = '';
      }

      function deleteFromArray(indexOfArray) {
        arrayForTableData.splice(indexOfArray, 1);
        addToTable(arrayForTableData);
        addToLocalStorage();
      }

      function addToLocalStorage() {
        localStorage.setItem(localStorageKey, JSON.stringify(arrayForTableData));
      }

      function validationAtAddDataToArray(tableInfo) {
        if (!tableInfo.bookMarkName || !tableInfo.bookMarkUrl) {
          console.error('You Should Complete All Data');
          showModal('You Should Complete All Data');
          return false; // Return false indicating validation failed
        }

        // Check if the URL is valid
        if (!isValidURL(tableInfo.bookMarkUrl)) {
          console.error('You Should Write Valid Url');
          showModal('You Should Write Valid Url');
          return false;
        }

        return true; // Return true indicating validation passed
      }

function isValidURL(url) {
  // Define a regex pattern to match URLs ending with .com or .net
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // Optional protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})" + // Domain name
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // Optional port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // Optional query string
      "(\\#[-a-z\\d_]*)?$", // Optional fragment locator
    "i"
  );

  const tldPattern = /\.(com|net)$/i;

  const isValid = pattern.test(url) && tldPattern.test(url);

  // Toggle validity classes based on the result
  BookMarkUrlInput.classList.toggle("is-valid", isValid);
  BookMarkUrlInput.classList.toggle("is-invalid", !isValid);

  return isValid;
}

// Add event listener for real-time validation
BookMarkUrlInput.addEventListener("input", () =>
  isValidURL(BookMarkUrlInput.value)
);




      function showModal(message) {
        const modalElement = document.getElementById('modalValdtion');
        const messageElement = document.getElementById('warringMaseege');
        messageElement.innerText = message;
        const myModal = new bootstrap.Modal(modalElement);
        myModal.show();
      }

      // Add input event listener for real-time validation
      BookMarkUrlInput.addEventListener('input', function() {
        isValidURL(BookMarkUrlInput.value);
      });
