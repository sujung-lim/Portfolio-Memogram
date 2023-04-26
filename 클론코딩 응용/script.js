'use strict'
document.addEventListener('DOMContentLoaded', () => {
  // 로컬스토리지에서 메모데이터 가져오기
let memoData = JSON.parse(localStorage.getItem('memoData'));
memoData = memoData ?? [];

// 오른쪽 화면 빈 피드 보여주기
const wrapMemos = document.querySelector('.wrap-memos');
for (let i = 0; i < 9; i++) {
  const memoElement = document.createElement('div');
  memoElement.classList.add(`memo-feed-${i}`);
  wrapMemos.appendChild(memoElement);
}

// 로컬 스토리지에 메모 데이터 저장하기 
function saveMemo(content) {
    memoData.push({ content });
    localStorage.setItem('memoData', JSON.stringify(memoData));

    const memoIndex = memoData.length - 1;
    const memoElement = document.querySelector(`.memo-feed-${memoIndex}`);
    memoElement.classList.add('memo-saved');
  }

// POST버튼 클릭하거나 Enter키 누르면 피드에 메모 업로드하기 
const postButton = document.querySelector('.btn-post');
postButton.addEventListener('click', () => {
  const memoContent = document.querySelector('.memo-write').value.trim();
  saveMemo(memoContent);
  displayMemos();
});

const textarea = document.querySelector('.memo-write');
textarea.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    postButton.click();
  }
})

// 메모 포스팅 하고 나면 textarea 값 비워주기
postButton.addEventListener('click', () => {
  const memoContent = textarea.value.trim();
  displayMemos();
  textarea.value = ' ';
});

// 오른쪽 피드에 메모 띄우기
function displayMemos() {
  memoData.forEach((memo, index) => {
    const memoElement = document.querySelector(`.memo-feed-${index}`);
    memoElement.innerHTML = `
      <p>${memo.content || 'empty'}</p>
      <ul class=icon-list>
      <li><i class="menu fa-solid fa-ellipsis"></i></li>
      <li><i class="fa-solid fa-square-xmark"></i></li>
      </ul>
      
      <ul class="more-icons hidden">
        <li><i class="fa-solid fa-pen"></i></li>
        <li><i class="fa-solid fa-bookmark"></i></li>
      </ul>
    `;

    // 브라우저 새로고침해도 메모의 보더 그대로 유지하기
    if (memo.content) {
      memoElement.classList.add('memo-saved');
    }

    // x 아이콘 누르면 메모 피드 삭제하기 & 로컬 스토리지의 메모 데이터 삭제하기
    const iconX = memoElement.querySelector('.fa-square-xmark');

    iconX.addEventListener('click', (event) => {
      const memoIndex = parseInt(memoElement.classList[0].slice(-1));
      memoData.splice(memoIndex, 1);
      localStorage.setItem('memoData', JSON.stringify(memoData));
      memoElement.remove();
    })
  });
}

displayMemos();
});