$(document).ready(function () {
  // ============================================
  // 팝업 공통 기능 (data-popopen, data-popclose)
  // ============================================
  
  // 팝업 열기: data-popopen="popupId" 속성을 가진 요소 클릭 시
  $(document).on("click", "[data-popopen]", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const popupId = $(this).data("popopen");
    if (popupId) {
      $("#" + popupId).addClass("active");
      $("body").css("overflow", "hidden");
    }
  });

  // 팝업 닫기: data-popclose="popupId" 속성을 가진 요소 클릭 시
  $(document).on("click", "[data-popclose]", function (e) {
    e.preventDefault();
    e.stopPropagation();
    const popupId = $(this).data("popclose");
    if (popupId) {
      $("#" + popupId).removeClass("active");
      $("body").css("overflow", "");
    }
  });

  // 팝업 외부 클릭 시 닫기
  $(document).on("click", ".popup-overlay", function (e) {
    if ($(e.target).hasClass("popup-overlay")) {
      $(this).removeClass("active");
      $("body").css("overflow", "");
    }
  });

  // ESC 키로 팝업 닫기
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      $(".popup-overlay.active").removeClass("active");
      $("body").css("overflow", "");
    }
  });

  // ============================================
  // 팀 목록 토글
  // ============================================
  $(document).on("click", ".team-header", function () {
    const $teamItem = $(this).closest(".team-item");
    const wasActive = $teamItem.hasClass("active");

    // 모든 팀 닫기
    $(".team-item").removeClass("active");

    // 클릭한 팀만 열기 (이미 열려있었으면 닫기)
    if (!wasActive) {
      $teamItem.addClass("active");
    }
  });

  // ============================================
  // 라운드 클릭 이벤트
  // ============================================
  $(document).on("click", ".round-item", function (e) {
    e.stopPropagation();

    const $teamItem = $(this).closest(".team-item");
    const team = $teamItem.data("team");
    const round = $(this).data("round");

    // 같은 팀 내의 라운드들만 비활성화
    $(this)
      .closest(".round-grid")
      .find(".round-item.completed")
      .removeClass("active");

    // 완료된 라운드만 활성화 가능
    if (
      $(this).hasClass("completed") ||
      $(this).hasClass("active")
    ) {
      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        // 참여자 진행이력 표시
        showProgressContent(team, round);
      } else {
        $(this).removeClass("active");
        // 진행이력 숨기기
        hideProgressContent();
      }
    }
  });

  // ============================================
  // 참여자 진행이력 표시/숨기기
  // ============================================
  function showProgressContent(team, round) {
    $("#emptyState").hide();
    $("#progressContent").addClass("active");
    $("#selectedTeam").text("팀 " + team);
    $("#selectedRound").text("총 100문제");
  }

  function hideProgressContent() {
    $("#emptyState").show();
    $("#progressContent").removeClass("active");
  }
});
