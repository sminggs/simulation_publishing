// 대화 화면 JavaScript

$(document).ready(function() {
    // 대화 데이터 (실제로는 서버에서 가져올 데이터)
    const dialogues = [
        {
            position: 'left',
            name: '박영진',
            avatar: 'images/character1.png',
            text: '말씀이 지나십니다! 뭐가 지나냐던 말입니까?',
            duration: 2000
        },
        {
            position: 'right',
            name: '서민준',
            avatar: 'images/character2.png',
            text: `아니, 제가 회의에 늦은 것은 사과드립니다.<br>
하지만 저가 SMART-Navigation 프로젝트만 하는 게 아니라잖아요.<br>
오늘도 고객미팅을 하고 무분완하고 담당 나왔는데, 저가 너무 막하서 
계속 미공을 들어연서 왔습니다. 그런데 그런 실장을 물라주고 지쓸
빈나하니나! 박 차장님도 너무 하시네요... 박 차장님도 자는 팀에 회의에
20분 정도 늦은 적이 있었잖아요. 그랬지 않습니까?<br>
아니 저가도 회의에 늦으려서 너무하네요. 진짜.`,
            duration: 6000
        },
        {
            position: 'left',
            name: '박영진',
            avatar: 'images/character1.png',
            text: `담장님, 서민호 과장이 회의에 늦은 게 어디 한 두 번입니까? 담장님도
잘 아시잖아요? 매번 20분, 30분씩 늦게 왔습니다. 계디가 오늘은 한 시
간이나 늦았구요. 계디가 회의 때 아이디어라고 내놓은 것 전혀 없어요.
말로 안 되는 허무맹랑한 소리만 하고 있지 않습니까?<br>
담장님 저는 팀이 프로젝트 일 정도 계획보다 조금식 늦어지고 있습니다.
지금은 팀 멤버 행사보다는 프로젝트에 더욱 몰입해야 할 때입니다.`,
            duration: 6000
        }
    ];

    let isPaused = false;
    let currentIndex = 0;

    // 대화 순차 표시 시작
    showNextDialogue();

    function showNextDialogue() {
        if (isPaused || currentIndex >= dialogues.length) {
            return;
        }

        const dialogue = dialogues[currentIndex];
        const dialogueEl = createDialogueElement(dialogue);
        
        $('#dialogueContainer').append(dialogueEl);
        
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
                    <img src="${dialogue.avatar}" alt="${dialogue.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\' viewBox=\'0 0 80 80\'%3E%3Crect fill=\'%23e3f2fd\' width=\'80\' height=\'80\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'sans-serif\' font-size=\'30\' fill=\'%231E88E5\'%3E${dialogue.name.charAt(0)}%3C/text%3E%3C/svg%3E'">
                    <span class="character-name">${dialogue.name}</span>
                </div>
                <div class="dialogue-bubble typing">
                    ${dialogue.text}
                </div>
            </div>
        `;
        return $(html);
    }

    function scrollToBottom() {
        const container = $('#dialogueContainer');
        container.animate({
            scrollTop: container[0].scrollHeight
        }, 500);
    }

    // 일시정지/재생 버튼
    $('#pauseBtn').on('click', function() {
        isPaused = !isPaused;
        
        if (isPaused) {
            $(this).html(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5L19 12L8 19V5Z"/>
                </svg>
            `);
        } else {
            $(this).html(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
            `);
            showNextDialogue();
        }
    });

    // 다음 버튼은 모든 대화가 표시된 후에 활성화
    $('#nextBtn').prop('disabled', true).css('opacity', '0.5');
    
    const checkInterval = setInterval(() => {
        if (currentIndex >= dialogues.length) {
            $('#nextBtn').prop('disabled', false).css('opacity', '1');
            clearInterval(checkInterval);
        }
    }, 500);
});

