$(document).ready(function () {
  // 채팅 메시지 데이터
  const messages = [
    {
      position: "left",
      sender: "기술팀 안성호 과장",
      text: "하노버는 언제 가세요?",
      time: "13:30",
      duration: 2000,
    },
    {
      position: "right",
      sender: "마케팅팀 서민준 과장",
      text: "안 갑니다",
      time: "13:31",
      duration: 2000,
    },
    {
      position: "left",
      sender: "기술팀 안성호 과장",
      text: "안 간다구요? 왜요?",
      time: "13:32",
      duration: 2000,
    },
    {
      position: "right",
      sender: "마케팅팀 서민준 과장",
      text: "모르겠어요. 누군가 제 출장을 반대한 모양입니다.<br />하여튼 전 하노버로 안 갑니다. 아니, 못 갑니다..",
      time: "13:33",
      duration: 3000,
    },
  ];

  let currentIndex = 0;
  const $chatMessages = $(".chat-messages");

  // 기존 메시지 모두 제거
  $chatMessages.empty();

  // 채팅 순차 표시 시작
  showNextMessage();

  function showNextMessage() {
    if (currentIndex >= messages.length) {
      return;
    }

    const message = messages[currentIndex];
    const messageEl = createMessageElement(message);

    $chatMessages.append(messageEl);

    // 애니메이션과 스크롤
    setTimeout(() => {
      scrollToBottom();
    }, 100);

    currentIndex++;

    // 다음 메시지 표시
    setTimeout(() => {
      showNextMessage();
    }, message.duration);
  }

  function createMessageElement(message) {
    const positionClass =
      message.position === "left" ? "message-left" : "message-right";
    const bubbleClass =
      message.position === "left" ? "left-bubble" : "right-bubble";

    const html = `
      <div class="message-group ${positionClass} fade-in">
        <div class="message-item">
          <div class="message-sender">${message.sender}</div>
          <div class="message-bubble ${bubbleClass}">
            ${message.text}
          </div>
          <div class="message-time">${message.time}</div>
        </div>
      </div>
    `;
    return $(html);
  }

  function scrollToBottom() {
    const container = $chatMessages;
    container.animate(
      {
        scrollTop: container[0].scrollHeight,
      },
      500
    );
  }
});
