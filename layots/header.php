<div id="gameHeader">
    <div class="twoPlayers">
        <div class="onePlayer floatL">
            <div>
                <div class="onePlayer__timer">01:00</div>
                <span class="redcross" title="Вы недоступны для приглашений в игру" style="display: none;"></span>
                <span class="onePlayer__username active-username" attr-userid="0"><?php echo $s->getUsername(); ?></span>
                <span class="onePlayer__rank"></span>
                <div class="onePlayer__additional" style="display: none;">
                    <div class="points"></div>
                </div>
            </div>
        </div>
        <div class="onePlayer floatR">
            <div>
                <div class="onePlayer__timer">01:00</div>
                <span class="onePlayer__username">Компьютер</span>
                <span class="onePlayer__rank"></span>
                <div class="onePlayer__additional">
                    <div class="points"></div>
                </div>
            </div>
        </div>
        <div class="gameInfo">
            <div class="score" >
                <span class="score__1">0</span> : <span class="score__2">0</span>
            </div>
            <div class="timeWrapper" style="display: none;">
                <span class="time">00:00</span>
            </div>
            <div class="status">
                <span class="status_text status_yourMove" data-code="0">Ваш ход</span>
                <span class="status_text status_rivalMove" data-code="1" style="display:none;">Ход соперника</span>
                <span class="status_text status_win" data-code="2" style="display:none;">Победа</span>
                <span class="status_text status_lose" data-code="3" style="display:none;">Поражение</span>
                <span class="status_text status_draw" data-code="4" style="display:none;">Ничья</span>

                <span class="status_text" data-code="5" style="display:none;">Победа, соперник покинул игру</span>
                <span class="status_text" data-code="6" style="display:none;">Победа, у соперника истекло время</span>
                <span class="status_text" data-code="7" style="display:none;">Победа, соперник сдался</span>

                <span class="status_text" data-code="8" style="display:none;">Поражение, вы покинули игру</span>
                <span class="status_text" data-code="9" style="display:none;">Поражение, у вас истекло время</span>
                <span class="status_text" data-code="10" style="display:none;">Поражение, вы сдались</span>

                <span class="status_text" data-code="11" style="display:none;">Режим просмотра</span>
                <span class="status_text" data-code="12" style="display:none;">Игра завершена</span>
                <span class="status_text" data-code="13" style="display:none;">Ожидание начала игры...</span>
            </div>
        </div>
        <img class="iconClose previewClose" src="//logic-games.spb.ru/v6-game-client/app/i/close.png" title="Выйти из просмотра">

    </div>

</div>