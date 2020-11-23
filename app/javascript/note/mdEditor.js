function createMdEditor(noteId, initValue){
  const textArea   = document.querySelector(`textarea.md-editor.note-id-${noteId}`)
  const saveNofity = document.querySelector(`p.last-modified.note-id-${noteId}`)
  const copyButton = document.querySelector(`button.copy.note-id-${noteId}`)

  const mdEditor = new SimpleMDE({
    element: textArea,
    spellChecker: false,
    status: [],
    renderingConfig: {
      codeSyntaxHighlighting: true
    }
  })
  mdEditor.value(initValue)
  let noteTextPrev = mdEditor.value()
  let noteTextLastSaved = mdEditor.value()
  setInterval(() => {
    const noteText = mdEditor.value()
    if(noteText !== noteTextPrev){ // 入力中だと思われるのでセーブはまだしない
      noteTextPrev = noteText
    } else if(noteText === noteTextLastSaved){ // 変化無しならセーブしない
    } else { // 入力終了 & 変化ありならセーブする
      save(noteId, noteText, saveNofity)
      noteTextLastSaved = noteText
    }
  }, 1000)

  copyButton.addEventListener('click', e => {
    navigator.clipboard.writeText(mdEditor.value())
    copyButton.textContent = 'copied!'
    setTimeout(() => {
      copyButton.textContent = 'copy'
    }, 800)
  })
}

function save(noteId, noteText, saveNofity){
  const csrfToken  = document.querySelector('meta[name=csrf-token]').content
  fetch('/notes/' + noteId, {
    method: 'PATCH',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({
      note: { text: noteText }
    })
  }).then(res => {
    saveNofity.textContent = 'saved'
    setTimeout(() => saveNofity.textContent = '-', 1000)
  })
}

window.addEventListener('load', e => {
  document.querySelectorAll('div.note').forEach(note => {
    const noteId = note.getAttribute('noteid')
    const initValue = (new DOMParser().parseFromString( note.querySelector('div.init-value').innerHTML, 'text/html' )).documentElement.textContent
    createMdEditor(noteId, initValue)
  })
})

