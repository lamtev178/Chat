const nodemailer = require('nodemailer');

class Mail {
  constructor(){
    this.transporter = nodemailer.createTransport({
      host:"smtp.gmail.com",
      secure: false,
      port:587,
      auth:{
        user:"laforumru@gmail.com",
        pass:"qwerty1234))"
      }
    })
  }

  async sendActionLink(to, link){
    await this.transporter.sendMail({
      from:"laforumru@gmail.com",
      to,
      subject:'Активация аккаунта',
      text:'',
      html:
        `
          <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
          </div>
        `
    })
  }
}

module.exports = new Mail()