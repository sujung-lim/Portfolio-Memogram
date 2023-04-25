'use strict'

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

// 로컬 스토리지에 메모 저장하기 
function saveMemo(content) {
    memoData.push({ content });
    localStorage.setItem('memoData', JSON.stringify(memoData));

    const memoIndex = memoData.length - 1;
    const memoElement = document.querySelector(`.memo-feed-${memoIndex}`);
    memoElement.classList.add('memo-saved');
  }

// 오른쪽 피드에 메모 띄우기
function displayMemos() {
    memoData.forEach((memo, index) => {
      const memoElement = document.querySelector(`.memo-feed-${index}`);
      memoElement.textContent = memo.content || 'empty';
    });
  }
  displayMemos();

// POST버튼 클릭하면 피드에 메모 업로드하기 
const postButton = document.querySelector('.btn-post');
postButton.addEventListener('click', () => {
  const memoContent = document.querySelector('.memo-write').value.trim();
  saveMemo(memoContent);
  displayMemos();
});