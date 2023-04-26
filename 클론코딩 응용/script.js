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

// POST버튼 클릭하거나 Enter키 누르면 피드에 메모 업로드하기 
const postButton = document.querySelector('.btn-post');
postButton.addEventListener('click', () => {
  const memoContent = document.querySelector('.memo-write').value.trim();
  saveMemo(memoContent);
  displayMemos();
});

const memoWrite = document.querySelector('.memo-write');
memoWrite.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    postButton.click();
  }
})


// 오른쪽 피드에 메모 띄우기
function displayMemos() {
  memoData.forEach((memo, index) => {
    const memoElement = document.querySelector(`.memo-feed-${index}`);
    memoElement.innerHTML = `
      <p>${memo.content || 'empty'}</p>
      <i class="menu fa-solid fa-ellipsis"></i>
      <ul class="icon-list">
        <li><i class="fa-solid fa-pen"></i></li>
        <li><i class="fa-solid fa-bookmark"></i></li>
        <li><i class="fa-solid fa-square-xmark"></i></li>
      </ul>
    `;

    // 브라우저 새로고침해도 메모의 보더 그대로 유지하기
    if (memo.content) {
      memoElement.classList.add('memo-saved');
    }
  });

  // 더보기 ... 아이콘 누르면 아이콘 리스트 띄우기
  document.addEventListener('click', (event) => {
    const menu = event.target.closest('.menu');
    const iconList = menu.nextElementSibling;
    //더보기 ...아이콘 누르면 더보기 아이콘은 숨기기
    if (menu && iconList) {
      iconList.classList.toggle('show-icons');
      menu.classList.toggle('hide-menu');
  
      if (iconList.classList.contains('show-icons')) {
        menu.classList.add('hide-menu');
      } else {
        menu.classList.remove('hide-menu');
      }
    } else if (!event.target.closest('.icon-list') && !event.target.closest('.menu')) {
      // Clicked outside of the menu and icon-list
      iconList.classList.remove('show-icons');
      menu.classList.remove('hide-menu');
    }
  });
}

displayMemos();



