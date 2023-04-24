document.addEventListener("DOMContentLoaded",
    function(e){
        let configID = document.querySelector("#id i")
        let idText = document.querySelector("#id span")

        configID.addEventListener("click",
            function(e){
                idText.textContent = prompt("새로운 아이디를 입력하세요")
            })

        let profileEditButton = document.querySelector("#profile_info button")
        let userInfo = document.querySelector("#userInfo")
        let summary = document.querySelector("#summary")
        let profileDetail = document.querySelector("#profileDetail")
        let changing = false //'현재 프로필 수정이 진행 중인가?'를 메모하기 위해 만든 변수
        //[프로필 편집] 버튼이 클릭되어 수정 모드가 실행되면 true로 바뀜
        //[프로필 편집 완료] 버튼이 클릭되어 수정 모드가 종료되면 false로 바뀜

        profileEditButton.addEventListener("click",
            function(e){
                if (changing) {
                    let _userInfo = userInfo.querySelector("input").value
                    let _summary = summary.querySelector("input").value
                    let _profileDetail = profileDetail.querySelector("input").value

                    userInfo.innerHTML = _userInfo
                    summary.innerHTML = _summary

                    if (_profileDetail.startsWith("http")){
                        _profileDetail = "<a href="+ _profileDetail + ">"+ _profileDetail + "</a>"
                    }

                    profileDetail.innerHTML = _profileDetail

                    e.target.textContent = "프로필 편집"
                    changing = false
                } else{//프로필 편집 모드 실행
                    let _userInfo = userInfo.textContent
                    let _summary = summary.textContent
                    let _profileDetail = profileDetail.textContent

                    userInfo.innerHTML = "<input value="+ _userInfo + "></iniput>"
                    summary.innerHTML = "<input value="+ _summary + "></iniput>"
                    profileDetail.innerHTML = "<input value="+ _profileDetail + "></iniput>"

                    e.target.textContent = "프로필 편집 완료"
                    changing = true
                }

             })//프로필 사진 변경에 <input type="file"태그 활용하려 하였으나
             //브라우저 보안 정책에 어긋나는 일이기에 난이도가 높아지므로 
             //대신 프롬프트 창으로 이미지 경로 받아와 이미지 교체하기 
                    let profile_pic = document.querySelector("#profile_pic .circle_pic")
                    profile_pic.addEventListener("mouseover",
                        function(e){
                            e.target.style.filter = "grayscale(50%)"
                        })
    
                    profile_pic.addEventListener("mouseleave",
                        function(e){
                            e.target.style.filter = "grayscale(0%)"
                        })
    
                    profile_pic.addEventListener("click",
                        function(e){
                            profile_pic.setAttribute("src", prompt("이미지 url을 입력해 주세요!"))
            })
    })