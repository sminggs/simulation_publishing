// 공통 대화 렌더러 스크립트
// HTML에 작성된 대화 내용을 data-delay 속성에 따라 순차적으로 노출하고 음성을 재생합니다.

$(document).ready(function () {
  const $container = $("#dialogueContainer");
  const $dialogueItems = $container.find(".dialogue-item");

  // 초기에는 모든 대화 항목을 숨김
  $dialogueItems.hide();

  // 대화 항목들을 data-delay 값에 따라 정렬
  const sortedItems = $dialogueItems.toArray().sort((a, b) => {
    const delayA = parseInt($(a).attr("data-delay")) || 0;
    const delayB = parseInt($(b).attr("data-delay")) || 0;
    return delayA - delayB;
  });

  let currentIndex = 0;

  // 다음 대화 표시 함수
  function showNextDialogue() {
    if (currentIndex >= sortedItems.length) {
      return;
    }

    const $item = $(sortedItems[currentIndex]);
    const delay = parseInt($item.attr("data-delay")) || 0;
    const audioSrc = $item.attr("data-audio");

    // 대화 표시
    setTimeout(() => {
      $item.fadeIn(300);
      scrollToBottom();

      // 음성 재생
      if (audioSrc) {
        const audio = new Audio(audioSrc);
        let hasEnded = false;

        // 음성 재생이 끝나면 다음 대화로
        audio.addEventListener("ended", () => {
          if (!hasEnded) {
            hasEnded = true;
            currentIndex++;
            showNextDialogue();
          }
        });

        // 음성 로드 실패 시 duration 속성 사용
        audio.addEventListener("error", () => {
          if (!hasEnded) {
            hasEnded = true;
            const duration = parseInt($item.attr("data-duration")) || 2000;
            setTimeout(() => {
              currentIndex++;
              showNextDialogue();
            }, duration);
          }
        });

        // 음성 재생 시도
        audio.play().catch((error) => {
          console.warn("음성 재생 실패:", error);
          if (!hasEnded) {
            hasEnded = true;
            const duration = parseInt($item.attr("data-duration")) || 2000;
            setTimeout(() => {
              currentIndex++;
              showNextDialogue();
            }, duration);
          }
        });
      } else {
        // 음성이 없으면 duration 속성 사용
        const duration = parseInt($item.attr("data-duration")) || 2000;
        setTimeout(() => {
          currentIndex++;
          showNextDialogue();
        }, duration);
      }
    }, delay);
  }

  // 스크롤 함수
  function scrollToBottom() {
    $container.animate(
      {
        scrollTop: $container[0].scrollHeight,
      },
      500
    );
  }

  // 대화 시작
  showNextDialogue();
});
