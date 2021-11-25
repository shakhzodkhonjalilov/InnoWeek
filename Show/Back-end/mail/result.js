const createMessage = function (mail, lang) {
  if (lang === 'ru') {
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
                    <h1 style="font-size: 35px; line-height: 50px; margin: 0px; color: #ffffff">Спасибо за участие в мероприятиях Международной недели инновационных идей InnoWeek.Uz!</h1>
                  </td>
                </tr>
                <tr>
                  <td
                    style="font-size: 25px; line-height: 30px; background: rgba(255, 255, 255, 0.11); padding: 50px 20px; text-align: center;">
                    <table width="100%" align="center">
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>Уважаемые участники и гости InnoWeek.Uz! Мы выражаем вам свою благодарность за участие в мероприятиях Международной недели инновационных идей.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>Ознакомиться со всеми итогами можно на сайте</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <a href="http://innoweek.uz" class="inno__btn main__btn">InnoWeek.uz</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p><a href="http://certificate.innoweek.uz" class="accent">Здесь</a> вы можете сгенерировать электронный сертификат об участии на InnoWeek.Uz-2020.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <p>
                            Пожалуйста, пройдите опросник, в котором вы можете оставить свои предложения, рекомендации и пожелания. Нам важно Ваше мнение, которое мы обязательно учтем при подготовке к InnoWeek.Uz-2021.
                          </p>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <a href="https://docs.google.com/forms/d/e/1FAIpQLScdrEYRftRYv_RDUJ0FnxHoQ2OQ-LY-BUYr0MC0ZHnJh4j8UA/viewform" class="inno__btn main__btn">Опросник</a>
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
  } else if (lang === 'uz') {
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
                    <h1 style="font-size: 35px; line-height: 50px; margin: 0px; color: #ffffff">InnoWeek.Uz Xalqaro innovatsion g'oyalar haftaligi tadbirlarida ishtirok etganingiz uchun tashakkur!</h1>
                  </td>
                </tr>
                <tr>
                  <td
                    style="font-size: 25px; line-height: 30px; background: rgba(255, 255, 255, 0.11); padding: 50px 20px; text-align: center;">
                    <table width="100%" align="center">
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>Hurmatli InnoWeek.Uz ishtirokchilari va mehmonlari! Xalqaro innovatsion g'oyalar haftaligi tadbirlarida ishtirok etganingiz uchun sizga o'z minnatdorchiligimizni bildiramiz.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <p>Barcha natijalar bilan www.innoweek.uz sahifasida</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 15px;">
                          <a href="http://innoweek.uz" class="inno__btn main__btn">InnoWeek.uz</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>tanishishingiz mumkin.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p><a href="http://certificate.innoweek.uz/uz" class="accent">Bu erda</a> InnoWeek.Uz-2020 da ishtirok etish to'g'risida elektron sertifikat yaratishingiz mumkin.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <p>
                            Iltimos, o'zingizning takliflaringiz, tavsiyalaringiz va istaklaringizni qoldirishingiz mumkin bo'lgan so’ro’vnomadan o'ting. Sizning fikringiz biz uchun muhim, biz uni InnoWeek.Uz-2021 ga tayyorgarlik ko'rishda albatta hisobga olamiz.
                          </p>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd8rYl_VeTcUE4PhmmfNk5DYMmQov1NzENitbGKJ4oPfEqznw/viewform" class="inno__btn main__btn">So’ro’vnoma</a>
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
  } else if (lang === 'en') {
    return `
      <!DOCTYPE html>
      <html lang="en">

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
                    <h1 style="font-size: 35px; line-height: 50px; margin: 0px; color: #ffffff">Thank you for participating on the events of the International Week of Innovative Ideas InnoWeek.Uz!</h1>
                  </td>
                </tr>
                <tr>
                  <td
                    style="font-size: 25px; line-height: 30px; background: rgba(255, 255, 255, 0.11); padding: 50px 20px; text-align: center;">
                    <table width="100%" align="center">
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>Dear participants and guests of InnoWeek.Uz! We express you our gratitude for participating in the events of the International Week of Innovative Ideas.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p>You can get acquainted with all the results via </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <a href="http://innoweek.uz" class="inno__btn main__btn">InnoWeek.uz</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 25px;">
                          <p><a href="http://certificate.innoweek.uz/en" class="accent">Here</a> you can generate an electronic certificate of participation at InnoWeek.Uz-2020.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 35px;">
                          <p>
                            Please go through the questionnaire in which you can leave your suggestions, recommendations and wishes. Your opinion is important to us, which we will definitely take into account when preparing InnoWeek.Uz-2021.
                          </p>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding-bottom: 20px;">
                          <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVm1nB9ZmH51gQpVi0s51m00rXcic2ni0TutooBzjtxMPENg/viewform" class="inno__btn main__btn">Questionnaire</a>
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
