function createMdEditor(date, initValue){
  const textArea   = document.querySelector(`div[note-date='${date}'] textarea.md-editor`)
  const saveNofity = document.querySelector(`div[note-date='${date}'] p.last-modified`)
  const copyButton = document.querySelector(`div[note-date='${date}'] button.copy`)

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
      save(date, noteText, saveNofity)
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

function save(date, noteText, saveNofity){
  const csrfToken  = document.querySelector('meta[name=csrf-token]').content
  fetch('/notes/', {
    method: 'PATCH',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    body: JSON.stringify({
      note: { text: noteText, date: date }
    })
  }).then(res => {
    saveNofity.textContent = 'saved'
    setTimeout(() => saveNofity.textContent = '-', 1000)
  })
}

window.addEventListener('load', e => {
  document.querySelectorAll('div.note').forEach(note => {
    const initValue = (new DOMParser().parseFromString( note.querySelector('div.init-value').innerHTML, 'text/html' )).documentElement.textContent
    const date = note.getAttribute('note-date')
    createMdEditor(date, initValue)
  })
})

