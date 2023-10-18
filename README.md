# Tiny Trello Clone

- There would be three sections - ToDo, In Progress and Completed
- At the top of the ToDo section, there is a + button. Clicking on it will add a card in the ToDo section, which is contenteditable. Click on it to add text content and hitting enter when editing will exit out from editing.
- The cards can be dragged from each section to the other, by clicking on their titlebar
- A card can be deleted by clicking on an “X” button in the title bar.

## steps

- First, creating 3 sections for a UI design using bootstrap.
- adding plus button on the top of the todo Section an example todo card.
- while click the add button, new component have to display in the todo section.
- This card input data, adds the data to the state reducer.
- Added Local Storage, while save enable and disable text editing

```

const [isEdit, setIsedit] = useState(true);
function handleEditContent(id) {
editContent(content, id);
setIsedit(false);
}

function enableEdit() {
setIsedit(false);
}
<textarea value={isEdit ? task.text : content}/>
```
