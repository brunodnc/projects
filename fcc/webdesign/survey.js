function chequebox(checkBoxSelecionado) {
    let selected = 0;
    const checkboxes = checkBoxSelecionado.parentElement.children;

    for (const checkbox of checkboxes)
        if (checkbox.checked) selected++;

    for (const checkbox of checkboxes) {
        if (selected < 3) checkbox.removeAttribute('disabled');
        else if (!checkbox.checked) checkbox.setAttribute('disabled', 'disabled');
    }
}