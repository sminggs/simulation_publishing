// 공통 채팅 렌더러 스크립트
// HTML에 작성된 채팅 메시지를 data-delay 속성에 따라 순차적으로 노출하고 음성을 재생합니다.

$(document).ready(function () {
  const $chatMessages = $(".chat-messages");
  const $messageGroups = $chatMessages.find(".message-group");

  // 초기에는 모든 메시지를 숨김
  $messageGroups.hide();

  // 메시지들을 data-delay 값에 따라 정렬
  const sortedMessages = $messageGroups.toArray().sort((a, b) => {
    const delayA = parseInt($(a).attr("data-delay")) || 0;
    const delayB = parseInt($(b).attr("data-delay")) || 0;
    return delayA - delayB;
  });

  let currentIndex = 0;

  // 다음 메시지 표시 함수
  function showNextMessage() {
    if (currentIndex >= sortedMessages.length) {
      return;
    }

    const $message = $(sortedMessages[currentIndex]);
    const delay = parseInt($message.attr("data-delay")) || 0;
    const audioSrc = $message.attr("data-audio");

    // 메시지 표시
    setTimeout(() => {
      $message.fadeIn(300);
      scrollToBottom();

      // 음성 재생
      if (audioSrc) {
        const audio = new Audio(audioSrc);
        let hasEnded = false;

        // 음성 재생이 끝나면 다음 메시지로
        audio.addEventListener("ended", () => {
          if (!hasEnded) {
            hasEnded = true;
            currentIndex++;
            showNextMessage();
          }
        });

        // 음성 로드 실패 시 duration 속성 사용
        audio.addEventListener("error", () => {
          if (!hasEnded) {
            hasEnded = true;
            const duration = parseInt($message.attr("data-duration")) || 2000;
            setTimeout(() => {
              currentIndex++;
              showNextMessage();
            }, duration);
          }
        });

        // 음성 재생 시도
        audio.play().catch((error) => {
          console.warn("음성 재생 실패:", error);
          if (!hasEnded) {
            hasEnded = true;
            const duration = parseInt($message.attr("data-duration")) || 2000;
            setTimeout(() => {
              currentIndex++;
              showNextMessage();
            }, duration);
          }
        });
      } else {
        // 음성이 없으면 duration 속성 사용
        const duration = parseInt($message.attr("data-duration")) || 2000;
        setTimeout(() => {
          currentIndex++;
          showNextMessage();
        }, duration);
      }
    }, delay);
  }

  // 스크롤 함수
  function scrollToBottom() {
    $chatMessages.animate(
      {
        scrollTop: $chatMessages[0].scrollHeight,
      },
      500
    );
  }

  // 채팅 시작
  showNextMessage();
});
