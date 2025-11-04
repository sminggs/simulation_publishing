// 대화 화면 JavaScript

$(document).ready(function () {
  // 대화 데이터
  const dialogues = [
    {
      position: "left",
      name: "박영진",
      subname: "차장",
      avatar: "images/member/youngjin_emotion3.png",
      text: "말씀이 지나치다니? 뭐가 지나치단 말입니까?",
      duration: 2000,
    },
    {
      position: "right",
      name: "서민준",
      subname: "과장",
      avatar: "images/member/minjun_emotion3.png",
      text: `아니, 제가 회의에 늦은 것은 사과드립니다.<br>
하지만 제가 SMART-Navigation 프로젝트만 하는 게 아니잖아요.<br><br>
오늘도 고객미팅을 하고 부랴부랴 달려 나왔는데, 차가 너무 막혀서계속 마음을 졸이면서 왔습니다. 그런데 그런 심정을 몰라주고 저를비난하다니 박 차장님 너무하시네요.. 박 차장님도 지난 번에 회의에20분 정도 늦은 적이 있었다구요. 그렇지 않습니까 팀장님?
<br><br>
아니 자기도 회의에 늦으면서 너무하네요, 진짜.`,
      duration: 2000,
    },
    {
      position: "left",
      name: "박영진",
      subname: "차장",
      avatar: "images/member/youngjin_emotion3.png",
      text: `팀장님. 서민준 과장이 회의에 늦은 게 어디 한 두 번입니까? 팀장님도 잘 아시잖아요? 매번 20분, 30분씩 늦게 왔습니다. 게다가 오늘은 한 시간이나 늦었구요. 게다가 회의 때 아이디어라고 내놓은 걸 보십시오. <br><br>
말도 안 되는 허무맹랑한 소리만 하고 있지 않습니까?팀장님. 서민준 과장이 회의에 늦은 게 어디 한 두 번입니까? 팀장님도 잘 아시잖아요? 매번 20분, 30분씩 늦게 왔습니다. 게다가 오늘은 한 시간이나 늦었구요. 게다가 회의 때 아이디어라고 내놓은 걸 보십시오. <br>
말도 안 되는 허무맹랑한 소리만 하고 있지 않습니까?팀장님. 서민준 과장이 회의에 늦은 게 어디 한 두 번입니까? 팀장님도 잘 아시잖아요? 매번 20분, 30분씩 늦게 왔습니다. 게다가 오늘은 한 시간이나 늦었구요. 게다가 회의 때 아이디어라고 내놓은 걸 보십시오. 
말도 안 되는 허무맹랑한 소리만 하고 있지 않습니까?`,
      duration: 6000,
    },
  ];

  let currentIndex = 0;

  // 대화 순차 표시 시작
  showNextDialogue();

  function showNextDialogue() {
    if (currentIndex >= dialogues.length) {
      return;
    }

    const dialogue = dialogues[currentIndex];
    const dialogueEl = createDialogueElement(dialogue);

    $("#dialogueContainer").append(dialogueEl);

    // 애니메이션과 스크롤
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    currentIndex++;

    // 다음 대화 표시 (음성 재생 시뮬레이션)
    setTimeout(() => {
      showNextDialogue();
    }, dialogue.duration);
  }

  function createDialogueElement(dialogue) {
    const html = `
            <div class="dialogue-item ${dialogue.position}">
                <div class="character-avatar">
                    <img src="${dialogue.avatar}" alt="${
      dialogue.name
    }" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'%3E%3Crect fill=\'%23e3f2fd\' width=\'80\' height=\'80\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'sans-serif\' font-size=\'30\' fill=\'%231E88E5\'%3E${dialogue.name.charAt(
      0
    )}%3C/text%3E%3C/svg%3E'">
                    <span class="character-name">${dialogue.name}<em>${
      dialogue.subname
    }</em></span>
                </div>
                <div class="dialogue-bubble typing">
                    ${dialogue.text}
                </div>
            </div>
        `;
    return $(html);
  }

  function scrollToBottom() {
    const container = $("#dialogueContainer");
    container.animate(
      {
        scrollTop: container[0].scrollHeight,
      },
      500
    );
  }
});
