// 점수 화면 애니메이션

$(document).ready(function() {
    // 페이지 로드 후 점수 바 애니메이션
    setTimeout(function() {
        $('.score-bar').each(function(index) {
            const $bar = $(this);
            const width = $bar.data('width');
            
            setTimeout(function() {
                $bar.find('.score-bar-fill').css('width', width + '%');
            }, index * 100);
        });
    }, 300);
});

