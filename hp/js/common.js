// 공통 JavaScript (jQuery)

$(document).ready(function () {
  // 페이지 로드 애니메이션
  $("body").addClass("fade-in");

  // 탭 전환
  $(".tab").on("click", function () {
    const tabId = $(this).data("tab");

    $(".tab").removeClass("active");
    $(this).addClass("active");

    $(".tab-content").removeClass("active").hide();
    $("#" + tabId)
      .addClass("active")
      .fadeIn(300);
  });

  // 다음 페이지로 이동
  window.goToPage = function (url) {
    $("body").fadeOut(300, function () {
      window.location.href = url;
    });
  };
});

// 대화 순차 표시 함수
function showDialoguesSequentially(dialogues, container, onComplete) {
  let index = 0;

  function showNext() {
    if (index >= dialogues.length) {
      if (onComplete) onComplete();
      return;
    }

    const dialogue = dialogues[index];
    const dialogueEl = createDialogueElement(dialogue);

    $(container).append(dialogueEl);
    $(dialogueEl).hide().fadeIn(500);

    // 스크롤 자동 이동
    $(container).animate(
      {
        scrollTop: container.scrollHeight,
      },
      500
    );

    index++;

    // 음성 재생 시뮬레이션 (실제로는 음성 파일 재생 후 호출)
    // 여기서는 2초 후 다음 대화 표시
    setTimeout(showNext, dialogue.duration || 2000);
  }

  showNext();
}

// 대화 요소 생성
function createDialogueElement(dialogue) {
  const isLeft = dialogue.position === "left";
  const html = `
        <div class="dialogue-item ${isLeft ? "left" : "right"} slide-up">
            <div class="character-avatar">
                <img src="${dialogue.avatar}" alt="${dialogue.name}">
                <span class="character-name">${dialogue.name}</span>
            </div>
            <div class="dialogue-bubble ${dialogue.type || ""}">
                ${dialogue.text}
            </div>
        </div>
    `;
  return $(html)[0];
}

// 페이지 전환 효과
function pageTransition(url, delay = 300) {
  $("body").fadeOut(delay, function () {
    window.location.href = url;
  });
}

// 모달 열기/닫기
function openModal(modalId) {
  $("#" + modalId).fadeIn(300);
}

function closeModal(modalId) {
  $("#" + modalId).fadeOut(300);
}
