const createMessage = function (mail, lang) {
  if (lang === "ru") {
    return `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Innoweek2020</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: "Roboto", sans-serif;
            background-color: #f5f5f5;
            margin: 0;
          }

          a,
          a:hover {
            text-decoration: none;
            color: #000000 !important;
          }

          p {
            margin: 0;
          }

          .main__btn {
            display: inline-block;
            max-width: 370px;
            width: 100%;
            color: #000000;
            box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.46);
            border-radius: 8px;
            text-align: center;
          }

          .inno__btn {
            height: 46px;
            font-size: 25px;
            line-height: 46px;
            text-transform: uppercase;
            background: #FFD800;
          }

          .accent,
          .accent:hover,
          .accent a {
            color: #00ffd2 !important;
          }
        </style>
      </head>

      <body>
        <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff;">
          <tr>
            <td style="text-align: center; padding: 10px 0;">
              <img style="width: 100px;" src="https://show.innoweek.uz/images/logo.png" alt="">
            </td>
          </tr>
          <tr>
            <td style="background: url('https://show.innoweek.uz/images/bg.png') no-repeat center center; text-align: center; color:
                    #ffffff; padding: 50px 20px 60px; background-size: cover;">
              <table width="100%" align="center">
                <tr>
                  <td style="padding-bottom: 65px;">
                    <h1 style="font-size: 36px; line-height: 40px; margin: 0px; color: #ffffff">Уважаемый гость <br /> Международной
                      недели инновационных идей InnoWeek.Uz!
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td
                    style="font-size: 25px; line-height: 30px; background: rgba(255, 255, 255, 0.11); padding: 50px 20px; text-align: center;">
                    <table width="100%" align="center">
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>Напоминаем Вам, что сегодня начинается Международная неделя инновационных идей InnoWeek.Uz. Не пропустите данное событие года!</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <p>
                            Для авторизации и перехода <br /> на выставку, просим перейти по ссылке
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <a href="https://show.innoweek.uz" class="inno__btn main__btn">Show.InnoWeek.uz</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <p>Благодарим Вас за участие на Международной неделе инновационных идей!</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: left; font-size: 13px; padding-top: 50px;">
                    <p>* Это письмо было отправлено по адресу <span class="accent">${mail}</span></p>
                    <p>* Вы получили его как пользователь сайта <a href="http://innoweek.uz" class="accent"
                        style="text-decoration: underline;">innoweek.uz</a></p>
                    <p style="padding-top: 10px;">Это сообщение отправлено системой автоматически, пожалуйста не отвечайте на
                      него.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>

      </html>
    `;
  } else if (lang === "uz") {
    return `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Innoweek2020</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: "Roboto", sans-serif;
            background-color: #f5f5f5;
            margin: 0;
          }

          a,
          a:hover {
            text-decoration: none;
            color: #000000 !important;
          }

          p {
            margin: 0;
          }

          .main__btn {
            display: inline-block;
            max-width: 370px;
            width: 100%;
            color: #000000;
            box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.46);
            border-radius: 8px;
            text-align: center;
          }

          .inno__btn {
            height: 46px;
            font-size: 25px;
            line-height: 46px;
            text-transform: uppercase;
            background: #FFD800;
          }

          .accent,
          .accent:hover,
          .accent a {
            color: #00ffd2 !important;
          }
        </style>
      </head>

      <body>
        <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff;">
          <tr>
            <td style="text-align: center; padding: 10px 0;">
              <img style="width: 100px;" src="https://show.innoweek.uz/images/logo.png" alt="">
            </td>
          </tr>
          <tr>
            <td style="background: url('https://show.innoweek.uz/images/bg.png') no-repeat center center; text-align: center; color:
                    #ffffff; padding: 50px 20px 60px; background-size: cover;">
              <table width="100%" align="center">
                <tr>
                  <td style="padding-bottom: 65px;">
                    <h1 style="font-size: 36px; line-height: 40px; margin: 0px; color: #ffffff">InnoWeek.Uz Xalqaro <br />
                      innovatsion g'oyalar haftaligining aziz mehmoni!
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td
                    style="font-size: 25px; line-height: 30px; background: rgba(255, 255, 255, 0.11); padding: 50px 20px; text-align: center;">
                    <table width="100%" align="center">
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>Eslatib o'tamiz, InnoWeek.Uz xalqaro innovatsion g'oyalar haftaligi bugun boshlanadi. Yilning
                            ushbu tadbirini o'tkazib
                            yubormang!</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <p>
                            Ko'rgazmaga avtorizatsiya <br /> qilish va kirish uchun havolani bosing
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <a href="https://show.innoweek.uz" class="inno__btn main__btn">Show.InnoWeek.uz</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <p>Xalqaro innovatsion g'oyalar haftaligida ishtirok etganingiz uchun tashakkur!</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: left; font-size: 13px; padding-top: 50px;">
                    <p>* Ushbu xat <span class="accent">${mail}</span> manziliga yuborildi</p>
                    <p>* Siz uni <a href="http://innoweek.uz" class="accent"
                        style="text-decoration: underline;">innoweek.uz</a> saytining
                      foydalanuvchisi sifatida oldingiz</p>
                    <p style="padding-top: 10px;">Ushbu xabar avtomatik ravishda tizim tomonidan yuboriladi, iltimos, unga
                      javob bermang.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>

      </html>
    `;
  } else if (lang === "en") {
    return `
      <!DOCTYPE html>
      <html lang="ru">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Innoweek2020</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: "Roboto", sans-serif;
            background-color: #f5f5f5;
            margin: 0;
          }

          a,
          a:hover {
            text-decoration: none;
            color: #000000 !important;
          }

          p {
            margin: 0;
          }

          .main__btn {
            display: inline-block;
            max-width: 370px;
            width: 100%;
            color: #000000;
            box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.46);
            border-radius: 8px;
            text-align: center;
          }

          .inno__btn {
            height: 46px;
            font-size: 25px;
            line-height: 46px;
            text-transform: uppercase;
            background: #FFD800;
          }

          .accent,
          .accent:hover,
          .accent a {
            color: #00ffd2 !important;
          }
        </style>
      </head>

      <body>
        <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff;">
          <tr>
            <td style="text-align: center; padding: 10px 0;">
              <img style="width: 100px;" src="https://show.innoweek.uz/images/logo.png" alt="">
            </td>
          </tr>
          <tr>
            <td style="background: url('https://show.innoweek.uz/images/bg.png') no-repeat center center; text-align: center; color:
                    #ffffff; padding: 50px 20px 60px; background-size: cover;">
              <table width="100%" align="center">
                <tr>
                  <td style="padding-bottom: 65px;">
                    <h1 style="font-size: 36px; line-height: 40px; margin: 0px; color: #ffffff">Dear guest of InnoWeek.Uz –
                      <br />
                      the International Week of Innovative Ideas!</h1>
                  </td>
                </tr>
                <tr>
                  <td
                    style="font-size: 25px; line-height: 30px; background: rgba(255, 255, 255, 0.11); padding: 50px 20px; text-align: center;">
                    <table width="100%" align="center">
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>We remind you that InnoWeek.Uz - the International Week of Innovative Ideas begins today. Don't
                            miss this event of the
                            year!</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <p>
                            To authorize and go to <br /> the exhibition, please follow the link
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <a href="https://show.innoweek.uz" class="inno__btn main__btn">Show.InnoWeek.uz</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <p>Thank you for participating in the International Week of Innovative Ideas!</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: left; font-size: 13px; padding-top: 50px;">
                    <p>* This letter was sent to <span class="accent">${mail}</span></p>
                    <p>* You received it as a user of the site <a href="http://innoweek.uz" class="accent"
                        style="text-decoration: underline;">innoweek.uz</a></p>
                    <p style="padding-top: 10px;">This message is sent automatically by the system, please do not reply to it.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>

      </html>
    `;
  }
};

module.exports = createMessage;
